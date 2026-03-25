import reducer from './reducer';
import { OREO_CLICK_VALUE } from './constants';

describe('Game Reducer', () => {
  const initialState = {
    oreos: 0,
    clicks: 0,
    speed: 0,
    gadgets: [
      { type: 'cursor', count: 0, cost: 10, speed: 1, inflation: 1.15 }
    ],
    messages: [],
    ticks: 0,
    gadgetsCount: 0
  };

  test('GET_OREO action increases oreos and clicks', () => {
    const action = { type: 'GET_OREO' };
    const newState = reducer(initialState, action);
    
    expect(newState.oreos).toBe(OREO_CLICK_VALUE);
    expect(newState.clicks).toBe(1);
  });

  test('BUY_GADGET action updates state correctly', () => {
    const stateWithOreos = { ...initialState, oreos: 20 };
    const newGadgets = [
      { type: 'cursor', count: 1, cost: 12, speed: 1, inflation: 1.15 }
    ];
    
    const action = { 
      type: 'BUY_GADGET', 
      totalCost: 10, 
      newGadgets 
    };
    
    const newState = reducer(stateWithOreos, action);
    
    expect(newState.oreos).toBe(10);
    expect(newState.gadgetsCount).toBe(1);
    expect(newState.gadgets).toEqual(newGadgets);
    expect(newState.speed).toBe(1);
  });

  test('PUSH_MESSAGE action adds message', () => {
    const message = { type: 'info', text: 'Test message', time: 5, id: 123 };
    const action = { type: 'PUSH_MESSAGE', newMessage: message };
    
    const newState = reducer(initialState, action);
    
    expect(newState.messages).toHaveLength(1);
    expect(newState.messages[0]).toEqual(message);
  });

  test('TICK action updates ticks and oreos', () => {
    const stateWithSpeed = { 
      ...initialState, 
      speed: 2,
      gadgets: [
        { type: 'cursor', count: 2, cost: 10, speed: 1, inflation: 1.15 }
      ]
    };
    
    const action = { type: 'TICK', payload: { elapsedTime: 5 } };
    const newState = reducer(stateWithSpeed, action);
    
    expect(newState.ticks).toBe(5);
    expect(newState.oreos).toBe(2); // speed * 1 tick
  });
});
