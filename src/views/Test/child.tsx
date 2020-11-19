import React, {memo} from "react";

let Child =(props:any)=> {
    console.log(props.name.name);
    return (<div >{props.info.age}</div>)
};

 let A=memo(Child)

export default A;
