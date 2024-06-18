import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTags = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };


  return (
    <>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-sm gap-2 text-slate-900 bg-slate-100 py-1 px-3 rounded-md flex items-center">
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTags(tag);
                }}
                className=""
              >
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-2">
        <div className="w-[20rem] ">
          <input
            type="text"
            value={inputValue}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Add Tags"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <button
            onClick={() => {
              addNewTag();
            }}
            className="p-3 bg-transparent border border-blue-700 hover:bg-blue-600 rounded-md text-blue-700 duration-300 hover:text-white"
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </>
  );
};

export default TagInput;
