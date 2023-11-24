import React, { ChangeEvent } from 'react';

interface DropdownProps {
    options: string[];
    value: string;
    onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
    return (

        <div className="flex flex-col mt-3">
            <label className="mb-2">
                Status
            </label>
            <select className={` 
    border border-indigo-500 rounded-lg
    focus:outline-none bg-gray-100 px-4 py-2
`} value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;