import React, {useState} from 'react';
import "./styles.css";

const InputField = () => {
    return (
        <form className="input">
            <input type="text" placeholder="Enter a task" className="input__box"></input>
            <button className="input_submit" type="submit"> Go </button>
        </form>
    );
};

export default InputField;