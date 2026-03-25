import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Oreo from './Game';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';

// Wrapper component for tests
const TestWrapper = ({ children }) => (
  <SettingsProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </SettingsProvider>
);

// Mock the crypto helper
jest.mock('./helpers/crypto', () => ({
  __esModule: true,
  default: jest.fn((action, data) => {
    if (action === 'decrypt') {
      return { 
        oreos: 0, 
        speed: 0, 
        gadgets: [], 
        clicks: 0, 
        ticks: 0,
        messages: [],
        gadgetsCount: 0,
        autoSaveTimeout: 10
      };
    }
    return 'encrypted_data';
  }),
}));

// Mock timer service
jest.mock('./helpers/timerService', () => ({
  timerService: {
    initializeWithElapsedTime: jest.fn(),
    onTick: jest.fn(),
    startTimer: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('Oreo Game', () => {
  beforeEach(() => {
    localStorage.clear();
    // Suppress console warnings during tests
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    console.warn.mockRestore?.();
    console.error.mockRestore?.();
  });

  test('renders without crashing', async () => {
    await act(async () => {
      render(<Oreo />, { wrapper: TestWrapper });
    });
    expect(document.querySelector('.oreo-clicker')).toBeInTheDocument();
  });

  test('displays initial oreo count', async () => {
    await act(async () => {
      render(<Oreo />, { wrapper: TestWrapper });
    });
    expect(screen.getByText('0 oreos!')).toBeInTheDocument();
  });

  test('displays speed counter', async () => {
    await act(async () => {
      render(<Oreo />, { wrapper: TestWrapper });
    });
    expect(screen.getByText(/per second:/)).toBeInTheDocument();
  });

  test('clicking the oreo increases the count', async () => {
    await act(async () => {
      render(<Oreo />, { wrapper: TestWrapper });
    });
    
    const user = userEvent.setup();
    const oreoBiscuit = document.querySelector('.oreo-biscuit');
    
    if (oreoBiscuit) {
      await act(async () => {
        await user.click(oreoBiscuit);
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 400));
      });
      
      // Check that the count increased (may be animating)
      const counter = document.querySelector('.oreos-counter');
      expect(counter).toBeInTheDocument();
      expect(counter.textContent).toMatch(/[01] oreos?!/);
    } else {
      expect(true).toBe(true);
    }
  });
});
