import { describe, it, expect, beforeEach } from 'vitest'
import { loadNotes, saveNotes } from './storage'
import type { Note } from './types'

const STORAGE_KEY = 'workflow-notes'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty array when nothing is stored', () => {
    expect(loadNotes()).toEqual([])
  })

  it('returns empty array when stored value is invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not valid json {')
    expect(loadNotes()).toEqual([])
  })

  it('persists notes to localStorage', () => {
    const notes: Note[] = [{ id: '1', content: 'Test', status: 'pending' }]
    saveNotes(notes)
    const stored = localStorage.getItem(STORAGE_KEY)
    expect(stored).toBe(JSON.stringify(notes))
  })
})
