// src/components/ui/Input.tsx
const Input = ({ placeholder, value, onChange }) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
  
  export default Input;
  