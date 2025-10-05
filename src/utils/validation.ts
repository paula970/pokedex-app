// Validation utilities for user inputs

/**
 * Validates Pokemon name search input
 * @param name - The search string to validate
 * @returns Object with validation result and error message
 */
export const validatePokemonSearch = (name: string): { isValid: boolean; error?: string } => {
  // Allow empty string for clearing search
  if (name.trim() === '') {
    return { isValid: true };
  }
  
  const trimmedName = name.trim();
  
  // Check for spaces in Pokemon names (suggest hyphens)
  // Show helpful message for any spaces (middle or end)
  if (/\s/.test(trimmedName)) {
    const suggestion = getSuggestionText(trimmedName);
    return { 
      isValid: false, 
      error: `Use hyphens instead of spaces. ${suggestion}` 
    };
  }
  
  // Check for invalid characters (Pokemon API format)
  const validCharPattern = /^[a-zA-Z0-9\-'.]+$/;
  if (!validCharPattern.test(trimmedName)) {
    return { 
      isValid: false, 
      error: 'Pokemon name can only contain letters, numbers, hyphens, and apostrophes' 
    };
  }
  
  // Maximum length validation (Pokemon names are typically short)
  if (trimmedName.length > 30) {
    return { 
      isValid: false, 
      error: 'Pokemon name is too long (max 30 characters)' 
    };
  }
  
  // Minimum length validation (after other validations)
  if (trimmedName.length < 3) {
    return { 
      isValid: false, 
      error: 'Pokemon name must be at least 3 characters long' 
    };
  }
  
  return { isValid: true };
};

/**
 * Sanitizes the search input by removing invalid characters only (NO automatic space-to-hyphen conversion)
 * @param input - Raw input string
 * @returns Sanitized string with only valid characters
 */
export const sanitizeSearchInput = (input: string): string => {
  return input
    .replace(/[^a-zA-Z0-9\s\-'.]/g, '') // Remove invalid characters only
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .slice(0, 30) // Limit length
    .toLowerCase(); // Convert to lowercase for consistent searching
};

/**
 * Provides a suggestion for the user when they enter spaces
 * @param input - User's input with spaces
 * @returns Suggested format with hyphens
 */
export const getSuggestionText = (input: string): string => {
  if (/\s/.test(input.trim())) {
    const suggested = input.trim().replace(/\s+/g, '-').toLowerCase();
    return `Try: "${suggested}"`;
  }
  return '';
};