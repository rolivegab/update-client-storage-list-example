// 1) prop-drilling [X]
// 2) react-context
// 3) o que é memoization? React.memo, useMemo
// 4) o que é
// 5) immutability-helpers

import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { increment } from "./store/counterSlice";
import { authenticate, logout } from "./store/tokenSlice";

const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => dispatch(increment())}>incrementar</button>
    </div>
  );
};

const Form = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const dispatch = useDispatch();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (token) {
            dispatch(logout());
          } else {
            dispatch(authenticate());
          }
        }}
      >
        <label>Usuário</label>
        <input type="text" />
        <button>{token ? "Deslogar" : "Logar"}</button>
      </form>
    </div>
  );
};

const Routes = () => {
  return (
    <div>
      <Form />
      <Counter />
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState<string>();

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
