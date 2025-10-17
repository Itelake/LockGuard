import React, { Component } from "react";
import "./Input.css";

export default class Input extends Component {
    render() {
        const {
            placeholder,
            value,
            onChange,
            inErrorMode,
            onKeyPress,
            autoFocus,
            type,
            ...rest // Получаем остальные пропсы
        } = this.props;

        return (
            <input
                className={inErrorMode ? "inputBarError" : "inputBar"}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                onKeyPress={onKeyPress}
                {...rest} // Передаем остальные пропсы
            />
        );
    }
}

Input.defaultProps = {
    autoFocus: false,
    onKeyPress() {}
};
