import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders the main navigation', () => {
    render(<Header />)

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Produtos' })).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
