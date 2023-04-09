import { ChangeEvent } from "react";

type InputPropsType={
	title: string
	setTitle: (title: string)=> void
}

export const Input = (props: InputPropsType) => {

	const onchangeImputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.setTitle(event.currentTarget.value);
  };

  return <input value={props.title} onChange={onchangeImputHandler} />;
};
