import {useDispatch, useSelector} from "react-redux";
import {counterActions} from "../../store/counter.ts";
import {useState} from "react";

export const Counter = () => {
  const [value, setValue] = useState(1);

  const counter = useSelector((state: any) => state.count.counter); // state.reducerKey.해당슬라이스의state
  const dispatch = useDispatch();  // dispatch(액션.리듀서함수(payload));

  const addHandler = () => {
    dispatch(counterActions.add(Number(value)));
  };

  const subHandler = () => {
    dispatch(counterActions.sub(Number(value)));
  };

  return (
    <div>
      <h2>{counter}</h2>
      <input type="number" value={value} onChange={(e: any) => setValue(e.target.value)}/>
      <div>
        <button onClick={addHandler}>더하기</button>
        <button onClick={subHandler}>빼기</button>
      </div>
    </div>
  );
}
