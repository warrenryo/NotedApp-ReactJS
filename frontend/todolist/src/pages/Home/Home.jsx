import NoteCards from "../../components/Cards/NoteCards";
import Navbar from "../../components/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCards from "../../components/EmptyCards/EmptyCards";
const Home = () => {
  const [openAddModal, setAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    });
  };


  const onClose = () => {
    setAddModal({
      isShown: false,
      type: "add",
      data: null,
    });
  };

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const handleEdit = (noteDetails) => {
    setAddModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.message) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("get-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("unexpected Error, please try again later.");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  //delete note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("delete-note/" + noteId);

      if(response.data && !response.data.error){
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.message){
        console.log("Something went wrong please try again later");
      }
    }
  }

  const [isSearch, setIsSearch] = useState(false);

  //search note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: {query}
      });
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("update-ispinned/" + noteId, {
        "isPinned": !noteData.isPinned
      });

      if(response.data && response.data.note){
        showToastMessage("Note has been Pinned");
        getAllNotes();
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote}/>

      <div className="mx-20">
        {allNotes.length > 0 ? (<div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10 ">
          {allNotes.map((item, index) => (
            <NoteCards
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format("Do MMM YYYY")}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
            />
          ))}
        </div>) : (
          <EmptyCards/>
        )}
      </div>

      <div >
        <button
          onClick={() =>
            setAddModal({ isShown: true, type: "add", data: null })
          }
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-700 hover:bg-blue-600 absolute right-10 bottom-10"
        >
          <MdAdd className="text-white text-[32px]" />
        </button>
      </div>

      <Modal
        isOpen={openAddModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="lg:w-[40%] max-h-3/4 bg-white rounded-md mx-2 lg:mx-auto mt-14 p-5 "
      >
        <AddEditNotes
          onClose={onClose}
          type={openAddModal.type}
          noteData={openAddModal.data}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onCloseToast={handleCloseToast}
      />
    </>
  );
};

export default Home;
