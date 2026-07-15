"use client"

import AddNoteModal from "@/components/AddNoteModal";
import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import NotesFilter from "@/components/NotesFilter";
import { INote } from "@/type/note";
import { Search } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [notes, setNotes] = useState<INote[]>([]);
  const [editNoteId, setEditNoteId] = useState<INote | null>(null);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [completionFilter, setCompletionFilter] = useState("all");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredNotes = useMemo(() => {
    let allNotes = notes;
     const searchQuery = searchText.trim().toLowerCase();
     if (searchQuery) {
      allNotes =allNotes.filter(({title, description}) => {
        return ( 
        title.toLowerCase().includes(searchQuery) || 
        description.toLowerCase().includes(searchQuery));
      })    
    }

    if (categoryFilter !== "all") {
      allNotes = allNotes.filter((note) => note.category === categoryFilter);
    }

    if (completionFilter !== "all") {
      const isComplete = completionFilter === "complete";
      allNotes = allNotes.filter((note) => note.isComplete === isComplete);
    } 
    return allNotes;
  }, [notes, searchText, categoryFilter, completionFilter]);

  const handleAddNote = (formData: INote) => {
    if(editNoteId) {
      setNotes((prev) => prev.map((note) => note.id === editNoteId.id ? {...note, ...formData} : note));
      setEditNoteId(null);
    } else {
      setNotes((prev) => [...prev, {...formData, id: nanoid()}]);
    }
    setShowAddNoteModal(false);
  }
  
  const onToggleComplete = (noteId: string) => {
    setNotes((prev) => prev.map((note) => note.id === noteId ? {...note, isComplete: !note.isComplete} : note));
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  }

  const handleEditNote = (note: INote) => {
    setShowAddNoteModal(true);
    setEditNoteId(note);
  }

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotes(JSON.parse(storedNotes));
    }}, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  
  return (
    <>
    <Header setShowAddNoteModal={setShowAddNoteModal} totalNotes={notes.length} />
      <div className="max-w-6xl mx-25">
        <div className="relative w-full border border-athens-gray rounded-md mt-4 overflow-hidden">
          <Search className="h-4 w-4 absolute top-1/2 -translate-y-1/2 left-3 text-pale-sky"/>
          <input type="text" placeholder="Search notes..." className="w-full py-2 pl-10 pr-3 text-sm bg-white placeholder:text-pale-sky focus:outline-none"
          value={searchText} 
          onChange={onChange}
          />
        </div>
      <NotesFilter
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        completionFilter={completionFilter}
        setCompletionFilter={setCompletionFilter}
      />
      </div>
    <div className="max-w-6xl mx-25">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id} 
            note={note} 
            onToggleComplete={onToggleComplete}
            handleDeleteNote={handleDeleteNote}
            handleEditNote={handleEditNote}
            // editNoteId={editNoteId}
          />
        ))}
      </div>
    </div>
    {showAddNoteModal ? <AddNoteModal showAddNoteModal={showAddNoteModal} 
    setShowAddNoteModal={setShowAddNoteModal}
    handleAddNote={handleAddNote}
    editNoteId={editNoteId}
    setEditNoteId={setEditNoteId}
    /> : null}
    </>
  );
}
