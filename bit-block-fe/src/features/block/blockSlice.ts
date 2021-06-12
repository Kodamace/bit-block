import { createSlice } from '@reduxjs/toolkit';
import { getSingleBlock } from '../../api/block';

export interface ISingleBlock {
  hash: string;
  height: number;
  timestamp: string;
  numberOfTransactions: number,
  confirmations: number;
  miner: string;
  difficulty: number;
  bits: number;
  mrkl_root: string;
  ver: number;
  weight: number;
  size: number;
  nonce: number;
  transaction_volume: string;
  reward: string;
  fee: number;
  tx: any;
}

export interface ISingleBlockState {
  block: ISingleBlock;
  loading: boolean;
  status: any;
}

const initialState: ISingleBlockState = {
  block: <ISingleBlock>{},
  loading: false,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.



export const blockSlice = createSlice({
  name: 'block',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearBlock(state) {
      state.block = <ISingleBlock>{}
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleBlock.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(getSingleBlock.fulfilled, (state, action) => {
        state.block = action.payload
        state.status = 'done';
        state.loading = false;
      })
  },
});

export const { clearBlock } = blockSlice.actions;

export default blockSlice.reducer;
