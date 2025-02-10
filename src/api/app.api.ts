import baseApi from '~api/base.api';
import { ISettingsResponseData } from '~typedefs/api/app.api';

const AppApi = {
  basePath: 'general-settings/',

  getSettings(): Promise<ISettingsResponseData> {
    return baseApi.get(this.basePath).json();
  },
};

export default AppApi;
