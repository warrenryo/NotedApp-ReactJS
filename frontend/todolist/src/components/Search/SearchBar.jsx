import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <>
      <form className="flex items-center" >
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-[20rem]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           
          </div>
          <input
            type="text"
            id="voice-search"
            value={value}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required=""
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {value && (
              <IoMdClose
                className="text-slate-500 cursor-pointer hover:text-black"
                onClick={onClearSearch}
              />
            )}
          </button>
          
        </div>
        <div>
          <button type="button" onClick={handleSearch} className="bg-blue-700 text-white px-4 py-2 rounded-md ml-2 text-sm hover:bg-blue-800"> 
            Search
          </button>
        </div>
      </form>
      
    </>
  );
};

export default SearchBar;
