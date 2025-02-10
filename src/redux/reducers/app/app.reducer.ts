import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAppState } from '~typedefs/redux/reducers/app.reducer';
import { ISettingsResponseData } from '~typedefs/api/app.api';

const initialState: IAppState = {
  onBoardingPassed: null,
  isOverlayShown: false,
  isToolsPhotosLoadedAtRentalBegin: null,
  isNewVersionAvailable: false,
  generalSettings: {
    logo: '',
    privacy_policy: '',
    terms_of_service: '',
    write_to_chat: '',
    call_phone: '',
    support_icon: '',
    onboarding_slides: [],
    rent_rules: '',
    faq_blocks: [],
    app_version: '',
  },
};

const { reducer: appReducer, actions: appActions } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingPassed(state: IAppState, action: PayloadAction<boolean>) {
      state.onBoardingPassed = action.payload;
    },
    setOverlayShown(state: IAppState, action: PayloadAction<boolean>) {
      state.isOverlayShown = action.payload;
    },
    setGeneralSettings(state: IAppState, action: PayloadAction<ISettingsResponseData>) {
      state.generalSettings = action.payload;
    },
    setToolsPhotoStatus(state: IAppState, action: PayloadAction<boolean>) {
      state.isToolsPhotosLoadedAtRentalBegin = action.payload;
    },
    setVersionStatus(state: IAppState, action: PayloadAction<boolean>) {
      state.isNewVersionAvailable = action.payload;
    },
  },
});

export { appReducer, appActions };
