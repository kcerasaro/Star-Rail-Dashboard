import {useState} from 'react';
import InputField from './inputField';

export default {
  title: 'Shared/InputField',
  component: InputField,
};

export const Default = () => {
    const [value, setValue] = useState('');

    return (
        <InputField 
            value={value}
            onChange={setValue}
            placeholder="sample placeholder"
        />
    )

};