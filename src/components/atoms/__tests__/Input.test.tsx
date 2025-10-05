import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input Component', () => {
  it('should render input with placeholder', () => {
    render(<Input placeholder="Search Pokemon" />)
    
    const input = screen.getByPlaceholderText('Search Pokemon')
    expect(input).toBeInTheDocument()
  })

  it('should render input with icon', () => {
    render(
      <Input 
        placeholder="Search"
        icon={<span data-testid="search-icon">🔍</span>}
      />
    )
    
    const icon = screen.getByTestId('search-icon')
    const input = screen.getByPlaceholderText('Search')
    
    expect(icon).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('should handle user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'pikachu')
    
    expect(input).toHaveValue('pikachu')
  })

  it('should call onChange when user types', async () => {
    const user = userEvent.setup()
    let value = ''
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value
    }
    
    render(<Input onChange={handleChange} placeholder="Test" />)
    
    const input = screen.getByPlaceholderText('Test')
    await user.type(input, 'test')
    
    expect(value).toBe('test')
  })

  it('should apply custom props', () => {
    render(
      <Input 
        data-testid="custom-input"
        disabled
        value="readonly"
        readOnly
      />
    )
    
    const input = screen.getByTestId('custom-input')
    
    expect(input).toBeDisabled()
    expect(input).toHaveValue('readonly')
  })

  it('should have correct CSS classes', () => {
    render(
      <Input 
        placeholder="Test"
        icon={<span>🔍</span>}
      />
    )
    
    const wrapper = screen.getByPlaceholderText('Test').parentElement
    const input = screen.getByPlaceholderText('Test')
    
    expect(wrapper).toHaveClass('input-wrapper')
    expect(input).toHaveClass('input')
  })
})