import { getVersion } from 'react-native-device-info';
import { isNewVerHigher } from '~utils/helpers.utils';
import store from '~redux/store';
import { appActions } from '~redux/reducers/app';

const AppUpdateService = {
  async checkForUpdate() {
    const currentVersion = getVersion();
    const latestVersion = store.getState().app.generalSettings?.app_version; //ver from backend
    if (!latestVersion) return;
    store.dispatch(appActions.setVersionStatus(isNewVerHigher(currentVersion, latestVersion)));
  },

  // async _checkForUpdate() {
  //   if (Config.ENVIRONMENT === 'DEVELOPMENT') return;
  //   try {
  //     const inAppUpdates = new SpInAppUpdates(false);
  //     const result = await inAppUpdates.checkNeedsUpdate();
  //     Alert.alert(`${JSON.stringify(result)}`);
  //     if (result.shouldUpdate) {
  //       let updateOptions: StartUpdateOptions = {};
  //       if (isAndroid) updateOptions = { updateType: IAUUpdateKind.IMMEDIATE };
  //       if (isIOS)
  //         updateOptions = {
  //           title: 'Update available',
  //           message:
  //             'There is a new version of the app available on the App Store, do you want to update it?',
  //           buttonUpgradeText: 'Update',
  //           buttonCancelText: 'Cancel',
  //         };
  //       inAppUpdates.addStatusUpdateListener(downloadStatus => {
  //         console.log('download status', downloadStatus);
  //         if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
  //           console.log('downloaded');
  //           inAppUpdates.installUpdate();
  //           inAppUpdates.removeStatusUpdateListener(finalStatus => {
  //             console.log('final status', finalStatus);
  //           });
  //         }
  //       });
  //       inAppUpdates.startUpdate(updateOptions).catch(err => {
  //         console.log('start update err', err);
  //       });
  //     }
  //   } catch (err) {
  //     console.error('inAppUpdates err', err);
  //   }
  // },
};
export default AppUpdateService;
