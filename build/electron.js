const {app, BrowserWindow} = require("electron"); 
const ipcMain = require('electron').ipcMain; 
const fs = require("fs"); 
const path = require("path"); 
const crypto = require("crypto"); 
const isDev = require("electron-is-dev"); 

const ENCRYPTED_FILE_EXTENSION = ".lguard";

const AES_256_GCM = "aes-256-gcm";

const METADATA_LEN = 96;

/**
 * @param {String} input 
 * @param {String} search 
 * @param {String} replacement 
 */
function replaceLast(input, search, replacement) {
    const index = input.lastIndexOf(search);
    if (index === -1) {
        return input;
    }
    return (
        input.substring(0, index) +
        replacement +
        input.substring(index + search.length)
    );
}

/**
 * @param {String} filePath 
 * @return {String}
 */
function createDecryptedFilePath(filePath) {
    let decryptedFilePath = replaceLast(filePath, ENCRYPTED_FILE_EXTENSION, "");
    let splitPath = decryptedFilePath.split(".");
    splitPath.splice(splitPath.length - 1, 0, "lguard");
    decryptedFilePath = splitPath.join(".");
    return decryptedFilePath;
}

/**
 * @param  {Buffer} salt         
 * @param  {string} encryptionKey 
 * @return {Buffer}           
 */
function createDerivedKey(salt, encryptionKey) {
    return crypto.pbkdf2Sync(
        encryptionKey,
        salt,
        10000,
        32, 
        "sha512"
    );
}

/**
 * @param  {String} filePath      
 * @param  {String} encryptionKey 
 * @return {String}               
 */
function encryptFile(filePath, encryptionKey) {
    // Генерируем случайную соль и производный ключ из пароля
    const salt = crypto.randomBytes(64);
    const derivedKey = createDerivedKey(salt, encryptionKey);
    const initializationVector = crypto.randomBytes(16);

    // Создаем шифр с использованием ключа
    let cipher = crypto.createCipheriv(
        AES_256_GCM,
        derivedKey,
        initializationVector
    );

    // Создаем поток записи для зашифрованного файла
    const encryptedFilePath = `${filePath}${ENCRYPTED_FILE_EXTENSION}`;
    const tempAuthTag = Buffer.from({length: 16}).fill(0xff);
    const writeStream = fs.createWriteStream(encryptedFilePath);

    // Записываем соль, вектор инициализации и временный тег аутентификации в зашифрованный файл
    writeStream.write(salt);
    writeStream.write(initializationVector);
    writeStream.write(tempAuthTag);

    // Шифруем данные и записываем их в файл
    fs.createReadStream(filePath)
        .pipe(cipher)
        .pipe(writeStream)
        .on("finish", () => {
            // Заменяем временный тег на реальный
            const realAuthTag = cipher.getAuthTag();
            const fd = fs.openSync(encryptedFilePath, "r+");
            fs.write(fd, realAuthTag, 0, 16, 80, () => {});
        });

    return encryptedFilePath;
}

/**
 * Дешифрует файл
 * @param  {String} filePath      Путь к зашифрованному файлу
 * @param  {String} decryptionKey Ключ дешифрования
 * @param  {Object} event         Объект для отправки сообщений обратно в главный процесс
 * @return {String}               Путь к расшифрованному файлу
 */
function decryptFile(filePath, decryptionKey, event) {
    let salt, initializationVector, authTag;
    const decryptedFilePath = createDecryptedFilePath(filePath);

    // Чтение зашифрованных данных из файла
    const encryptedData = fs.readFileSync(filePath);

    // Извлечение метаданных из начала файла
    salt = encryptedData.slice(0, 64);
    initializationVector = encryptedData.slice(64, 80);
    authTag = encryptedData.slice(80, 96);

    // Создание ключа на основе соли и пароля
    const derivedKey = createDerivedKey(salt, decryptionKey);
    const decrypt = crypto.createDecipheriv(
        AES_256_GCM,
        derivedKey,
        initializationVector
    );

    // Устанавливаем тег аутентификации
    decrypt.setAuthTag(authTag);

    let decryptedData;
    try {
        // Расшифровка данных
        decryptedData = Buffer.concat([decrypt.update(encryptedData.slice(METADATA_LEN)), decrypt.final()]);
    } catch (error) {
        // Обработка ошибок
        if (error.message === 'Unsupported state or unable to authenticate data') {
            console.error("Incorrect decryption key provided.");
            event.reply("decryptFileResponse", {
                decryptedFilePath,
                error: true
            });
        } else {
            console.error("Error decrypting file:", error);
            fs.unlinkSync(decryptedFilePath);
            event.reply("decryptFileResponse", {
                decryptedFilePath,
                error: true
            });
        }
        return decryptedFilePath;
    }

    // Запись расшифрованных данных в файл
    fs.writeFileSync(decryptedFilePath, decryptedData);

    // Проверка успешности операции
    if (fs.existsSync(decryptedFilePath)) {
        event.reply("decryptFileResponse", {
            decryptedFilePath,
            error: false
        });
    } else {
        console.error("Decrypted file not found:", decryptedFilePath);
        event.reply("decryptFileResponse", {
            decryptedFilePath,
            error: true
        });
    }
    return decryptedFilePath;
}

/**************
 * Настройка окна
 **************/

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 800,
        resizable: true,
        minWidth: 500,
        minHeight: 800,
        maxWidth: 500,
        maxHeight: 800,
        icon: path.join(__dirname, "../public/favicon.ico"),
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    if (isDev) {
        mainWindow.loadFile('build/index.html')
    } else {
        mainWindow.loadFile('build/index.html')
    }

    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => createWindow());

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("encryptFileRequest", (event, arg) => {
    const {filePath, password} = arg;
    event.returnValue = encryptFile(filePath, password);
});
ipcMain.on("decryptFileRequest", (event, arg) => {
    const {filePath, password} = arg;
    decryptFile(filePath, password, event);
});