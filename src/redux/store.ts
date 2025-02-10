import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth';
import { appReducer } from './reducers/app';
import { mapReducer } from './reducers/map';
import { rentReducer } from './reducers/rent';
import { notificationReducer } from './reducers/notification';
import { orderReducer } from '~redux/reducers/order';
import { parcelLockersReducer } from '~redux/reducers/parcelLockers';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    map: mapReducer,
    rent: rentReducer,
    order: orderReducer,
    notification: notificationReducer,
    parcelLockers: parcelLockersReducer,
  },
});

export type TStoreState = ReturnType<typeof store.getState>;

export default store;
