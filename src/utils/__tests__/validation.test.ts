import { describe, it, expect } from 'vitest'
import { validatePokemonSearch, sanitizeSearchInput, getSuggestionText } from '../validation'

describe('Pokemon Search Validation', () => {
  describe('validatePokemonSearch', () => {
    it('should allow empty string', () => {
      const result = validatePokemonSearch('')
      expect(result.isValid).toBe(true)
    })

    it('should allow empty string with spaces', () => {
      const result = validatePokemonSearch('   ')
      expect(result.isValid).toBe(true)
    })

    it('should accept valid pokemon names', () => {
      const validNames = ['pikachu', 'charmander', 'ho-oh', "farfetch'd"]
      
      validNames.forEach(name => {
        const result = validatePokemonSearch(name)
        expect(result.isValid).toBe(true)
      })
    })

    it('should reject names with spaces and suggest hyphens', () => {
      const result = validatePokemonSearch('ho oh')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Use hyphens instead of spaces')
      expect(result.error).toContain('ho-oh')
    })

    it('should reject names that are too short', () => {
      const result = validatePokemonSearch('ab')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('at least 3 characters')
    })

    it('should reject names that are too long', () => {
      const longName = 'a'.repeat(31)
      const result = validatePokemonSearch(longName)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('too long')
    })

    it('should reject invalid characters', () => {
      const result = validatePokemonSearch('pokemon@123')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('can only contain letters')
    })
  })

  describe('sanitizeSearchInput', () => {
    it('should remove invalid characters', () => {
      const result = sanitizeSearchInput('pokemon@#$%')
      expect(result).toBe('pokemon')
    })

    it('should convert to lowercase', () => {
      const result = sanitizeSearchInput('PIKACHU')
      expect(result).toBe('pikachu')
    })

    it('should normalize spaces', () => {
      const result = sanitizeSearchInput('ho   oh')
      expect(result).toBe('ho oh')
    })

    it('should limit length to 30 characters', () => {
      const longInput = 'a'.repeat(50)
      const result = sanitizeSearchInput(longInput)
      expect(result).toHaveLength(30)
    })
  })

  describe('getSuggestionText', () => {
    it('should suggest hyphen format for spaced names', () => {
      const result = getSuggestionText('ho oh')
      expect(result).toBe('Try: "ho-oh"')
    })

    it('should return empty string for names without spaces', () => {
      const result = getSuggestionText('pikachu')
      expect(result).toBe('')
    })

    it('should handle multiple spaces', () => {
      const result = getSuggestionText('tapu   koko')
      expect(result).toBe('Try: "tapu-koko"')
    })
  })
})