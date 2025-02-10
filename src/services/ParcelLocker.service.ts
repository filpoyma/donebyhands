import store from '~redux/store';
import rentApi from '~api/rent.api';
import parcelLockerApi from '~api/parcelLocker.api';
import { parcelLockersActions } from '~redux/reducers/parcelLockers';
import { IPhoto } from '~typedefs/models/Camera';
import { createPhotoData, uploadImagesErrorHandler } from '~utils/order.utils';
import { ICellStatus } from '~typedefs/api/cell.api';
import arrangeRentalDataStorageItem from '~storage/arrangeRentalData.storageItem';
import { Screens } from '~constants/navigators.constants';
import { appActions } from '~redux/reducers/app';

const ParcelLockerService = {
  async initialize() {
    await this.getParcelLockerList();
    await this.setStatusPhotosLoadedAtRentalBegin();
  },

  async getParcelLockerList() {
    const parcelLockers = await parcelLockerApi.getParcelLockerList();
    store.dispatch(parcelLockersActions.setParcelLockers(parcelLockers.results));
  },

  async getParcelLockerById(id: number) {
    return await parcelLockerApi.getParcelLockerById(id);
  },

  async openCell(requestData: { lon: number; rent_request: string; lat: number }) {
    return await rentApi.openCell(requestData);
  },

  async getEndRentalPinAndLoadPhotos(id: string, photos: IPhoto[], message: string) {
    const multipartData = createPhotoData(photos, { end_comment: message });
    const response = await parcelLockerApi.getEndRentalPinAndLoadPhotos(id, multipartData);
    await uploadImagesErrorHandler(response);
    return response.json();
  },

  async getCellStatus(id: string): Promise<ICellStatus> {
    const data = await parcelLockerApi.getCellStatus(id);
    return {
      isOpen: data.open,
      isCellWasOpenedAtStart: data.start_cell_info,
      isCellWasOpenedAtEnd: data.end_cell_info,
    };
  },

  async setStatusPhotosLoadedAtRentalBegin() {
    const arrangeRentalData = await arrangeRentalDataStorageItem.get();
    let isToolsPhotosLoadedAtRentalBegin = true;
    if (
      arrangeRentalData?.postomatId &&
      arrangeRentalData?.orderId &&
      arrangeRentalData?.fromScreen
    ) {
      if (arrangeRentalData.fromScreen === Screens.takingToolsPictures)
        isToolsPhotosLoadedAtRentalBegin = false;
      if (arrangeRentalData.fromScreen === Screens.rentStarted) {
        const { isCellWasOpenedAtStart } = await this.getCellStatus(arrangeRentalData.orderId);
        if (isCellWasOpenedAtStart) isToolsPhotosLoadedAtRentalBegin = false;
      }
    }
    store.dispatch(appActions.setToolsPhotoStatus(isToolsPhotosLoadedAtRentalBegin));
  },
};

export default ParcelLockerService;
