import React, { Component } from "react";
import "./App.css";
import FileUpload from "./containers/FileUpload"; 
import CryptForm from "./containers/CryptForm"; 
import SuccessScreen from "./containers/SuccessScreen"; 

const ipcRenderer = window.require("electron").ipcRenderer; 

const DEFAULT_STATE = {
    filePath: "",
    fileName: "", 
    fileType: "", 
    fileSize: "", 
    fileLocation: "", 
    fileCreationDate: "", 
    viewCode: 0, 
    language: "english" 
};

export default class App extends Component {
    constructor(props) {
        super(props);

        const savedLanguage = localStorage.getItem("language");
        const initialLanguage = savedLanguage ? savedLanguage : "english";

        this.state = {
            ...DEFAULT_STATE,
            language: initialLanguage 
        };
    }

    setFilePath = file => {
        const { name, path, type, size, creationDate } = file;
        let fileSizeWithUnit;

        if (size < 1024 * 1024) {
            const fileSizeInKB = (size / 1024).toFixed(2); 
            fileSizeWithUnit = `${fileSizeInKB} KB`; 
        } else {
            const fileSizeInMB = (size / (1024 * 1024)).toFixed(2); 
            fileSizeWithUnit = `${fileSizeInMB} MB`; 
        }

        const parts = path.split("\\"); 
        const directoryPath = parts.slice(0, -1).join("\\") + "\\"; 

        this.setState({
            filePath: path,
            fileName: name,
            fileType: type,
            fileSize: fileSizeWithUnit, 
            fileLocation: directoryPath, // Сохраняем только путь к папке без имени файла
            fileCreationDate: creationDate,
            viewCode: 1, // Переключение на экран формы для шифрования/дешифрования файла
        });
    };

    // Функция для изменения языка приложения
    onChangeLanguage = language => {
        localStorage.setItem("language", language); // Сохранение языка в localStorage
        this.setState({ language });
    };

    // Функция для отмены текущей операции и возвращения к начальному состоянию
    onAbort = () => this.setState(DEFAULT_STATE);

    // Функция для загрузки файла
    onFileUpload = fileDetails => {
        this.setFilePath(fileDetails); // Передаем информацию о файле в функцию setFilePath
    };

    // Функция для шифрования файла
    onEncrypt = password => {
        const { filePath } = this.state;
        const encryptedFilePath = ipcRenderer.sendSync("encryptFileRequest", {
            filePath,
            password
        });

        this.setState({
            viewCode: 2, // Переключение на экран успешного завершения операции
            cryptedFilePath: encryptedFilePath
        });
    };

    // Функция для дешифрования файла
    onDecrypt = password => {
        const { filePath } = this.state;

        ipcRenderer.send("decryptFileRequest", { filePath, password });
        ipcRenderer.on("decryptFileResponse", (event, arg) => {
            const { decryptedFilePath, error } = arg;

            if (!error) {
                this.setState({
                    viewCode: 2, // Переключение на экран успешного завершения операции
                    cryptedFilePath: decryptedFilePath
                });
            } else {
                this.setState({ viewCode: 3 }); // Переключение на экран с ошибкой
            }
        });
    };

    render() {
        const { cryptedFilePath, viewCode, language, fileName, fileType, fileSize, fileLocation, fileCreationDate } = this.state;

        const fileIsEncrypted = fileName.toLowerCase().endsWith(".lguard");
        let appBody;
        if (viewCode === 0) {
            // Отображение компонента для загрузки файла
            appBody = <FileUpload onFileUpload={this.onFileUpload} setFilePath={this.setFilePath} onChangeLanguage={this.onChangeLanguage} />;
        } else if (viewCode === 1 && !fileIsEncrypted) {
            // Отображение формы для шифрования файла
            appBody = (
                <CryptForm
                    fileName={fileName}
                    fileType={fileType}
                    fileSize={fileSize}
                    fileLocation={fileLocation}
                    fileCreationDate={fileCreationDate}
                    onSubmit={this.onEncrypt}
                    onAbort={this.onAbort}
                    language={this.state.language}
                />
            );
        } else if (viewCode === 1 && fileIsEncrypted) {
            // Отображение формы для дешифрования файла
            appBody = (
                <CryptForm
                    fileName={fileName}
                    fileType={fileType}
                    fileSize={fileSize}
                    fileLocation={fileLocation}
                    fileCreationDate={fileCreationDate}
                    onSubmit={this.onDecrypt}
                    onAbort={this.onAbort}
                    isDecryption={fileIsEncrypted}
                    language={this.state.language}
                />
            );
        } else if (viewCode === 2) {
            // Отображение экрана успешного завершения операции
            appBody = (
                <SuccessScreen
                    onGoHome={() => this.setState({ viewCode: 0 })}
                    filePath={cryptedFilePath}
                    language={this.state.language}
                />
            );
        } else if (viewCode === 3) {
            // Отображение формы с ошибкой
            appBody = (
                <CryptForm
                    fileName={fileName}
                    fileType={fileType}
                    fileSize={fileSize}
                    fileLocation={fileLocation}
                    fileCreationDate={fileCreationDate}
                    onSubmit={this.onDecrypt}
                    onAbort={this.onAbort}
                    isDecryption={fileIsEncrypted}
                    displayError={false}
                    language={this.state.language}
                />
            );
        }

        return (
            <div className="app">
                <div className="titlebar" /> {/* Заголовок приложения */}
                {appBody} {/* Основное содержимое приложения */}
            </div>
        );
    }
}
