import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <>
        <HookSwitcher />
        </>
    );
}

const HookSwitcher = () => {
    const [color, setColor] = useState('white');
    const [fontSize, setFontSize] = useState(14);

    function setSize(e) {
        let value = Number(e.target.value);
        setFontSize(value);
    }

    return (
        <div style={{padding: '10px', 
                    backgroundColor: color,
                    fontSize: `${fontSize}px`}}>
            Hello world!<br></br>
            <button 
            onClick={() => setColor('red')}>Red</button>
            <button 
            onClick={() => setColor('green')}>Green</button>
            <button 
            onClick={() => setFontSize((fontSize) => fontSize + 2)}>Bigger</button>
            <button 
                onClick={() => setFontSize((fontSize) => fontSize - 2)}>Smaller</button>
            <input onKeyUp={(e) => setSize(e)}></input>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));