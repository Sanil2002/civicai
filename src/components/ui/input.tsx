import * as React from 'react';
import { cn } from '@/lib/utils';
import { TextboxProps } from '../atom/formBuilder/nodeCmp.types';
import { useState } from 'react';
import { Constants } from '@/configs/constants';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using lucide-react for icons

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  node: TextboxProps;
  handleChange: (key: string, value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ node, handleChange, className, type, ...props }, ref) => {
  const [inputValue, setInputValue] = useState(node?.value);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Track password visibility

  const handleInputChange = (field: string, value: string) => {
    handleChange(field, value);
    setInputValue(value);
  };

  React.useEffect(() => {
    setInputValue(node?.value);
  }, [node?.value]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative grid w-full items-center gap-1.5">
      <div className="relative">
        <input
          id={node?.id + 500}
          aria-label={node.label}
          type={node.typeInput === 'password' && isPasswordVisible ? 'text' : node.typeInput}
          value={inputValue}
          placeholder=""
          disabled={node.disabled}
          maxLength={node.maxTextLength || Constants.maxTextLength}
          minLength={node.minTextLength || Constants.minTextLength}
          onChange={(e) => handleInputChange(node?.fieldName, e.target.value)}
          className={cn(
            "input-class  block w-full p-3 text-sm text-gray-900 bg-transparent border border-gray-300  rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer disabled:cursor-not-allowed disabled:opacity-50",
            node.childClass
          )}
          ref={ref}
          {...props}
        />
        {node.typeInput === 'password' && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
          </div>
        )}
        <label
          htmlFor={node?.id + 500}
          className="absolute max-w-fit overflow-hidden text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] bg-white rounded-full px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5 whitespace-nowrap text-ellipsis"
          style={{ width: 'calc(100% - 1rem)' }}
        >
          {node?.placeholder ?? ""}
        </label>
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
