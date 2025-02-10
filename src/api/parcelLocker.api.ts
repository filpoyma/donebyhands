import baseApi from '~api/base.api';
import { IParcelLocker } from '~typedefs/models/ParcelLocker.model';
import { IPostomatsResponce } from '~typedefs/api/rent.api';
import { ICellStatusServerResponse } from '~typedefs/api/cell.api';
import OrderApi from '~api/order.api';
import { IUploadItem } from '~typedefs/api/user.api';
import { API_URL } from '~constants/api.constants';

const parcelLockerApi = {
  basePath: 'rent/parcel_lockers',

  getUrl(path?: string) {
    return path ? `${this.basePath}/${path}/` : `${this.basePath}/`;
  },

  async getParcelLockerList(): Promise<IPostomatsResponce> {
    const url = this.getUrl();

    return baseApi.get(url).json();
  },

  getParcelLockerById(id: number): Promise<IParcelLocker> {
    const url = this.getUrl(`${id}`);

    return baseApi.get(url).json();
  },

  getEndRentalPinAndLoadPhotos(id: string, data: IUploadItem[] | null) {
    const url = `${API_URL}/${this.basePath}/${id}/end_pin/`;
    const method = 'PATCH';
    return OrderApi.uploadToolsPhotos(id, url, method, data);
  },

  getCellStatus(id: string): Promise<ICellStatusServerResponse> {
    const url = this.getUrl(`${id}/cell_status`);

    return baseApi.get(url).json();
  },
};

export default parcelLockerApi;
