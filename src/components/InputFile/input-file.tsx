interface IInputFileProps {
  name?: string;
  value?: string;
  onChange?: any;
}

function InputFile(props: IInputFileProps) {
  return (
    <input
      type="file"
      className="input-file"
      style={{ width: "100%" }}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
    />
  );
}

export default InputFile;
