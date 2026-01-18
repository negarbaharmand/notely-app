import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteCard from './NoteCard'
import type { Note } from '../types'

const defaultNote: Note = {
  id: '1',
  content: 'Original note content here',
  status: 'pending',
}

function renderNoteCard(overrides: Partial<{
  note: Note
  isEditing: boolean
  onSaveEdit: (content: string) => void
}> = {}) {
  const props = {
    note: defaultNote,
    isEditing: false,
    onStartEdit: vi.fn(),
    onSaveEdit: vi.fn(),
    onCancelEdit: vi.fn(),
    onToggleStatus: vi.fn(),
    onDelete: vi.fn(),
    ...overrides,
  }
  return { ...render(<NoteCard {...props} />), props }
}

describe('NoteCard', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => { })
  })

  it('calls onSaveEdit with trimmed content when Save is clicked with valid content', async () => {
    const user = userEvent.setup()
    const onSaveEdit = vi.fn()
    renderNoteCard({ isEditing: true, onSaveEdit })
    const textarea = screen.getByDisplayValue('Original note content here')
    await user.clear(textarea)
    await user.type(textarea, '  Updated valid note  ')
    await user.click(screen.getByRole('button', { name: /^save$/i }))
    expect(onSaveEdit).toHaveBeenCalledWith('Updated valid note')
  })

  it('shows alert and does not call onSaveEdit when edit is too short', async () => {
    const user = userEvent.setup()
    const onSaveEdit = vi.fn()
    renderNoteCard({ isEditing: true, onSaveEdit })
    const textarea = screen.getByDisplayValue('Original note content here')
    await user.clear(textarea)
    await user.type(textarea, 'abc')
    await user.click(screen.getByRole('button', { name: /^save$/i }))
    expect(window.alert).toHaveBeenCalledWith('Note must be at least 5 characters')
    expect(onSaveEdit).not.toHaveBeenCalled()
  })
})