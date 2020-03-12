import React, { useContext, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

const ctx = React.createContext();

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true)

    if (visible) {
        return (
            <ctx.Provider value="This is React Hooks">
                <ShowInfo id={value} />
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
        return () => console.log('clear similar to componentWillUnmount');
    }, [ ]);
    useEffect(() => {

        console.log("Use effect with params (or nothing) on 2nd param works like componentDidMount + componentDidUpdate");
        return () => console.log('but acts not only when component will unmount');
    }, [value]);
    return <p>{value}</p>;
}

const Notification = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 1500);  
        return () => clearTimeout(timeout);     
    }, []);
    return (<div>{visible && <p>Hello</p>}</div>);
}

const useRequest = (request) => {
    const [dataState, setDataState] = useState({
        data: null,
        loading: true,
        error: null        
    });

    useEffect(() => {
        setDataState({
            data: null,
            loading: true,
            error: null
        });
        let cancelled = false;
        request().then(data => !cancelled && setDataState({
            data: data,
            loading: false,
            error: null
        }))
        .catch(error => !cancelled && setDataState({
            data: null,
            loading: false,
            error: error
        }));
        return () => cancelled = true;
    }, [request]);
    return dataState;
}

const getShow = (id) => {
    return fetch(`http://api.tvmaze.com/shows/${id}`)
        .then(res => res.json())
        .then(data => data);
}

const useShowInfo = (id) => {
    const request = useCallback(
        () => getShow(id),
        [id],
    )
    return useRequest(request);
}

const ShowInfo = ({ id }) => {
    const { data, loading, error } = useShowInfo(id);
    
    if (error)
        return <div>Error</div>
    if (loading)
        return <div>{id} ...loading</div>;
    return <div>TVmaze show #{id} is {data && data.name}</div>;

}

ReactDOM.render(<App />, document.getElementById('root'));