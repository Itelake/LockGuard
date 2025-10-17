import React, { Component, Fragment } from "react";
import "./FileUpload.css";

import Logo128 from "../icons/logo128.png";
import Logo96 from "../icons/logo96.png";
import rk1 from "../icons/rk1.png";
import rk2 from "../icons/rk2.png";
import rk3 from "../icons/rk3.png";
import rk4 from "../icons/rk4.png";
import rk5 from "../icons/rk5.png";
import rk6 from "../icons/rk6.png";
import rk7 from "../icons/rk7.png";
import rk8 from "../icons/rk8.png";



const { version } = require("../../package.json");
const translations = {
    english: require("../translations/english.json"),
    kazakh: require("../translations/kazakh.json"),
    russian: require("../translations/russian.json")
};

const getFileType = filename => {
    const extension = filename.split(".").pop().toLowerCase(); // Получаем расширение файла и приводим его к нижнему регистру

    switch (extension) {
        case "pdf":
            return "Adobe PDF Document";
        case "iso":
            return "Disk Image File";
        case "lguard":
            return "Encrypted Document";
        case "doc":
        case "docx":
            return "Microsoft Word Document";
        case "xls":
        case "xlsx":
            return "Microsoft Excel Spreadsheet";
        case "ppt":
        case "pptx":
            return "Microsoft PowerPoint Presentation";
        case "zip":
        case "rar":
        case "7zip":
            return "Compressed Archive";
        case "jpg":
        case "jpeg":
        case "png":
        case "tiff":
        case "ico":    
            return "Image File";
        case "txt":
            return "Text Document";
        case "mp4":
        case "avi":
        case "mov":
        case "wmv":
        case "mkv":
            return "Video File";
        case "xml":
        case "json":
        case "html":
        case "css":
        case "js":
        case "cpp":
        case "cs":
        case "ts":
        case "py":
            return "Code File";
        case "mp3":
        case "wav":
        case "ogg":
        case "flac":
        case "m4a":
        case "wma":
        case "aac":
            return "Audio File";
        case "gif":
            return "GIF Image";
        case "exe":
        case "msi":
        case "bat":
        case "app":
            return "Executable File";
        default:
            return "Unknown File Type";
    }
};

export default class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: "english",
            translation: translations.english,
            showDeveloperInfo: false,
            showHelp: false, 
            showInfo:false,
            fileCreationDate: null, // Дата создания файла
            fileLocation: null // Местоположение файла
        };
    }

    onDragOver = event => {
        event.preventDefault();
        return false;
    };

    handleExit = () => {
        window.close();
    };

    toggleDeveloperInfo = () => {
        this.setState(prevState => ({
            showDeveloperInfo: !prevState.showDeveloperInfo
        }));
    }; 

    toggleHelp = () => {
        this.setState(prevState => ({
            showHelp: !prevState.showHelp
        }));
    }; 

    toggleInfo = () => {
        this.setState(prevState => ({
            showInfo: !prevState.showInfo
        }));
    }; 

    onDragStartHandler = event => {
        event.preventDefault();
    };

    toggleLanguage = () => {
        const newLanguage =
            this.state.language === "english"
                ? "russian"
                : this.state.language === "russian"
                ? "kazakh"
                : "english";
        this.setState(
            {
                language: newLanguage,
                translation: translations[newLanguage]
            },
            () => {
                // Сохраняем выбранный язык в localStorage
                localStorage.setItem("language", newLanguage);
            }
        );
        this.props.onChangeLanguage(newLanguage);
    };
    
    componentDidMount() {
        // Проверяем, сохранен ли выбранный язык в localStorage
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            this.setState({
                language: savedLanguage,
                translation: translations[savedLanguage]
            });
        }
    }
    

    render() {
        const { translation, showDeveloperInfo} = this.state;
        
        if (showDeveloperInfo) {
            return (

                <div className="developerInfomation"onDragStart={this.onDragStartHandler}>
                    <div>
                        <img src={Logo128}/>
                        <div className="imgtitle">LockGuard</div>
                        <div className="logotitle">{translation.appDescription}</div>
                    </div>
                    <hr className="shortHR"/>
                    {translation.changeLog}<br/> 
                    <div className="versionScroll"><br/>
                    <span className="versionNumber">{translation.version1_0_0}</span><br/>
                    <ul><li>{translation.version1_0_0_details1}<br/></li>
                    <li>{translation.version1_0_0_details2}<br/></li>
                    <li>{translation.version1_0_0_details3}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_9_0}</span><br/>
                    <ul><li>{translation.version0_9_0_details1}<br/></li>
                    <li>{translation.version0_9_0_details2}</li>
                    <li>{translation.version0_9_0_details3}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_8_0}</span><br/>
                    <ul><li>{translation.version0_8_0_details1}<br/></li>
                    <li>{translation.version0_8_0_details2}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_7_0}</span><br/>
                    <ul><li>{translation.version0_7_0_details1}<br/></li>
                    <li>{translation.version0_7_0_details2}<br/></li>
                    <li>{translation.version0_7_0_details3}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_6_0}</span><br/>
                    <ul><li>{translation.version0_6_0_details1}<br/></li>
                    <li>{translation.version0_6_0_details2}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_5_0}</span><br/>
                    <ul><li>{translation.version0_5_0_details1}<br/></li>
                    <li>{translation.version0_5_0_details2}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_4_0}</span><br/>
                    <ul><li>{translation.version0_4_0_details1}<br/></li>
                    <li>{translation.version0_4_0_details2}<br/></li>
                    <li>{translation.version0_4_0_details3}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_3_0}</span><br/>
                    <ul><li>{translation.version0_3_0_details1}<br/></li>
                    <li>{translation.version0_3_0_details2}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_2_0}</span><br/>
                    <ul><li>{translation.version0_2_0_details1}<br/></li>
                    <li>{translation.version0_2_0_details2}<br/></li>
                    <li>{translation.version0_2_0_details3}<br/></li>
                    <li>{translation.version0_2_0_details4}</li></ul><br/>
                    <span className="versionNumber">{translation.version0_1_0}</span><br/>
                    <ul><li>{translation.version0_1_0_details1}<br/></li>
                    <li>{translation.version0_1_0_details2}<br/></li>
                    <li>{translation.version0_1_0_details3}<br/></li>
                    <li>{translation.version0_1_0_details4}<br/></li>
                    <li>{translation.version0_1_0_details5}</li></ul><br/>
                    </div>
                    <div className="BackButtonWrapper">
                        <button className="BackButtonText" onClick={this.toggleDeveloperInfo}>Назад</button>
                    </div>
                </div>
            );
        }        

        if (this.state.showHelp) {
            return (
                <div className="developerInfo"onDragStart={this.onDragStartHandler}>
                   <div>
                        <img src={Logo128}/>
                        <div className="imgtitle">LockGuard</div>
                        <div className="logotitle">{translation.appDescription}</div>
                    </div>
                    <hr className="shortHR"/>
                    Руководство пользователя<br/>
                    <div className="HelpScroll" onDragStart={this.onDragStartHandler}>
                    <img src={rk1} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture1}</div> <br/>
                    {translation.helpinformation1_part1}<br/>
                    {translation.helpinformation1_part2}<br/>
                    {translation.helpinformation1_part3}<br/>
                    {translation.helpinformation1_part4}<br/>
                    {translation.helpinformation1_part5}<br/>
                    {translation.helpinformation1_part6}<br/>
                    {translation.helpinformation1_part7}<br/>
                    <img src={rk2} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture2}</div> <br/>
                    {translation.helpinformation2}<br/>
                    <img src={rk3} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture3}</div> <br/>
                    {translation.helpinformation3}<br/>
                    <img src={rk4} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture4}</div> <br/>
                    {translation.helpinformation4_part1}<br/> 
                    {translation.helpinformation4_part2}<br/> 
                    {translation.helpinformation4_part3}<br/> 
                    {translation.helpinformation4_part4}<br/> 
                    {translation.helpinformation4_part5}<br/> 
                    {translation.helpinformation4_part6}<br/> 
                    {translation.helpinformation4_part7}<br/> 
                    {translation.helpinformation4_part8}<br/>
                    {translation.helpinformation4_part9}<br/>
                    <img src={rk5} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture5}</div> <br/>
                    {translation.helpinformation5_part1}<br/> 
                    {translation.helpinformation5_part2}<br/> 
                    {translation.helpinformation5_part3}<br/> 
                    <img src={rk6} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture6}</div> <br/>
                    {translation.helpinformation6_part1}<br/> 
                    {translation.helpinformation6_part2}<br/> 
                    {translation.helpinformation6_part3}<br/> 
                    {translation.helpinformation6_part4}<br/> 
                    {translation.helpinformation6_part5}<br/>
                    {translation.helpinformation6_part6}<br/> 
                    <img src={rk7} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture7}</div> <br/>
                    {translation.helpinformation7_part1}<br/>
                    {translation.helpinformation7_part2}<br/>
                    {translation.helpinformation7_part3}<br/>
                    <img src={rk8} class="imghelp"/> <br/>  
                    <div className="TextHelp">{translation.picture8}</div> <br/>
                    {translation.helpinformation8_part1}<br/> 
                    {translation.helpinformation8_part2}<br/> 
                    {translation.helpinformation8_part3}<br/> 
                    {translation.helpinformation8_part4}<br/> 
                    </div>
                    <div className="BackButtonWrapper">
                        <button className="BackButtonText" onClick={this.toggleHelp}>Назад</button>
                    </div>
                </div>
            );
        }
        
        if (this.state.showInfo) {
            return (
                <div className="developerInfo"onDragStart={this.onDragStartHandler}>
                    <div>
                        <img src={Logo128}/>
                        <div className="imgtitle">LockGuard</div>
                        <div className="logotitle">{translation.appDescription}</div>
                    </div>
                    <hr className="shortHR"/>
                    {translation.information_diplom}<br/>
                    {translation.Author_work}<br/>
                    <div className="authorInfo">
                    <div className="authorName">Искак И.А.</div>
                    <div className="authorGroup">CS-302(c)</div> <br/>
                    </div>
                    islam.iskak2001@gmail.com
                    <hr className="shortHR"/>
                    <div>
                    {translation.diploma}<br/>
                    Улихина Ю.В.
                    </div> 
                    <div className="BackButtonWrapper">
                        <button className="BackButtonText" onClick={this.toggleInfo}>Назад</button>
                    </div>
                </div>
            );
        }

        return (
            <Fragment>
                <div class="lockguardIcon" onDragStart={this.onDragStartHandler}>
                <img src={Logo96} onDragStart={this.onDragStartHandler}/><br/>
                <span class="lockguardTitle">LockGuard</span><br/>
                {translation.main_name}
                </div>
                <button className="HelpButton" onClick={this.toggleHelp} onDragStart={this.onDragStartHandler}>
                <img src="./help.svg" alt="Help Icon" />
                {translation.HelpButton}
                </button>
                <button className="InfoButton" onClick={this.toggleInfo} onDragStart={this.onDragStartHandler}>
                <img src="./info.svg" alt="Info Icon" />
                {translation.InfoButton}
                </button>
                <span className="versionTag">
                    <button className="versionButton" onClick={this.toggleDeveloperInfo}>
                        {`v${version}`}
                    </button>
                </span>
                <button className="languageButton" onClick={this.toggleLanguage}>
                    {this.state.language === "english" ? "RU" : this.state.language === "russian" ? "KZ" : "EN"}
                </button>
                <button className="exitButton" onClick={this.handleExit} onDragStart={this.onDragStartHandler}>
                    <img src="./powerOff.svg" alt={translation.exitIconAlt} />
                </button>
                <div className="fileUploadContainer" onDragStart={this.onDragStartHandler}>
                    <label
                        htmlFor="fileUploader"
                        className="fileUpload"
                        onDragOver={this.onDragOver}
                        onDragLeave={() => false}
                        onDragEnd={() => false}
                        onDrop={event => {
                            event.preventDefault();
                            let file = event.dataTransfer.files[0];
                            const fileDetails = {
                                name: file.name,
                                path: file.path,
                                type: getFileType(file.name),
                                size: file.size,
                                location: file.location,
                                creationDate: new Date(file.lastModified).toLocaleString()
                            };
                            this.props.setFilePath(fileDetails); // Передаем информацию о файле с дополнительными данными
                        }}
                    >
                        <input
                            type="file"
                            id="fileUploader"
                            onChange={event => {
                                const file = event.target.files[0];
                                const fileDetails = {
                                    name: file.name,
                                    path: file.path,
                                    type: getFileType(file.name),
                                    size: file.size,
                                    location: file.location,
                                    creationDate: new Date(file.lastModified).toLocaleString()
                                };
                                this.props.setFilePath(fileDetails); // Передаем информацию о файле с дополнительными данными
                            }}
                            style={{ display: "none" }}
                        />
                        <div className="fileUploadIcon">
                            <img src="./dropFileIcon.svg" alt={translation.uploadIconAlt} />
                        </div>
                        <span className="fileUploadText">{translation.selectOrDrop}</span>
                    </label>
                </div>
            </Fragment>
        );
    }        
}
