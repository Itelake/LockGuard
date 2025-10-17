import React, { Component } from "react";
import "./FileHeader.css";
import { getClass } from "file-icons-js"; // Импорт функции getClass из модуля file-icons-js
import primer from "./title.png"; // Импорт изображения

// Определение компонента React с именем FileHeader
export default class FileHeader extends Component {
  // Метод render компонента FileHeader
  render() {
    const { fileName } = this.props;    // Деструктуризация свойства fileName из props
    const iconClassName = getClass(fileName); // Получение класса иконки для файла
    const fileIsEncrypted = fileName.endsWith(".lguard"); // Проверка, является ли файл зашифрованным

    // Возвращение JSX, представляющего верхнюю часть файла
    return (
      <div className="fileHeader">
        <div className="fileName">
        {!fileIsEncrypted && (
    <img src={primer} alt="Encryption" onDragStart={event => event.preventDefault()} />
)}
{fileIsEncrypted && (
    <img src={primer} alt="Decryption" onDragStart={event => event.preventDefault()} />
)}
          <span className="filePathWrapper">
            <i className={iconClassName} id="fileIcon" /> 
            <span
              className={
                fileIsEncrypted ? "filePathEncrypted" : "filePath" 
              }
            >
              {fileName}
            </span>
          </span>
        </div>
      </div>
    );
  }}    