import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blocksReducer from '../features/blocks/blocksSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    counter: counterReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
