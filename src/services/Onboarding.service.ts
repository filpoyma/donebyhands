import store from '~redux/store';
import { Image } from 'react-native';
import onboardingPassedStorageItem from '~storage/onboardingPassed.storageItem';
import { appActions } from '~redux/reducers/app';

const OnboardingService = {
  async initialize() {
    const isOnboardingPassedInStorage = await onboardingPassedStorageItem.get();
    if (isOnboardingPassedInStorage === null) {
      await onboardingPassedStorageItem.set(false);
    }
    store.dispatch(appActions.setOnboardingPassed(!!isOnboardingPassedInStorage));

    if (isOnboardingPassedInStorage) return;

    await this.preFetchOnboardingImages();
  },
  async preFetchOnboardingImages() {
    const imagesList = store.getState().app.generalSettings?.onboarding_slides;
    const preFetchTasks: Promise<boolean>[] = [];
    imagesList?.forEach(p => {
      preFetchTasks.push(Image.prefetch(p.photo));
    });
    await Promise.all(preFetchTasks);
  },
};

export default OnboardingService;
