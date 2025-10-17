import React from "react"; // Импортируем библиотеку React для создания пользовательского интерфейса
import ReactDOM from "react-dom"; // Импортируем ReactDOM для взаимодействия с DOM
import "./index.css"; // Импортируем стили для главного компонента
import App from "./App"; // Импортируем компонент App, который будет отображаться внутри DOM
// Рендерим компонент App в элемент с id "root" в DOM-структуре страницы
ReactDOM.render(<App />, document.getElementById("root"));
