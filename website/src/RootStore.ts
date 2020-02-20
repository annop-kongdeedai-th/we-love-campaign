import appStore from './AppModel';
import { authStore } from './modules/auth/AuthModel';
import { MasterDataListModel } from 'modules/masterdata/MasterDataModel';

const RootStore = {
  appStore,
  authStore
};

export default RootStore;
