import { useState } from "react";
import type { KeyboardEvent } from "react";
import { VALIDATION } from "../types";

interface NoteInputProps {
  onAddNote: (content: string) => void;
}

function NoteInput({ onAddNote }: NoteInputProps) {

  // local states
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleAddNote = () => {
    const trimmed = inputValue.trim();
    // validation
    if (trimmed.length < VALIDATION.MIN_LENGTH) {
      setError(`Note must be at least ${VALIDATION.MIN_LENGTH} characters`);
      return;
    }
    if (trimmed.length > VALIDATION.MAX_LENGTH) {
      setError(`Note must be less than ${VALIDATION.MAX_LENGTH} characters`);
      return;
    }

    onAddNote(trimmed);
    setInputValue("")
    setError("");
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  return (
    <div className="input-section">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your note..."
        rows={3}
        className="textarea"
        aria-label="New note"
      />
      <div className="input-actions">
        <button onClick={handleAddNote} className="btn btn-primary">
          Add Note
        </button>
        <span className="char-count">
          {inputValue.length}/{VALIDATION.MAX_LENGTH}
        </span>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default NoteInput