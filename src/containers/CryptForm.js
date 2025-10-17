import React, { Component, Fragment } from "react";
import "./CryptForm.css";
import FileHeader from "../components/FileHeader"; // Импорт компонента заголовка файла
import Input from "../components/Input"; // Импорт компонента ввода
import Button from "../components/Button"; // Импорт компонента кнопки

// Импорт SVG-иконок для различных расширений файлов
import WordIcon from "../icons/word.svg";
import PdfIcon from "../icons/pdf.svg";
import ExcelIcon from "../icons/excel.svg";
import PptIcon from "../icons/ppt.svg";
import PptxIcon from "../icons/pptx.svg";
import ZipIcon from "../icons/zip.svg";
import Zip7Icon from "../icons/7z.svg";
import TarIcon from "../icons/tar.svg";
import RarIcon from "../icons/rar.svg";
import ImgIcon from "../icons/img.svg";
import ImageIcon from "../icons/image.svg"
import IsoIcon from "../icons/iso.svg"
import TxtIcon from "../icons/txt.svg";
import VideoIcon from "../icons/video.svg";
import CodeIcon from "../icons/code.svg";
import Mp3Icon from "../icons/audio.svg";
import GifIcon from "../icons/gif.svg";
import ExeIcon from "../icons/exe.svg";
import LguardIcon from "../icons/lguard.svg";
import MsiIcon from "../icons/msi.svg";
import BatIcon from "../icons/bat.svg";
import DefaultIcon from "../icons/file.svg";

export default class CryptForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "", // Пароль
            confirmPassword: "", // Подтверждение пароля
            displayError: props.displayError, // Отображение ошибки
            showPassword: false // Показывать пароль или нет
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.displayError !== prevProps.displayError) {
            this.setState({ displayError: this.props.displayError });
        }
    }

    onDragStartHandler = event => {
        event.preventDefault();
    };

    // Функция-обертка для обработки отправки формы
    onSubmitWrapper = () => {
        const { onSubmit, isDecryption } = this.props;
        const { password, confirmPassword } = this.state;
    
        if (isDecryption && password !== "") {
            onSubmit(password);
            this.setState({ displayError: true }); // Ошибка при неправильном пароле
        } else if (password === confirmPassword) {
            onSubmit(password);
            this.setState({ displayError: false }); // Сброс ошибки при успешном действии
        } else {
            this.setState({ displayError: true });
        }
    };
    
    // Обработчик нажатия клавиши Enter
    onKeyPress = event => {
        if (event.key === "Enter") {
            this.onSubmitWrapper();
        }
    };
    
    // Обработчик изменения пароля
    onPasswordChange = event => {
        const password = event.target.value;
        this.setState({ password, displayError: false }, this.onInputChange);
    };

    // Обработчик изменения подтверждения пароля
    onConfirmPasswordChange = event => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword, displayError: false }, this.onInputChange);
    };

    // Обработчик сброса ошибки при изменении поля ввода
    onInputChange = () => {
        this.setState({ displayError: false });
    };

    // Обработчик изменения состояния отображения пароля
    toggleShowPassword = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };
    
    render() {
        const { fileName, onAbort, isDecryption, language, fileLocation, fileCreationDate, fileType, fileSize } = this.props;
        const { password, confirmPassword, displayError, showPassword } = this.state;

        // Внутри компонента CryptForm

// Получение перевода на выбранный язык
const translation = require(`../translations/${language}.json`);



        let buttonIcon, buttonText, errorMessage, inputStyle;
        if (isDecryption) {
            buttonIcon = "./decryptIcon.svg"; // Иконка кнопки дешифрования
            buttonText = translation.decrypt; // Текст кнопки дешифрования
            errorMessage = translation.incorrectPasswordError; // Сообщение об ошибке при дешифровании
            inputStyle = { marginTop: "55px" }; // Стиль для случая дешифрования
        } else {
            buttonIcon = "./encryptIcon.svg"; // Иконка кнопки шифрования
            buttonText = translation.encrypt; // Текст кнопки шифрования
            errorMessage = translation.passwordMismatchError; // Сообщение об ошибке при шифровании
            inputStyle = {}; // Начальный стиль для случая шифрования
        }

        // Определение расширения файла
        const fileExtension = fileName.split('.').pop().toLowerCase();

        // Определение соответствующей SVG-иконки на основе расширения файла
        let fileIcon;
        switch(fileExtension) {
            case 'doc':
            case 'docx':
                fileIcon = WordIcon;
                break;
            case 'pdf':
                fileIcon = PdfIcon;
                break;
             case 'bat':
                fileIcon = BatIcon;
                break;
            case 'xls':
            case 'xlsx':
                fileIcon = ExcelIcon;
                break;
            case '7zip':
                fileIcon = Zip7Icon;
                break;
            case 'rar':
                fileIcon = RarIcon;
                break;
            case 'zip':
                fileIcon = ZipIcon;
                break;
            case 'tar':
                fileIcon = TarIcon;
                break;
            case 'iso':
                fileIcon = IsoIcon;
                break;
            case "jpg":
            case "jpeg":
            case "png":
            case "tiff":
            case "ico":  
                fileIcon = ImageIcon;
                break;
            case "img":  
                fileIcon = ImgIcon;
                break;
            case 'txt':
                fileIcon = TxtIcon;
                break;
            case "mp4":
            case "avi":
            case "mov":
            case "wmv":
            case "mkv":
                fileIcon = VideoIcon;
                break;
            case "xml":
            case "json":
            case "html":
            case "css":
            case "js":
            case "cpp":
            case "cs":
            case "ts":
            case "py":
                fileIcon = CodeIcon;
                break;
            case "mp3":
            case "wav":
            case "ogg":
            case "flac":
            case "m4a":
            case "wma":
            case "aac":
                fileIcon = Mp3Icon;
                break;
            case 'gif':
                fileIcon = GifIcon;
                break;
            case 'msi':
                fileIcon = MsiIcon;
            case 'exe':
                fileIcon = ExeIcon;
                break;
            case 'lguard':
                fileIcon = LguardIcon;
                break;
            case 'ppt':
                fileIcon = PptIcon;
                break;
            case 'pptx':
                fileIcon = PptxIcon;
                break;
            default:
                fileIcon = DefaultIcon;
                break;
        }

        return (
            <Fragment>
                <FileHeader fileName={fileName} onDragStart={this.onDragStartHandler}/> {/* Заголовок файла */}
                <div className="formBody">
                    <div className="fileIconText" onDragStart={this.onDragStartHandler}>
                        {isDecryption ? translation.decrypt : translation.encrypt}
                    </div>
                    <div className="fileMetadataWrapper">
                      <div className="fileMetadataItem">{translation.location}:</div>
                      <div className="fileMetadataItem">{translation.modifiedDate}:</div>
                      <div className="fileMetadataItem">{translation.fileType}:</div>
                      <div className="fileMetadataItem">{translation.fileSize}:</div>
                    </div>
                    <div className="fileDataWrapper">
                      <div className="fileData">{fileLocation}</div>
                      <div className="fileData">{fileCreationDate}</div>
                      <div className="fileData">{fileType}</div>
                      <div className="fileData">{fileSize}</div>
                    </div>
                    <img className="fileIcon" src={fileIcon} onDragStart={this.onDragStartHandler}/> {/* Иконка файла */}
                    <Input onDragStart={this.onDragStartHandler}
                        placeholder={translation.enterPassword} // Подсказка для ввода пароля
                        value={password}
                        onChange={this.onPasswordChange} // Изменение пароля
                        inErrorMode={displayError}
                        onKeyPress={this.onKeyPress}
                        type={showPassword ? "text" : "password"} // Изменение типа поля ввода в зависимости от состояния чекбокса
                        autoFocus
                        style={inputStyle} // Применение стиля в зависимости от случая
                    />
                    {!isDecryption ? (
                        <Input onDragStart={this.onDragStartHandler}
                            placeholder={translation.confirmPassword} // Подсказка для подтверждения пароля
                            value={confirmPassword}
                            onChange={this.onConfirmPasswordChange} // Изменение подтверждения пароля
                            onKeyPress={this.onKeyPress}
                            inErrorMode={displayError}
                            type="password" // Изменение типа поля ввода в зависимости от состояния чекбокса
                            style={inputStyle} // Применение стиля в зависимости от случая
                        />    
                    ) : null}
                    <div className="checkboxWrapper" onDragStart={this.onDragStartHandler}>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={this.toggleShowPassword}
                        />
                        <label className="checkboxLabel">{translation.showPassword}</label>
                    </div>
                    {displayError ? (
                        <span className="errorText">{errorMessage}</span> // Отображение сообщения об ошибке
                    ) : null}
                    <div className="buttonsWrapper">
                        <Button isPrimary={true} onClick={this.onSubmitWrapper}> {/* Кнопка для отправки формы */}
                            <img
                                className="primaryButtonIcon"
                                src={buttonIcon}
                                alt={translation.uploadIconAlt}
                            />
                            <span className="primaryButtonText">
                                {buttonText}
                            </span>
                        </Button>
                        <Button isPrimary={false} onClick={onAbort}> {/* Кнопка для отмены операции */}
                            <span className="abortButtonText">{translation.abort}</span>
                        </Button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

CryptForm.defaultProps = {
    isDecryption: false, // По умолчанию операция шифрования
    displayError: false // По умолчанию ошибка скрыта
};