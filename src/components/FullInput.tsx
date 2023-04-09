import { KeyboardEvent, ChangeEvent, useState } from "react";

type PropsType = {
  addTitle: (title: string) => void;
};

export const FullInput = (props: PropsType) => {
  let [title, setTitle] = useState("");

  const onchangeImputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onClickButtonHandler = () => {
    setTitle("");
    props.addTitle(title);
  };

  const onKeyDownHeandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTitle("");
      props.addTitle(title);
    }
  };

  return (
    <div>
      <input
        value={title}
        onKeyDown={onKeyDownHeandler}
        onChange={onchangeImputHandler}
      />
      <button onClick={onClickButtonHandler}>add</button>
    </div>
  );
};
