import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteInput from './NoteInput'

describe('NoteInput', () => {
  it('shows error when note is too short (< 5 characters)', async () => {
    const user = userEvent.setup()
    const onAddNote = vi.fn()
    render(<NoteInput onAddNote={onAddNote} />)
    const textarea = screen.getByPlaceholderText('Enter your note...')
    await user.type(textarea, 'abc')
    await user.click(screen.getByRole('button', { name: /add note/i }))
    expect(screen.getByText(/note must be at least 5 characters/i)).toBeInTheDocument()
    expect(onAddNote).not.toHaveBeenCalled()
  })

  it('calls onAddNote with trimmed content and clears input when valid', async () => {
    const user = userEvent.setup()
    const onAddNote = vi.fn()
    render(<NoteInput onAddNote={onAddNote} />)
    const textarea = screen.getByPlaceholderText('Enter your note...')
    await user.type(textarea, '  valid note here  ')
    await user.click(screen.getByRole('button', { name: /add note/i }))
    expect(onAddNote).toHaveBeenCalledTimes(1)
    expect(onAddNote).toHaveBeenCalledWith('valid note here')
    expect(textarea).toHaveValue('')
  })
})