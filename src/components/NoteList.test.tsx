import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteList from './NoteList'

const defaultProps = {
  notes: [],
  editingId: null,
  onStartEdit: vi.fn(),
  onSaveEdit: vi.fn(),
  onCancelEdit: vi.fn(),
  onToggleStatus: vi.fn(),
  onDelete: vi.fn(),
}

describe('NoteList', () => {
  it('shows empty state when no notes', () => {
    render(<NoteList {...defaultProps} notes={[]} />)
    expect(screen.getByText(/no notes yet. add your first note using the note input\./i)).toBeInTheDocument()
  })
})