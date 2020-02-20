import { request } from '../../utils';
import moment from 'moment';

export const userUrl = `${process.env.REACT_APP_API_ENDPOINT}/users`;

export interface IUserService {
  //
}
class UserService {
  constructor(protected url = '') {
    this.url = url;
  }

  public async getUserProfile(id: string): Promise<any> {
    try {
      const result = await request.get(`${this.url}/${id}`);
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async createUser(body: any): Promise<any> {
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

  public async updateUserProfile(id: number, body: any): Promise<any> {
    try {
      body.updated_at = moment().format('YYYY/MM/DD');
      const result = await request.patch(`${this.url}/${id}`, { body });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async getUserList(queries: any): Promise<any> {
    try {
      const result = await request.get(this.url, { queries });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async deleteUserProfile(id: string): Promise<any> {
    try {
      const result = await request.delete(`${this.url}/${id}`);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
export const userAPI = new UserService(userUrl);
