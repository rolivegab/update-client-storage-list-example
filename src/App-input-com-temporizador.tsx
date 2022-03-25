import { useEffect, useState } from "react";

const users = [...new Array(20)]
  .map(() => Math.random().toString(36))
  .map((i) => i.slice(2));

const App = () => {
  const [text, setText] = useState("");

  const [filterText, setFilterText] = useState("");
  const filteredUsers = users.filter((i) => i.includes(filterText));

  const setFilterTextHandler = () => {
    setFilterText(text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(setFilterTextHandler, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <div>
      <label>
        Digite para filtrar a lista <br />
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </label>
      <br />
      <ul>
        {filteredUsers.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
