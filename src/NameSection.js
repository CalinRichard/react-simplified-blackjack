import { useState } from 'react';

const NameSection = ({ changeName }) => {

    const [value, setValue] = useState('')

    const inputChange = (e) => {
        setValue(e.target.value)
    }

    const onButtonClick = () => {
        changeName(value)
    }

    return (
        <span id="name-section">
            <p>Insert name below</p>
            <input id="input-name" type='text' value={value} onChange={inputChange} />
            <br></br>
            <button onClick={onButtonClick}>Submit</button>
        </span>);
}

export default NameSection;