import ky from 'ky';
import baseApi from '~api/base.api';

const mapApi = {
  basePath: 'users/user-location/',
  async getLocationByIp(): Promise<{ lat: number; lon: number }> {
    const ip: { ip: string } = await ky.get('https://api.ipify.org?format=json').json();
    return baseApi.post(`${this.basePath}`, { json: ip }).json();
  },
};

export default mapApi;
