import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IParcelLocker } from '~typedefs/models/ParcelLocker.model';
import { IParcelLockersState } from '~typedefs/redux/reducers/parcelLockers.reducer';

const initialState: IParcelLockersState = {
  list: [],
  byId: { id: '', name: '', address: '', lat: 0, lon: 0, cells: [] },
};

const { reducer: parcelLockersReducer, actions: parcelLockersActions } = createSlice({
  name: 'parcelLockers',
  initialState,
  reducers: {
    setParcelLockers(state: IParcelLockersState, action: PayloadAction<IParcelLocker[]>) {
      state.list = action.payload;
    },
    setById(state: IParcelLockersState, action: PayloadAction<IParcelLocker>) {
      const availableCells = action.payload.cells.filter(cell => cell.tool_id);
      state.byId = { ...action.payload, cells: availableCells };
    },
  },
});

export { parcelLockersActions, parcelLockersReducer };
