import './selectField.css';
import { Region } from '../../../../../shared/player.shared';

type SelectFieldProps<T extends string> = {
    value: T;
    options: T[];
    onChange: (value: T) => void;
    placeholder?: string;
}

function SelectField<T extends string>({value, options, onChange, placeholder = "Sample Text"}: SelectFieldProps<T>) {
    return(
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}>
                {placeholder && (
                    <option value="" disabled hidden>{placeholder}</option>
                )}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
        </select>
    );
}

export default SelectField;