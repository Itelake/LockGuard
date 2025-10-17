// Этот код представляет компонент React с именем Button, который представляет собой кнопку. Он принимает свойства onClick, isPrimary, и children. 
// В зависимости от значения isPrimary он применяет разные CSS-классы для стилизации кнопки как основную или второстепенную. 
// Он также передает функцию onClick в качестве обработчика события клика по кнопке.
import React, { Component } from "react";
import "./Button.css";

// Определение компонента React с именем Button
export default class Button extends Component {
	// Метод render компонента Button
	render() {
		const { onClick, isPrimary, children } = this.props;   // Деструктуризация свойств onClick, isPrimary и children из props
		
		// Возвращение JSX, представляющего кнопку
		return (
			<div
				className={isPrimary ? "primaryButton" : "secondaryButton"} // Условное применение CSS-класса в зависимости от значения isPrimary
				onClick={onClick}   // Обработчик события клика по кнопке
			>
				{children}     
			</div> // Вывод содержимого кнопки
		);
	}
}
