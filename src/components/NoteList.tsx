import { type Note } from "../types";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  editingId: string | null;
  onStartEdit: (note: Note) => void;
  onSaveEdit: (id: string, content: string) => void;
  onCancelEdit: () => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

function NoteList({
  notes,
  editingId,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onToggleStatus,
  onDelete,
}: NoteListProps) {
  if (notes.length === 0) {
    return <p className="empty-state">No notes yet. Add your first note using the note input.</p>;
  }

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          isEditing={editingId === note.id}
          onStartEdit={() => onStartEdit(note)}
          onSaveEdit={(content) => onSaveEdit(note.id, content)}
          onCancelEdit={onCancelEdit}
          onToggleStatus={() => onToggleStatus(note.id)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  );
}

export default NoteList;