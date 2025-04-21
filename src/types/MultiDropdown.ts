export interface DropdownOption {
  id: string;
  label: string;
  icon?: string;
}

export interface MultiDropdownProps {
  options: DropdownOption[];
  selectedOptions: DropdownOption[];
  onChange: (selected: DropdownOption[]) => void;
  placeholder?: string;
}
