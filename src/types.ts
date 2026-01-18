export type NoteStatus = "pending" | "approved";

export interface Note {
  id: string;
  content: string;
  status: NoteStatus;
}

export const VALIDATION = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 300,
} as const;