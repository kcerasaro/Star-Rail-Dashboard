import {useState} from 'react';
import SelectField from './selectField';

export default {
    title: 'Shared/SelectField',
    component: SelectField,
  };

  export const Default = () => {
    const [value, setValue] = useState('');
    const sampleOptions = ["Option A", "Option B", "Option C", "Option D"];

    return (
        <SelectField 
            value={value}
            onChange={setValue}
            options={sampleOptions}
            placeholder="select an option"
        />
    )
};