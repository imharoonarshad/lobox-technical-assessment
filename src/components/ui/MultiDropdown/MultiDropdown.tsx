import React, { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown, FaCheck } from "react-icons/fa";
import {
  DropdownOption,
  MultiDropdownProps,
} from "../../../types/MultiDropdown";
import "./MultiDropdown.scss";

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    onChange([option]);
    setIsOpen(false);
  };

  return (
    <div className="multi-dropdown" ref={dropdownRef}>
      <div
        className={`multi-dropdown__header ${isOpen ? "multi-dropdown__header--blue-outline" : ""}`}
        onClick={toggleDropdown}
      >
        <div className="multi-dropdown__selected">
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions[0].label}
            </>
          ) : (
            placeholder
          )}
        </div>
        <div className="multi-dropdown__arrow">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isOpen && (
        <div className="multi-dropdown__content">
          <ul className="multi-dropdown__options">
            {options.map((option) => {
              const isSelected = selectedOptions.some(
                (item) => item.id === option.id
              );
              return (
                <li
                  key={option.id}
                  className={`multi-dropdown__option ${isSelected ? "multi-dropdown__option--selected" : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="multi-dropdown__option-content">
                    <span className="multi-dropdown__option-label">
                      {isSelected ? `Yeeeah, ${option.label}!` : option.label}
                    </span>
                    {option.icon && (
                      <span className="multi-dropdown__emoji">
                        {option.icon}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="multi-dropdown__check">
                      <FaCheck />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
