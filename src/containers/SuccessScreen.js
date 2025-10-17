// Этот код представляет компонент React с именем SuccessScreen, который отображает экран успешного завершения операции. 
// Он содержит анимацию, текст "Success!", а также две кнопки: "Reveal in Finder" и "Back to Home". 
// Первая кнопка используется для отображения файла в Finder (для платформы Electron), вторая - для возврата на домашний экран.
import React, { Component, Fragment } from "react";
import "./SuccessScreen.css";

import Lottie from "react-lottie";
import checkmarkAnimationData from "../checkmark.json";

import Button from "../components/Button";

// Импорт модулей из electron
const { shell, remote } = window.require("electron");

// Опции анимации для компонента Lottie
const animationOptions = {
	loop: false,
	autoplay: true,
	animationData: checkmarkAnimationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

// Определение компонента React с именем SuccessScreen
export default class SuccessScreen extends Component {
	// Метод для отображения файла в Finder (для платформы Electron)
	onRevealInFinder = () => {
		const { filePath } = this.props;    // Получение пути к файлу из props
		const shellToUse = shell || remote.shell; // Использование shell из electron или remote.shell для оболочки

		shellToUse.showItemInFolder(filePath);   // Показать файл в Finder
	};

	// Метод render компонента SuccessScreen
	render() {
		const { onGoHome, language } = this.props;    // Деструктуризация функции onGoHome из props

		const translation = require(`../translations/${language}.json`);

		// Возвращение JSX, представляющего экран успешного завершения
		return (
			<Fragment>
			
				<div className="successBody">
					<Lottie
						options={animationOptions}   // Параметры анимации
						height={130}
						width={250}
					/>
					<span className="successText">{translation.success}</span>
					<div className="buttonsWrapper">
						<Button
							isPrimary={true}    // Определение первичной кнопки
							onClick={this.onRevealInFinder}    // Обработчик нажатия кнопки "Reveal in Finder"
						>
							<span className="openFinderText">
							{translation.revealInFinder}
							</span>
						</Button>
						<Button isPrimary={false} onClick={onGoHome}>   
							<span className="backToQuickLockText">
							{translation.backToHome}
							</span>
						</Button>
					</div>
				</div>
			</Fragment>
		); // Определение вторичной кнопки
	}
}