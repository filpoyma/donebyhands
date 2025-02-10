import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { logout } from '~redux/actions';
import { IOrderExtendUpdate, IOrderUpdate } from '~typedefs/models/Order.model';
import { IOrderState } from '~typedefs/redux/reducers/order.reducer';

const initialState: IOrderState = {
  current: {
    toolId: '',
    postomatId: '',
    distanceToPostomat: 0,
    points: 0,
    promocodes: [],
    promocode: '',
    tariffId: '0',
    id: null,
  },
  extend: {
    orderId: '',
    promocode: '',
    points: 0,
    tariffId: '',
  },
};

const { reducer: orderReducer, actions: orderActions } = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateCurrentOrder(state: IOrderState, action: PayloadAction<IOrderUpdate>) {
      state.current = {
        ...state.current,
        ...action.payload,
      };
    },

    clearCurrentOrder(state: IOrderState, action: PayloadAction<string>) {
      state.current = {
        ...initialState.current,
        promocodes: state.current.promocodes,
        postomatId: action ? action.payload : '',
        distanceToPostomat: state.current.distanceToPostomat,
      };
    },

    updateExtendOrder(state: IOrderState, action: PayloadAction<IOrderExtendUpdate>) {
      state.extend = {
        ...state.extend,
        ...action.payload,
      };
    },
    orderReset(state: IOrderState) {
      state.current = {
        ...initialState.current,
        promocodes: state.current.promocodes,
      };
      state.extend = initialState.extend;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export { orderActions, orderReducer };
