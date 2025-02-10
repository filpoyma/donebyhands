import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultCityRegion } from '~constants/map.constants';
import { IMapState } from '~typedefs/redux/reducers/map.reducer';

const initialState: IMapState = {
  initialRegion: defaultCityRegion,
  userPosition: { lon: defaultCityRegion.lon, lat: defaultCityRegion.lat },
  geolocationAccess: null,
};

const { reducer: mapReducer, actions: mapActions } = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setInitialRegion(state: IMapState, action: PayloadAction<IMapState['initialRegion']>) {
      state.initialRegion = action.payload;
    },
    setUserPosition(state: IMapState, action: PayloadAction<IMapState['userPosition']>) {
      state.userPosition = action.payload;
    },
    setGeolocationAccess(state: IMapState, action: PayloadAction<IMapState['geolocationAccess']>) {
      state.geolocationAccess = action.payload;
    },
  },
});

export { mapActions, mapReducer };
