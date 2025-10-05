import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should render button with icon', () => {
    render(
      <Button icon={<span data-testid="test-icon">🔍</span>}>
        Search
      </Button>
    )
    
    const icon = screen.getByTestId('test-icon')
    const button = screen.getByRole('button')
    
    expect(icon).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should handle click events', () => {
    let clicked = false
    const handleClick = () => { clicked = true }
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(clicked).toBe(true)
  })

  it('should apply custom props', () => {
    render(
      <Button disabled aria-label="Custom button" data-testid="custom-btn">
        Disabled
      </Button>
    )
    
    const button = screen.getByTestId('custom-btn')
    
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-label', 'Custom button')
  })

  it('should have correct CSS class', () => {
    render(<Button>Test</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('button')
  })
})