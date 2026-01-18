import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders Notely title and input', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /notely/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your note...')).toBeInTheDocument()
  })

  it('adds a note and displays it in the list', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Enter your note...'), 'My new note')
    await user.click(screen.getByRole('button', { name: /add note/i }))
    expect(screen.getByText('My new note')).toBeInTheDocument()
  })

  it('filters notes by Pending', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Enter your note...'), 'Pending note one')
    await user.click(screen.getByRole('button', { name: /add note/i }))
    await user.type(screen.getByPlaceholderText('Enter your note...'), 'Pending note two')
    await user.click(screen.getByRole('button', { name: /add note/i }))
    await user.click(screen.getAllByRole('button', { name: /✓ approve/i })[0])
    await user.click(screen.getByRole('button', { name: /^pending$/i }))
    expect(screen.getByText('Pending note one')).toBeInTheDocument()
    expect(screen.queryByText('Pending note two')).not.toBeInTheDocument()
  })

  it('persists notes to localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.type(screen.getByPlaceholderText('Enter your note...'), 'Persisted note')
    await user.click(screen.getByRole('button', { name: /add note/i }))
    unmount()
    const stored = localStorage.getItem('workflow-notes')
    expect(stored).toBeTruthy()
    expect(JSON.parse(stored!)).toContainEqual(
      expect.objectContaining({ content: 'Persisted note' })
    )
  })
})
