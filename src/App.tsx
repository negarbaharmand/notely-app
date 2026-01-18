import { useEffect, useState } from 'react'
import './App.css'
import { type Note } from './types'
import { loadNotes, saveNotes } from './storage';
import NoteInput from './components/NoteInput';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());

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

  return (
    <div className="app-container">
      <h1>Notely</h1>

      <NoteInput onAddNote={handleAddNote} />
    </div>
  )
}

export default App