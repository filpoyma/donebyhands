import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { logout } from '~redux/actions';
import { IRentedToolModelUpdate, IRentedTools, ITool } from '~typedefs/models/Tools.model';
import { IRentState } from '~typedefs/redux/reducers/rent.reducer';
import { IExtendsTariffs } from '~typedefs/models/Order.model';

const initialState: IRentState = {
  tools: [],
  rentedTools: {
    list: [],
    page: 1,
    loading: false,
    moreLoading: false,
    isListEnd: false,
  },
  currentRentedTools: [],
  extendsTariffs: [],
};

const { reducer: rentReducer, actions: rentActions } = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    setTools(state: IRentState, action: PayloadAction<ITool[]>) {
      state.tools = action.payload || [];
    },
    setRentedTools(state: IRentState, action: PayloadAction<IRentedTools[]>) {
      state.rentedTools.list = action.payload || [];
    },
    addRentedTools(state: IRentState, action: PayloadAction<IRentedTools[]>) {
      state.rentedTools.list = [...state.rentedTools.list, ...action.payload] || [];
    },
    updateRentedToolsModel(state: IRentState, action: PayloadAction<IRentedToolModelUpdate>) {
      state.rentedTools = { ...state.rentedTools, ...action.payload };
    },

    setCurrentRentedTools(state: IRentState, action: PayloadAction<IRentedTools[]>) {
      state.currentRentedTools = action.payload || [];
    },
    setExtendsTariffs(state: IRentState, action: PayloadAction<IExtendsTariffs[]>) {
      state.extendsTariffs = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export { rentReducer, rentActions };
