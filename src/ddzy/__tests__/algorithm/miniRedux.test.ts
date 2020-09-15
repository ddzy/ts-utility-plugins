import createStore from '../../utility/algorithm/mini-redux/index';

describe('MiniRedux', () => {
  interface IStaticState {
    count: number;
  };
  interface IStaticAction {
    type: string;
  };

  const initialState: IStaticState = {
    count: 0,
  };
  const reducer = (state: IStaticState, action: IStaticAction) => {
    switch (action.type) {
      case 'INCREMENT': {
        return {
          ...state,
          count: ++state.count,
        };
      };
      case 'DECREMENT': {
        return {
          ...state,
          count: --state.count,
        };
      };
      default: {
        return state
      };
    }
  }
  const store = createStore<IStaticState, IStaticAction>(reducer, initialState);

  test('The method `store.getState()` should work fine', () => {
    const state = store.getState();

    expect(state.count).toBe(0);
  });
  test('The method `store.dispatch()` should work fine`', () => {
    store.dispatch({
      type: 'INCREMENT',
    });
    store.dispatch({
      type: 'INCREMENT',
    });
    store.dispatch({
      type: 'INCREMENT',
    });
    store.dispatch({
      type: 'DECREMENT',
    });

    expect(store.getState().count).toBe(2);
  });
  test('The method `store.subscribe()` should work fine', () => {
    let index = 0;

    store.subscribe(() => {
      ++index;
    });
    store.dispatch({
      type: 'DECREMENT',
    });
    store.dispatch({
      type: 'DECREMENT',
    });

    expect(index).toBe(2);
    expect(store.getState().count).toBe(0);
  });
});