import { applySnapshot, flow, types } from 'mobx-state-tree';
import { IInput } from '../../constants';
import { CampaignModel, campaignStatusValueEnum } from './CampaignModel';
import moment from 'moment';
import 'moment/locale/th';
import { campaignAPI } from './CampaignService';
import { PaginateModel } from 'modules/masterdata/PaginateModel';
import { sortByType } from 'components/common/table/TableHeaderWithFilter';

enum campaignListSortByFieldEnum {
  newest = 'created_at',
  character = 'campaignName'
}

export const CampaignListModel = types
  .model('CampaignListModel', {
    list: types.optional(types.array(CampaignModel), []),
    loading: types.optional(types.boolean, false),
    sortByNewest: types.optional(types.boolean, true),
    filterQ: types.optional(types.string, ''),
    status: types.optional(types.string, campaignStatusValueEnum.all),
    paginate: types.optional(PaginateModel, {}),
    sortByField: types.optional(
      types.string,
      campaignListSortByFieldEnum.newest
    )
  })
  .views((self: any) => ({
    get sortByText(): sortByType {
      if (self.sortByField === campaignListSortByFieldEnum.character) {
        return 'ตัวอักษร';
      } else {
        return 'ใหม่ล่าสุด';
      }
    }
  }))
  .actions((self: any) => ({
    getCampaignList: flow(function*(query?: any) {
      try {
        self.loading = true;
        const params: any = {
          q: self.filterQ,
          _limit: self.paginate._limit,
          _page: self.paginate._page,
          _sort: self.sortByField,
          _order: 'desc',
          ...query
        };

        if (self.status) {
          params.status = self.status;
        }

        const result = yield campaignAPI.getCampaignList(params);

        self.setList(result);
      } catch (e) {
        throw e;
      } finally {
        self.loading = false;
      }
    }),
    deleteAllCampaign: flow(function*(campaignIdList: number[]) {
      try {
        for (const campaignId of campaignIdList) {
          yield campaignAPI.deleteCampaign(campaignId);
        }
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    onSelectedSortBy: (sortBy: sortByType) => {
      if (sortBy === 'ตัวอักษร') {
        self.sortByField = campaignListSortByFieldEnum.character;
      } else if (sortBy === 'ใหม่ล่าสุด') {
        self.sortByField = campaignListSortByFieldEnum.newest;
      }
    },
    onSelectedCampaignsFilterStatus: (status: campaignStatusValueEnum) => {
      self.status = status;
      self.paginate._page = 1;
      self.getCampaignList();
    },
    onSearchText: ({ fieldName, value }: IInput) => {
      self.filterQ = value;
      self.paginate._page = 1;
      self.getCampaignList();
    },
    setList: (result: any) => {
      self.paginate.setXTotalCount(result.headers['x-total-count']);
      self.list = result.data;
    },
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type ICampaignListModel = typeof CampaignListModel.Type;
