import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blocksReducer from '../features/blocks/blocksSlice';
import blockReducer from '../features/block/blockSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    block: blockReducer,
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
