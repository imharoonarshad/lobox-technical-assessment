"use client";
import { useState, useEffect } from "react";
import MultiDropdown from "../ui/MultiDropdown";
import { categories } from "../../data/categories";
import { DropdownOption } from "../../types/MultiDropdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./MultiDropdownSection.scss";

export default function MultiDropdownSection() {
  const [selectedCategory, setSelectedCategory] = useState<DropdownOption[]>(
    []
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (selected: DropdownOption[]) => {
    setSelectedCategory(selected);
  };

  if (!isVisible) {
    return (
      <div className="dropdown-section">
        <div className="skeleton-container">
          <Skeleton
            height={50}
            width="80%"
            style={{ height: "100px", width: "100%", minWidth: "350px" }}
          />
          <p className="loading-text">Loading options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown-section">
      <MultiDropdown
        options={categories}
        selectedOptions={selectedCategory}
        onChange={handleChange}
        placeholder="Select activity"
      />

      {selectedCategory.length > 0 && (
        <div className="selected-info">
          <h3>You selected:</h3>
          <p>{selectedCategory[0].label}</p>
        </div>
      )}
    </div>
  );
}
