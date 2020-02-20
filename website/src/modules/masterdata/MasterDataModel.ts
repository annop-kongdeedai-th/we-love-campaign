import { applySnapshot, types } from 'mobx-state-tree';
import { IInput } from '../../constants';
import { masterDataAPI } from './MasterDataService';
import { flow } from 'mobx';
import { FileModel } from 'modules/file/FileModel';

export const MasterDataModel = types
  .model('MasterDataModel', {
    label: types.optional(types.string, ''),
    image: types.optional(FileModel, {})
  })
  .views((self: any) => ({
    //
  }))
  .actions((self: any) => ({
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));

export type IMasterDataModel = typeof MasterDataModel.Type;

export const MasterDataListModel = types
  .model('MasterDataListModel', {
    list: types.optional(types.array(MasterDataModel), []),
    loading: types.optional(types.boolean, false)
  })
  .views((self: any) => ({
    get masterDataToJSON() {
      return self.toJSON();
    }
  }))
  .actions((self: any) => ({
    getBankList: flow(function*() {
      try {
        self.loading = true;
        const result = yield masterDataAPI.getBankList();
        self.setList(result.data.list);
      } catch (e) {
        throw e;
      } finally {
        self.setField({ fieldName: 'loading', value: false });
      }
    }),
    getMasterDataBylabel: (label: string): IMasterDataModel | undefined => {
      return self.list.find((data: IMasterDataModel) => data.label === label);
    },
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    setList: (data: any) => {
      self.list = data;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));

export type IMasterDataListModel = typeof MasterDataListModel.Type;
