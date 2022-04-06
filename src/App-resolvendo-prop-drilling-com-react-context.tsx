// 1) prop-drilling [X]
// 2) react-context
// 3) o que é memoization? React.memo, useMemo

import { createContext, useContext, useState } from "react";

type TokenContextValue = {
  token: string | undefined;
  setToken: (token: string) => void;
};

const tokenContext = createContext<TokenContextValue>(undefined!);

const Form = () => {
  const { token, setToken } = useContext(tokenContext);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // setar o meu token
          setToken("123feliz");
        }}
      >
        <label>Usuário</label>
        <input type="text" />
        <button>Enviar</button>
      </form>
    </div>
  );
};

const Routes = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState<string>();

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      <Routes />
    </tokenContext.Provider>
  );
};

export default App;
