import { request } from '../../utils';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/masterdata`;
const bankUrl = `${process.env.REACT_APP_API_ENDPOINT}/masterdata/banks`;

class MasterDataService {
  constructor(protected url = '') {
    this.url = url;
  }

  public async getBankList(): Promise<any> {
    try {
      const result = await request.get(bankUrl, undefined);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
export const masterDataAPI = new MasterDataService(baseUrl);
