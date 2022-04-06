// 1) prop-drilling [X]
// 2) react-context
//

import { useState } from "react";

interface FormProps {
  setToken: (a: string) => void;
}

const Form = ({ setToken }: FormProps) => {
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

interface RoutesProps {
  setToken: (a: string) => void;
}

const Routes = ({ setToken }: RoutesProps) => {
  return (
    <div>
      <Form setToken={setToken} />
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState<string>();

  return <Routes setToken={setToken} />;
};

export default App;
