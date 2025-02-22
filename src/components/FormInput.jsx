const FormInput = (props) => {
    const {label, type, placeholder, validationMessage, required, value, handleChange, handleOnBlur} = props;
    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}{required && <span className="text-danger">*</span>}</label>}
            <input type={type} className="form-control" value={value}
            placeholder={placeholder} required={required} onChange={handleChange} onBlur={handleOnBlur}/>
            {validationMessage && <p className="text-danger">{validationMessage}</p>}
        </div>
    );
}

export default FormInput;