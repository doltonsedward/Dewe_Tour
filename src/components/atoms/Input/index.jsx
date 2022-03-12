import "./Input.scss";
import { IconFile } from "../../../assets";

const InputSearch = ({ label, className, onClick, ...rest }) => {
  return (
    <label className="wrapper-input">
      <p>{label}</p>
      <div className={className}>
        <input className="input-search" {...rest} />
        <button className="btn-submit__hero btn-warning" onClick={onClick}>
          Search
        </button>
      </div>
    </label>
  );
};

const InputMultiple = ({ label, className, onClick, ...rest }) => {
  return (
    <>
      <label className="wrapper-input">
        <p>{label}</p>
        <div className={className}>
          <input {...rest} />
          <button className="btn-submit__hero btn-warning" onClick={onClick}>
            Submit
          </button>
        </div>
      </label>
    </>
  );
};

const InputFile = ({ label, className, onClick, ...rest }) => {
  return (
    <>
      <label className="wrapper-input">
        <p style={{ fontWeight: 800 }}>{label}</p>
        <div className={className}>
          <button className="input-theme">
            Attach here
            <img src={IconFile} alt="add your file here" />
            <input type="file" {...rest} onClick={onclick} />
          </button>
        </div>
      </label>
    </>
  );
};
const InputBasic = ({ ...rest }) => {
  return (
    <label className="wrapper-input default">
      <input className="input-basic" {...rest} />
    </label>
  );
};

const Input = ({ label, variant, onClick, ...rest }) => {
  let classForLabel = "input-section";

  const inputStyle = {
    backgroundColor: rest.inputbgcolor,
    width: rest.inputwidth || "100%",
    height: rest.inputheight,
    border: rest.inputborder,
  };

  switch (variant) {
    case "search-btn":
      classForLabel += " d-flex";
      return (
        <InputSearch
          label={label}
          className={classForLabel}
          onClick={onClick}
          {...rest}
        />
      );

    case "multiple-input":
      classForLabel += " d-flex";
      return (
        <InputMultiple
          label={label}
          className={classForLabel}
          onClick={onClick}
          {...rest}
        />
      );

    case "file":
      classForLabel += " root--input-file";
      return (
        <InputFile
          label={label}
          className={classForLabel}
          onClick={onClick}
          {...rest}
        />
      );

    case "basic":
      return <InputBasic {...rest} />;

    default:
      return (
        <>
          <label className="wrapper-input default">
            <p style={{ fontSize: rest.fontSize }}>{label}</p>
            <input className="input-theme" style={inputStyle} {...rest} />
          </label>
        </>
      );
  }
};

export default Input;
