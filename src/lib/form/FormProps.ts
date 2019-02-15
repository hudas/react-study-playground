
export interface FormProps<T> {
  value: T;
  onSubmit: (value: T) => void;
}