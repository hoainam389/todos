export interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  onBlur?: () => void;
}
