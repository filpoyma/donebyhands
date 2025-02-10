import { isProd } from '~constants/platform.constants';

const LogService = {
  initialize() {
    if (isProd) {
      console.log = () => {};
      console.info = () => {};
      console.warn = () => {};
    }
  },
};
export default LogService;
