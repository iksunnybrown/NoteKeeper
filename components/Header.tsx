import { Plus, StickyNote } from "lucide-react"

const Header = ({setShowAddNoteModal, totalNotes} : {setShowAddNoteModal:(open:boolean) => void; totalNotes: number;}) => {
  return (
    <div className="border-b border-athens-gray py-4">
      <div className="flex justify-between items-center max-w-5xl m-auto">
        <div className="flex items-center gap-3">
        <div className="bg-cornflower-blue w-10 h-10 flex justify-center items-center rounded-xl">
          <StickyNote className="text-white w-5 h-5"/>
        </div>
        <div>
        <h1 className="font-bold text-xl">Note</h1>
        <p className="text-pale-sky text-sm">{totalNotes} Note{totalNotes !== 1 ? 's' : ''}</p>
        </div>
        </div>

      <button className="flex items-center justify-center bg-cornflower-blue gap-2 px-4 py-2.5 
      font-medium text-sm shadow-sm rounded-md cursor-pointer"
      onClick={()=> setShowAddNoteModal(true)}
      >
        <Plus className="h-4 w-4"/>
        Add Note</button>
    </div>
    </div>
  )
}

export default Header