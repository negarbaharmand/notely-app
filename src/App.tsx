import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type Note, type NoteStatus } from './types'
import { loadNotes, saveNotes } from './storage';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<NoteStatus | null>(null);
  const skipNextSave = useRef(true);

  // save when notes change; skip first run (redundant with initial load)
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
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

  // Filter notes based on selected status
  const filteredNotes = notes.filter((note) => {
    if (filter === null) return true; // null means show all
    return note.status === filter;
  });

  return (
    <main className="app-container">
      <h1>Notely</h1>

      <NoteInput onAddNote={handleAddNote} />
      <div className="filter-section">
        <button
          onClick={() => setFilter(null)}
          className={`filter-btn ${filter === null ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`filter-btn ${filter === "approved" ? "active" : ""}`}
        >
          Approved
        </button>
      </div>

      <NoteList
        notes={filteredNotes}
        editingId={editingId}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default App