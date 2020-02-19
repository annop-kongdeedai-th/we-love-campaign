import { applySnapshot, types, flow } from 'mobx-state-tree';
import { IInput } from '../../constants';
import moment from 'moment';
import 'moment/locale/th';
import { formatDateThai } from '../../utils/format-helper';
import { campaignAPI } from './CampaignService';
import { FileModel } from 'modules/file/FileModel';
import { AddressModel } from 'modules/user/UserModel';

export enum campaignStatusValueEnum {
  inProgress = 'กำลังดำเนินการ',
  cancelled = 'ยกเลิก',
  suspended = 'ระงับ',
  end = 'สิ้นสุด',
  all = ''
}

export const CampaignModel = types
  .model('CampaignModel', {
    id: types.maybe(types.number),
    brand: types.optional(types.string, ''),
    image: types.optional(FileModel, {}),
    campaignName: types.optional(types.string, ''),
    startDate: types.optional(types.string, ''),
    endDate: types.optional(types.string, ''),
    shortDescription: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    status: types.optional(
      types.enumeration(Object.values(campaignStatusValueEnum)),
      campaignStatusValueEnum.inProgress
    ),
    address: types.optional(AddressModel, {}),
    created_at: types.optional(types.string, ''),
    updated_at: types.optional(types.string, '')
  })
  .views((self: any) => ({
    get periodTime() {
      return (
        formatDateThai(self.startDate) + ' - ' + formatDateThai(self.endDate)
      );
    },
    get startDateAsThaiFormat() {
      return formatDateThai(self.startDate);
    },
    get endDateAsThaiFormat() {
      return formatDateThai(self.endDate);
    },
    get timeAgo() {
      return moment(self.created_at).fromNow();
    },
    get timeLeft() {
      return moment(self.endDate).isValid()
        ? `${moment(self.endDate).fromNow(true)} left`
        : '';
    },
    get createdAtView() {
      const createdMoment = moment(self.created_at);
      return `${createdMoment.format('DD.MM.YYYY')} / ${createdMoment.format(
        'LT'
      )}`;
    },
    get campaigntoJSON() {
      return self.toJSON();
    }
  }))
  .actions((self: any) => ({
    getCampaignDetail: flow(function*() {
      try {
        const result = yield campaignAPI.getCampaignDetail(self.id);
        self.setAllField(result.data);
        // if (!result) {
        //   throw "signup failed";
        // }
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    updateCampaign: flow(function*() {
      try {
        const result = yield campaignAPI.updateCampaign(self.id, self);
        self.setAllField(result.data);
        // if (!result) {
        //   throw "signup failed";
        // }
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    createCampaign: flow(function*() {
      try {
        const result = yield campaignAPI.createCampaign(self);
        // self.setAllField(result.data);
        // if (!result) {
        //   throw "signup failed";
        // }
        return result;
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    deleteCampaign: flow(function*() {
      try {
        const result = yield campaignAPI.deleteCampaign(self.id);
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    setAllField: (data: any) => {
      Object.keys(data).forEach(key => {
        try {
          self[key] = data[key];
        } catch (e) {
          console.log(e);
        }
      });
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));

export type ICampaignModel = typeof CampaignModel.Type;
