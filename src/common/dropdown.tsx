import { Key, useEffect, useState } from "react";
import "../styles/dropdown.scss";

interface DropdownProps {
  options: any;
  setSelectedOption:any;
  selectedOption:any
}

const Dropdown = ({ options,selectedOption,setSelectedOption }: DropdownProps) => {
console.log("optionsoptions",options)
  const [isOpen, setIsOpen] = useState(false);
  const[allOptions, setOptions] = useState(options)

  useEffect(()=>{
    setOptions(options)
  },[options])

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    const newOptions = options.filter((element: { name: string; }) => element.name !== option.name); 
    setOptions(newOptions)
  };
console.log("ppppp",isOpen,allOptions.length)
 
  return (
    <div className="dropdown">
      <input
        type="text"
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        value={Object.values(selectedOption).length? selectedOption.name : "Select an option"}
        readOnly
      />
      {isOpen && (
        <ul className="dropdown-menu">
          {allOptions.length ? allOptions.map((option: any) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option.name}
            </li>
          )) : <>Loading...</>}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;