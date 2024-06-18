import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ onClose, noteData, getAllNotes, type, showToastMessage}) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    
    const [error, setError] = useState("");


    //add new note
    const addNewNote = async () => {
      try {
        const response = await axiosInstance.post("add-note",{
          title,
          content,
          tags
        });

        if(response.data && response.data.note){
          showToastMessage("Note Added Successfully");
          getAllNotes();
          onClose();
        }
      } catch (error) {
        if(error.response && error.response.data && error.response.message){
          setError(error.response.message);
        }
      }
    }

    //edit note
    const editNote = async () => {
      const noteId = noteData._id;
        try {
          const response = await axiosInstance.put("edit-note/" + noteId, {
            title,
            content,
            tags
          });

          if(response.data && response.data.note){
            showToastMessage("Note Updated Successfully")
            getAllNotes();
            onClose();
          }
        } catch (error) {
          if(error.response && error.response.data && error.response.message){
            setError(error.response.message);
          }
        }
    }
 
    const handleSubmitNote = () => {
        if(!title) {
            setError("Please enter a title");
            return;
        }

        if(!content){
            setError("Please enter a content");
            return;
        }

        setError("");

        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }
    }

  return (
    <>
      <div className="relative">
        <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 ">
            <MdClose className="text-lg text-slate-400 hover:text-black"/>
        </button>
        <div className="flex flex-col gap-2">
          <label className="input-label">TITLE</label>
          <div className="max-w-full space-y-3">
            <input
              type="text"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Add Title"
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div className="max-w-full mt-4">
            <label className="input-label">CONTENT</label>
            <textarea
              id="textarea-label"
              className="py-3 mt-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={10}
              placeholder="Place your content here"
              value={content}
              onChange={({target}) => setContent(target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
            <label htmlFor="">TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>
        <div className="mt-4">
            {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
        <button onClick={handleSubmitNote} className="px-2 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-sm w-full mt-4 rounded-md duration-300">
            {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </>
  );
};

export default AddEditNotes;
