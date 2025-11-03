import './inputField.css';

type InputFieldProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;

}

function InputField({value, onChange, placeholder = "Sample Text"}: InputFieldProps) {

    return (
        <input type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               placeholder={placeholder}
               />
    );
}

export default InputField;