import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOnboardingState } from '~typedefs/redux/reducers/onboarding.reducer';
import { IOnboardingImage } from '~typedefs/models/Onboarding.model';

const initialState: IOnboardingState = {
  imageList: [],
};

const { reducer: onboardingReducer, actions: onboardingActions } = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setImageList(state: IOnboardingState, action: PayloadAction<IOnboardingImage[]>) {
      state.imageList = action.payload;
    },
  },
});

export { onboardingReducer, onboardingActions };
