import baseApi from '~api/base.api';
import { IRent, ITool } from '~typedefs/models/Tools.model';
import {
  IExtendsTariffsResponse,
  IMetricaRentedToolsResponse,
  IRentedToolsResponse,
} from '~typedefs/api/rent.api';
import { IOpenCellRequestData, IOpenCellResponseData } from '~typedefs/api/cell.api';
// import { IOpenCellRequestData, IOpenCellResponseData } from '~typedefs/api/cell.api';

const RentApi = {
  basePath: 'rent',

  getUrl(path: string) {
    return `${this.basePath}/${path}/`;
  },

  async getTool(id: string): Promise<ITool> {
    const url = this.getUrl(`tools/${id}`);

    return baseApi.get(url).json();
  },

  async getTools(): Promise<IRent> {
    const url = this.getUrl('tools');

    return baseApi.get(url).json();
  },
  //history rented tools
  async getRentedTools(page = 1): Promise<IRentedToolsResponse> {
    return baseApi.get(`${this.basePath}/rented-tools/?page=${page}`).json();
  },

  async getCurrentRentedTools(): Promise<IRentedToolsResponse> {
    const url = this.getUrl('current-tools');

    return baseApi.get(url).json();
  },

  openCell(data: IOpenCellRequestData): Promise<IOpenCellResponseData> {
    const url = this.getUrl('open-cell');

    return baseApi.post(url, { json: data }).json();
  },

  debtCheck(id: string): Promise<{ id: number; redirect_url: string }> {
    const url = this.getUrl(`${id}/late-rent-payment`);

    return baseApi.post(url).json();
  },

  async getExtendsTariffs(orderId: string): Promise<IExtendsTariffsResponse[]> {
    const url = this.getUrl(`extend-tariffs/${orderId}`);

    return baseApi.get(url).json();
  },

  async getMerticaRentedTools(orderId: string): Promise<IMetricaRentedToolsResponse> {
    const url = this.getUrl(`${orderId}/metrika-data`);

    return baseApi.get(url).json();
  },

  async setValuation(
    orderId: string,
    stars: number,
    comment: string,
  ): Promise<IMetricaRentedToolsResponse> {
    const url = this.getUrl('valuation');

    return baseApi
      .post(url, { json: { rent_request: orderId, grade: stars, grade_comment: comment } })
      .json();
  },
};
export default RentApi;
