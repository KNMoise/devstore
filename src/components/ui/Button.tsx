// src/components/ui/Button.tsx
import React from 'react';

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="p-2 bg-blue-500 text-white rounded">
    {children}
  </button>
);

export default Button;
