import { CATEGORIES } from "@/constants";
import { Checkbox } from "@/shared/ui/checkbox";
import { INote } from "@/type/note";
import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";

const NoteCard = ({note, onToggleComplete, handleDeleteNote, handleEditNote,}: {note: INote; 
    onToggleComplete: (noteId: string) => void, 
    handleDeleteNote: (noteId: string) => void, 
    handleEditNote: (note: INote) => void,
    // editNoteId: INote | null
   }) => {
    const categoryObj = CATEGORIES.find((item) => item.value === note.category);

  return (
    <div className="group flex flex-col bg-white rounded-lg shadow-md border border-athens-gray
     mt-4 gap-3 p-5">
        <div className="flex items-center justify-between">        
        <span className="text-3xl">{note.icon}</span>
        <div className="flex gap-1">
            <button className="h-8 w-8 text-pale-sky cursor-pointer hover:text-black-pearl
            hover:bg-athens-gray rounded-md text-sm font-medium flex items-center justify-center"
            onClick={()=> handleEditNote(note)}
            >
            <Pencil className="h-4 w-4" /></button>

            <button className="h-8 w-8 text-pale-sky cursor-pointer hover:text-flamingo
             hover:bg-athens-gray rounded-md text-sm font-medium flex items-center justify-center"
             onClick={()=> handleDeleteNote(note.id)}
             >
            <Trash2 className="h-4 w-4" /></button>
        </div>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className={clsx("font-semibold line-clamp-2 text-lg text-black-pearl",
                note.isComplete && "text-pale-sky line-through")}>{note.title}</h3>
            <p className="text-sm text-black-pearl line-clamp-3">{note.description}</p>
        </div>


        <div className="flex border border-athens-gray justify-between">
            <span className={`text-xs font-medium text-white ${categoryObj?.color} px-2.5 py-1 rounded-full`}>{categoryObj?.label}</span>
            <div className={clsx("h-3 w-3 rounded-full", categoryObj?.color)}></div>
            <div className="flex items-center gap-2 ml-auto">
                <Checkbox id={note.id} checked={note.isComplete} className="cursor-pointer data-[state=checked]:bg-salem
                 data-[state=checked]:border-salem" 
                 onCheckedChange={() => onToggleComplete(note.id)}
                 />
                 <label htmlFor={note.id} className="text-xs text-pale-sky cursor-pointer">
                    {note.isComplete ? "Done" : "Mark Done"}
                 </label>
            </div>
        </div>
    </div>
  )
}

export default NoteCard