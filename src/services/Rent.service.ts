import rentApi from '~api/rent.api';
import store from '~redux/store';
import { rentActions } from '~redux/reducers/rent';
import { IExtendsTariffs } from '~typedefs/models/Order.model';

const RentService = {
  async initialize() {
    await this.getTools();
    await this.addRentedTools(1);
  },
  getTool: async (toolId: string | undefined) => {
    if (!toolId) return null;
    return await rentApi.getTool(toolId);
  },

  getTools: async () => {
    const data = await rentApi.getTools();

    if (data.results) store.dispatch(rentActions.setTools(data.results));

    return data;
  },

  getRentedTools: async (page: number) => {
    return await rentApi.getRentedTools(page);
  },

  setRentedTools: async (page = 1) => {
    const data = await rentApi.getRentedTools(page);
    if (data.results) store.dispatch(rentActions.setRentedTools(data.results));
    return data;
  },

  addRentedTools: async (page = 1) => {
    const data = await rentApi.getRentedTools(page);
    if (data.results) store.dispatch(rentActions.addRentedTools(data.results));

    return data;
  },
  getCurrentRentedTools: async () => {
    const data = await rentApi.getCurrentRentedTools();
    if (data.results) store.dispatch(rentActions.setCurrentRentedTools(data.results));
    return data;
  },

  getExtendsTariffs: async (orderId: string): Promise<IExtendsTariffs[]> => {
    const data = await rentApi.getExtendsTariffs(orderId);
    if (data) {
      const tariffs = data.map(tariff => ({ ...tariff, id: `${tariff.id}` }));
      store.dispatch(rentActions.setExtendsTariffs(tariffs));
      return tariffs;
    }
    return [];
  },

  debtCheck(id: string) {
    return rentApi.debtCheck(id);
  },

  getMerticaRentedTools(orderId: string) {
    return rentApi.getMerticaRentedTools(orderId);
  },

  setValuation(orderId: string, stars: number, comment: string) {
    return rentApi.setValuation(orderId, stars, comment);
  },
};

export default RentService;
