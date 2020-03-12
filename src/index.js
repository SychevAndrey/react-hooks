import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ctx = React.createContext();

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true)

    if (visible) {
        return (
            <ctx.Provider value="This is React Hooks">
                <HookUseContext />
                <HookCounter value={value}/>
                <div>
                    <button onClick={() => setValue((v) => v +1)}>+</button>
                    <button onClick={() => setValue((v) => v - 1)}>-</button>
                    <button onClick={() => setVisible(false)}>hide</button>
                </div>
            </ctx.Provider>
        );
    } else {
        return (
            <button onClick={() => setVisible(true)}>show</button>
        );
    }
}

const HookUseContext = () => {
    const value = useContext(ctx);
    return <p>{value}</p>;
}

const HookCounter = ({ value }) => {
    useEffect(() => {
        console.log("Use effect with [ ] on 2nd param works like componentDidMount");
        return () => console.log('clear 1');
    }, [ ]);
    useEffect(() => {
        console.log("Use effect with params on 2nd param works like componentDidUpdate");
        return () => console.log('clear 2');
    }, [value]);
    return <p>{value}</p>;
}

ReactDOM.render(<App />, document.getElementById('root'));