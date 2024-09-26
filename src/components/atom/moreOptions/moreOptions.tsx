import { ReactNode } from 'react';


interface Option {
  text: string;
  icon?: ReactNode; 
}

interface MoreOptionTypes {
  options: Option[];
}

const MoreOptions = ({ options }: MoreOptionTypes) => {
  return (
    <div className="absolute z-10 w-[200px] right-0 top-12 rounded-md border border-gray-200 shadow-md bg-white">
      {options.map((item: Option, index) => (
        <div key={index} className="px-3 py-2 w-full cursor-pointer hover:bg-gray-100">
          {item.icon ? (
            <span className="flex items-center gap-2">
              {item.icon}
              {item.text}
            </span>
          ) : (
            item.text
          )}
        </div>
      ))}
    </div>
  );
};

export default MoreOptions;
