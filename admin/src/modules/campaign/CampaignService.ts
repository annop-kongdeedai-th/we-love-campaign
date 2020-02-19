import { request } from '../../utils';
import moment from 'moment';

const campaignUrl = `${process.env.REACT_APP_API_ENDPOINT}/campaigns`;

export interface ICampaignService {
  //
}
class CampaignService {
  constructor(protected url = '') {
    this.url = campaignUrl;
  }

  public async getCampaignDetail(id: number): Promise<any> {
    try {
      const result = await request.get(`${this.url}/${id}`);
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async getCampaignList(queries: any): Promise<any> {
    try {
      const result = await request.get(this.url, {
        queries
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async updateCampaign(id: number, body: any): Promise<any> {
    try {
      body.updated_at = moment().format('YYYY/MM/DD');
      const result = await request.patch(`${this.url}/${id}`, { body });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async createCampaign(body: any): Promise<any> {
    try {
      body.created_at = moment().format('YYYY/MM/DD');
      const result = await request.post(`${this.url}`, {
        body
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async deleteCampaign(id: number): Promise<any> {
    try {
      const result = await request.delete(`${this.url}/${id}`);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
export const campaignAPI = new CampaignService(campaignUrl);
