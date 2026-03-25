import { validateGameState, sanitizeGameState } from './validation';

describe('Validation Utils', () => {
  const validState = {
    oreos: 100,
    speed: 5,
    gadgets: [
      { count: 2, cost: 15, speed: 1 }
    ],
    clicks: 50,
    ticks: 30
  };

  describe('validateGameState', () => {
    test('returns true for valid state', () => {
      expect(validateGameState(validState)).toBe(true);
    });

    test('returns false for null/undefined', () => {
      expect(validateGameState(null)).toBe(false);
      expect(validateGameState(undefined)).toBe(false);
    });

    test('returns false for missing required properties', () => {
      const { oreos, ...incompleteState } = validState;
      expect(validateGameState(incompleteState)).toBe(false);
    });

    test('returns false for negative numbers', () => {
      const invalidState = { ...validState, oreos: -10 };
      expect(validateGameState(invalidState)).toBe(false);
    });

    test('returns false for invalid gadgets', () => {
      const invalidState = { 
        ...validState, 
        gadgets: [{ count: -1, cost: 10, speed: 1 }] 
      };
      expect(validateGameState(invalidState)).toBe(false);
    });
  });

  describe('sanitizeGameState', () => {
    const fallback = { oreos: 0, speed: 0, gadgets: [], clicks: 0, ticks: 0 };

    test('returns sanitized valid state', () => {
      const result = sanitizeGameState(validState, fallback);
      expect(result.oreos).toBe(100);
      expect(result.speed).toBe(5);
    });

    test('returns fallback for invalid state', () => {
      // Suppress console.warn for this test
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      const result = sanitizeGameState(null, fallback);
      expect(result).toEqual(fallback);
      
      consoleSpy.mockRestore();
    });

    test('floors decimal numbers', () => {
      const stateWithDecimals = { ...validState, oreos: 100.7, clicks: 50.3 };
      const result = sanitizeGameState(stateWithDecimals, fallback);
      expect(result.oreos).toBe(100);
      expect(result.clicks).toBe(50);
    });
  });
});
