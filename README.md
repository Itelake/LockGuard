# 🔐 LockGuard — File Encryption App

[![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)


Кроссплатформенное десктопное приложение для надёжного шифрования и дешифрования файлов с использованием алгоритма **AES-256-GCM**. Интуитивно понятный интерфейс делает защиту данных доступной для любого пользователя.

---

## 🚀 Возможности

### 🔒 Шифрование файлов
- Шифрование любых файлов с помощью AES-256-GCM
- Защита паролем с генерацией производного ключа (PBKDF2)
- Случайная генерация соли и вектора инициализации (IV) для каждого файла
- Аутентификация данных — защита от несанкционированного изменения (GCM tag)

### 🔓 Дешифрование файлов
- Восстановление оригинальных файлов по паролю
- Проверка целостности данных перед дешифрованием

### 🖥️ Интерфейс
- Простой и понятный UI, не требующий технических знаний
- Работает на Windows, Linux и macOS

---

## ⚙️ Алгоритм шифрования

**AES-256-GCM** был выбран как наиболее современный и надёжный стандарт:

| Параметр | Значение |
|----------|----------|
| Алгоритм | AES (Advanced Encryption Standard) |
| Длина ключа | 256 бит |
| Режим | GCM (Galois/Counter Mode) |
| Тип | Симметричный блоковый |

**Почему AES-256-GCM?**
- ✅ Высокая производительность
- ✅ Аутентификация сообщений (защита целостности)
- ✅ Устойчивость к большинству известных атак
- ✅ Отраслевой стандарт (используется в TLS, SSH и др.)

---

## 📋 Этапы шифрования

```
1. Ввод пароля пользователем
        ↓
2. Генерация случайной соли
        ↓
3. Производный ключ (PBKDF2 из пароля + соли)
        ↓
4. Генерация вектора инициализации (IV)
        ↓
5. Создание AES-256-GCM шифра
        ↓
6. Шифрование данных файла
        ↓
7. Сохранение результата (соль + IV + зашифрованные данные + GCM tag)
```

---

## 🛠 Стек технологий

| Слой | Технология | Назначение |
|------|-----------|------------|
| **Framework** | Electron.js | Кроссплатформенное десктопное приложение |
| **Frontend** | React.js | Пользовательский интерфейс |
| **Стили** | HTML5 + CSS3 | Разметка и оформление |
| **Backend** | Node.js | Обработка файлов |
| **Шифрование** | Crypto (Node.js built-in) | AES-256-GCM шифрование |
| **IDE** | Visual Studio Code | Среда разработки |

---

## 📊 Сравнение с аналогами

| Программа | Открытый код | Кроссплатформенность | Простота | AES-256 | Скорость |
|-----------|:-----------:|:-------------------:|:--------:|:-------:|:--------:|
| **LockGuard** | ✅ | ✅ | ✅ | ✅ | ✅ |
| BitLocker | ❌ | ❌ | ✅ | ✅ | ✅ |
| AxCrypt | ❌ | ❌ | ✅ | ✅ | ✅ |
| VeraCrypt | ✅ | ✅ | ❌ | ✅ | ❌ |
| Cryptomator | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## 📂 Структура проекта

```
lockguard/
├── src/
│   ├── main/           # Electron main process (Node.js)
│   │   └── crypto/     # Логика шифрования/дешифрования
│   └── renderer/       # React UI
│       ├── components/ # Компоненты интерфейса
│       └── styles/     # CSS стили
├── public/             # Статические ресурсы
├── package.json
└── README.md
```

---

## ⚙️ Установка и запуск

### Требования
- Node.js 16+
- npm или yarn

### Шаги

```bash
# 1. Клонировать репозиторий
git clone https://github.com/IskakCS102/LockGuard.git
cd LockGuard

# 2. Установить зависимости
npm install

# 3. Запустить в режиме разработки
npm start

# 4. Собрать приложение
npm run build
```

---

## 💡 Использование

1. Запустить LockGuard
2. Выбрать файл для шифрования / дешифрования
3. Ввести пароль
4. Нажать **Зашифровать** или **Расшифровать**
5. Сохранить результат

> ⚠️ Запомните пароль — без него восстановление файла невозможно.

---

## 📄 Лицензия

MIT License
