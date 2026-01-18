import { useState, type KeyboardEvent } from "react";
import { VALIDATION, type Note } from "../types";

interface NoteCardProps {
  note: Note;
  isEditing: boolean;
  onStartEdit: () => void;
  onSaveEdit: (content: string) => void;
  onCancelEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

function NoteCard({
  note,
  isEditing,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onToggleStatus,
  onDelete,
}: NoteCardProps) {
  const [editValue, setEditValue] = useState(note.content);

  const handleSaveEdit = () => {
    const trimmed = editValue.trim();

    // validation
    if (trimmed.length < VALIDATION.MIN_LENGTH) {
      alert(`Note must be at least ${VALIDATION.MIN_LENGTH} characters`);
      return;
    }
    if (trimmed.length > VALIDATION.MAX_LENGTH) {
      alert(`Note must be less than ${VALIDATION.MAX_LENGTH} characters`);
      return;
    }

    onSaveEdit(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      onCancelEdit();
      setEditValue(note.content);
    }
  };

  const handleStartEdit = () => {
    setEditValue(note.content);
    onStartEdit();
  };

  const handleCancelEdit = () => {
    setEditValue(note.content);
    onCancelEdit();
  };

  return (
    <div
      className={`note-card ${note.status === "approved" ? "approved" : ""
        }`}
    >
      {isEditing ? (
        //edit mode
        <div className="edit-container">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="textarea-edit"
            autoFocus
          />
          <div className="edit-helper-text">
            {editValue.length}/{VALIDATION.MAX_LENGTH} • Press Enter to save,
            Esc to cancel
          </div>
        </div>
      ) : (
        <div
          className="note-content"
          onClick={handleStartEdit}
          title="Click to edit"
        >
          {note.content}
        </div>
      )}
      <div className="button-actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit} className="btn btn-primary">
              Save
            </button>
            <button onClick={handleCancelEdit} className="btn">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={onToggleStatus} className="btn">
              {note.status === "pending" ? "✓ Approve" : "↺ Pending"}
            </button>
            <button onClick={onDelete} className="btn btn-danger">
              Delete
            </button>
            <button onClick={handleStartEdit} className="btn">
              Edit
            </button>
          </>
        )}
        <span
          className={`status-badge ${note.status === "approved" ? "approved" : "pending"
            }`}
        >
          {note.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export default NoteCard;