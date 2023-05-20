// @flow 
import * as React from 'react';


type Props = {
value:number,
dateValue:Date
};
const HealthActivityProgressBar = (props: Props) => {
    const [counter, setCounter] = React.useState(0);
 React.useEffect(() => {
    setCounter(0)
}, [props.dateValue])
 React.useEffect(() => {
    setCounter(0)
}, [])
  React.useEffect(() => {
   
setTimeout(() => {
    
    setCounter(props.value);

}, 500);

  }, [props.value,counter]);
    return (
        <div
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={counter}
        className={`  transition-[height]   duration-500 rounded-full  bg-[${props.value>=50 ? "#E19809" : props.value<50&&props.value!=0 ? "#2563EB" : "#BDBDBD"}]`}
        style={{ height: `${counter}%` }}
      />

    )
};
export default HealthActivityProgressBar;