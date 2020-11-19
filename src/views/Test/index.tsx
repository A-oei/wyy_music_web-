import React, {useState, useCallback, useMemo, useEffect} from 'react'
import Child from "./child";

export default function Test() {
    useEffect(() => {
        alert(1)
    }, [])


    const [num, setNumber] = useState(0);
    const [name, setName] = useState({name: "parent"})

    const change = useCallback(function (name: string) {
        setName({name: "1122"});
    }, [])
    // const info=useMemo(()=>({gender:"1",age:"16"}),['gender','age']);
    const info = {gender: "1", age: "16"};

    return (
        <div>
            <p onClick={() => info.age = "2222"}>Test {num}</p>
            <Child name={name} click={change} info={info}/>
        </div>
    )
}

