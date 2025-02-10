import { ISettingsResponseData } from '~typedefs/api/app.api';

export interface IAppState {
  onBoardingPassed: boolean | null;
  isOverlayShown: boolean;
  generalSettings: ISettingsResponseData;
  isToolsPhotosLoadedAtRentalBegin: boolean | null;
  isNewVersionAvailable: boolean;
}
