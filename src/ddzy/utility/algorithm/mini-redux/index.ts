/**
 * @name MiniRedux
 * @description 以最简单的方式实现核心 redux
 * @author ddzy
 * @since 2020/09/15
 */
export type IStaticReducer<S, A> = (state: S, action: A) => S;
export type IStaticNotificationCallback<S, A> = (state: S, action: A) => void;


export default function createStore<S, A>(reducer: IStaticReducer<S, A>, state: S) {
  let initialState = state;
  let notifications: Array<IStaticNotificationCallback<S, A>> = [];

  function dispatch(action: A) {
    initialState = reducer(initialState, action) || initialState;
    notifications.forEach((v) => {
      v(initialState, action);
    });
  }

  function getState() {
    return initialState;
  }

  function subscribe(callback: IStaticNotificationCallback<S, A>) {
    notifications.push(callback);
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}