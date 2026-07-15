import { CATEGORIES, DEFAULT_EMOJIS } from "@/constants";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";
import { INote } from "@/type/note";
import clsx from "clsx";
import { useState } from "react";

const AddNoteModal = ({showAddNoteModal, setShowAddNoteModal, handleAddNote, editNoteId, setEditNoteId}: {
        showAddNoteModal: boolean; 
        setShowAddNoteModal:(open:boolean) => void;
        handleAddNote: (note: INote) => void;
        editNoteId: INote | null;
        setEditNoteId: (note: INote | null) => void;
}) => {
    const [formData, setFormData] = useState<INote>(editNoteId ? editNoteId : {
        icon: "📚",
        title: "",
        description: "",
        category: "work",
        isComplete: false,
        id: "",

    })
    const dialogTitle = editNoteId ? "Edit Note" : "Add Note";
    const dialogBtnTitle = editNoteId ? "Update Note" : "Add Note";

    const onOpenChange = () => {
        setShowAddNoteModal(false);
       setEditNoteId(null);
    }

    const onchange = (key: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [key]: value}))
    };

    const onAddNoteClick = () => {
       handleAddNote(formData);
       setShowAddNoteModal(false);
    }

    const onEditNoteClick = () => {
            setShowAddNoteModal(false);
            setEditNoteId(null);
       
    }

  return (
    <Dialog open={showAddNoteModal} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">
                    Icon <span className="text-destructive">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {DEFAULT_EMOJIS.map((emoji, index) => (
                        <button key={index} className={clsx("cursor-pointer text-xl rounded-lg",
                            formData.icon === emoji ? "bg-cornflower-blue/10 ring-2 ring-cornflower-blue"
                            : "hover:bg-athens-gray"
                        )}
                        onClick={() => onchange("icon", emoji)}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                <label className="font-bold text-sm">Title 
                    <span className="text-destructive">*</span>
                </label>
                <Input className="bg-alabaster" placeholder="Note Title..." value={formData.title} 
                onChange={(e) => onchange("title", e.target.value)}/>
            </div>

            <div className="flex flex-col">
                <label className="font-bold text-sm">Description 
                    <span className="text-destructive">*</span>
                </label>
                <Textarea className="bg-alabaster resize-none min-h-20" placeholder="Add a Description" value={formData.description} 
                onChange={(e) => onchange("description", e.target.value)}/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">Category 
                    <span className="text-destructive">*</span>
                </label>
                <Select value={formData.category} onValueChange={(value) => onchange("category", value)}>
                    <SelectTrigger className="text-black w-full cursor-pointer">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        {CATEGORIES.map((category) => (
                            <SelectItem key={category.value} 
                            value={category.value} 
                            className="cursor-pointer">
                                <span className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${category.color}`}/>
                            {category.label}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="flex justify-between">
                <label className="font-bold text-sm">Mark as Complete
                    <span className="text-destructive">*</span>
                </label>
                <Switch checked={formData.isComplete} onCheckedChange ={(value) => onchange("isComplete", value)} 
                    className="cursor-pointer"/>
            </div>
            </div>

            <DialogFooter>
              <Button className="border text-black cursor-pointer hover:text-white bg-transparent border-athens-gray
              " onClick={onEditNoteClick}>Cancel</Button>

              <Button className="text-white cursor-pointer bg-cornflower-blue
              " onClick={onAddNoteClick}>{dialogBtnTitle}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default AddNoteModal