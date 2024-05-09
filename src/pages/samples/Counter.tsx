import {useDispatch, useSelector} from "react-redux";
import {counterActions} from "../../store/counter.ts";

export const Counter = () => {
  const counter = useSelector((state: any) => state.counter.counter); // state.슬라이스key.해당슬라이스의state
  const dispatch = useDispatch();  // dispatch(액션.리듀서함수(payload));

  const addHandler = () => {
    dispatch(counterActions.add(10));
  };

  const subHandler = () => {
    dispatch(counterActions.sub(10));
  };

  return (
    <div>
      <h2>{counter}</h2>
      <div>
        <button onClick={addHandler}>더하기</button>
        <button onClick={subHandler}>빼기</button>
      </div>
    </div>
  );
}
