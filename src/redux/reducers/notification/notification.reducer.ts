import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from '~redux/actions';

import { INotification } from '~typedefs/models/Notification.model';
import { INotificationState } from '~typedefs/redux/reducers/notification.reducer';

const initialState: INotificationState = {
  list: [],
};

const { reducer: notificationReducer, actions: notificationActions } = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state: INotificationState, action: PayloadAction<INotification[]>) {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export { notificationReducer, notificationActions };
