import { applySnapshot, types } from 'mobx-state-tree';
import { IInput } from '../../constants';
import { flow } from 'mobx';
import { userAPI } from './UserService';
import moment from 'moment';
import { UserModel } from './UserModel';
import { userTypeValuelEnum } from './userTypeValuelEnum';
import { PaginateModel } from 'modules/masterdata/PaginateModel';
import { sortByType } from 'components/common/table/TableHeaderWithFilter';

enum userListSortByFieldEnum {
  newest = 'created_at',
  character = 'firstnameAndLastname'
}

export const UserListModel = types
  .model('UserModel', {
    list: types.optional(types.array(UserModel), []),
    paginate: types.optional(PaginateModel, {}),
    sortByField: types.optional(
      types.string,
      userListSortByFieldEnum.character
    ),
    loading: types.optional(types.boolean, false)
  })
  .views((self: any) => ({
    get sortByText(): sortByType {
      if (self.sortByField === userListSortByFieldEnum.character) {
        return 'ตัวอักษร';
      } else {
        return 'ใหม่ล่าสุด';
      }
    },
    get dataChart() {
      return [
        { name: 'ม.ค.', value: 30 },
        { name: 'ก.พ.', value: 60 },
        { name: 'มี.ค.', value: 50 },
        { name: 'เม.ย.', value: 130 },
        { name: 'พ.ค.', value: 105 },
        { name: 'มิ.ย.', value: 230 },
        { name: 'ก.ค.', value: 150 },
        { name: 'ส.ค.', value: 240 },
        { name: 'ก.ย.', value: 200 },
        { name: 'ต.ค.', value: 80 },
        { name: 'พ.ย.', value: 120 },
        { name: 'ธ.ค.', value: 180 }
      ];
    }
  }))
  .actions((self: any) => ({
    getUserList: flow(function*() {
      try {
        self.setLoading(true);
        const params = {
          _limit: self.paginate._limit,
          _page: self.paginate._page,
          _sort: self.sortByField,
          _order: 'desc'
        };
        const result = yield userAPI.getUserList(params);
        self.setList(result);
      } catch (e) {
        throw e;
      } finally {
        self.setLoading(false);
      }
    }),
    deleteAllUser: flow(function*(userIdList: string[]) {
      try {
        for (const userId of userIdList) {
          yield userAPI.deleteUserProfile(userId);
        }
        console.log('deleteUserProfile result');
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    onSelectedSortBy: (sortBy: sortByType) => {
      if (sortBy === 'ตัวอักษร') {
        self.sortByField = userListSortByFieldEnum.character;
      } else if (sortBy === 'ใหม่ล่าสุด') {
        self.sortByField = userListSortByFieldEnum.newest;
      }
    },
    setList: (result: any) => {
      self.paginate.setXTotalCount(result.headers['x-total-count']);
      self.list = result.data;
    },
    setLoading: (loading: boolean) => {
      self.loading = loading;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type IUserListModel = typeof UserListModel.Type;
