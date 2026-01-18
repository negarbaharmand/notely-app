import { useEffect, useState } from 'react'
import './App.css'
import { type Note } from './types'
import { loadNotes, saveNotes } from './storage';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [editingId, setEditingId] = useState<string | null>(null);


  // save notes when they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const handleAddNote = (content: string) => {
    //create new note
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      status: "pending",
    }
    setNotes([newNote, ...notes]);
  }
  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  }
  const handleToggleStatus = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
            ...note,
            status: note.status === "pending" ? "approved" : "pending",
          }
          : note
      )
    );
  };
  const handleStartEdit = (note: Note) => {
    setEditingId(note.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (id: string, content: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content } : note
      )
    );
    setEditingId(null);
  };

  return (
    <div className="app-container">
      <h1>Notely</h1>
      <NoteInput onAddNote={handleAddNote} />
      <NoteList
        notes={notes}
        editingId={editingId}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App