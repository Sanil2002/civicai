import filterIcon from '../../../assets/icons/filterIcon.svg'
import searchIcon from '../../../assets/icons/searchIcon.svg'

// import { useState } from 'react';

const SearchBar = () => {
//   const [filterOpen, setFilterOpen] = useState(false);

//   const toggleFilter = () => {
//     setFilterOpen(!filterOpen);
//   };

  return (
    <div>
    <div className="flex relative h-[44px]  max-w-[300px] lg:w-[300px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <img src={searchIcon}/>
        </div>
        <input type="search" id="default-search" className="block  w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name" required />
        <div  className=" absolute end-2.5 bottom-2.5  bg-transparent  text-black">
        <img src={filterIcon} className='cursor-pointer'/>
        </div>
    </div>
    </div>
  );
};

export default SearchBar;
