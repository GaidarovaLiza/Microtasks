import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FullInput } from "./components/FullInput";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

function App() {
  let [message, setMessage] = useState([
    { message: "message1" },
    { message: "message2" },
    { message: "message3" },
  ]);

  let [title, setTitle] = useState("");

  const addTitle = (title: string) => {
    const newMessage = { message: title };
    console.log(newMessage);
    setMessage([newMessage, ...message]);
  };

  const callBackButtonHandler = () => {
    setTitle('')
    addTitle(title);
  };

  return (
    <div className="App">
      <div>
        {/* <FullInput addTitle={addTitle} /> */}
        <Input setTitle={setTitle} title={title} />
        <Button name={"+"} callBack={callBackButtonHandler} />
        {message.map((el: any, index: any) => {
          return <div key={index}>{el.message}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
