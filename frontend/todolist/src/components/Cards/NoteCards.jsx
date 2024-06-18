import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
const NoteCards = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <MdOutlinePushPin onClick={onPinNote} className={`icon-btn ${isPinned ? 'text-blue-700' : 'text-slate-300'}`} />
        </div>
        <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
          {date}
        </p>
        <p className="mt-1 text-xs font-medium text-blue-700 dark:text-neutral-500">
          {tags.map((item) => ` #${item}`)}
        </p>
        <p className="mt-2 text-gray-500 dark:text-neutral-400">
          {content?.slice(0, 60)}
        </p>
        <div className="flex items-center justify-end gap-2 mt-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-700"
            onClick={onDelete}
          />
        </div>
      </div>
    </>
  );
};

export default NoteCards;
