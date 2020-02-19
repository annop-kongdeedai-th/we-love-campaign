import { applySnapshot, types } from 'mobx-state-tree';
import { IInput } from '../../constants';
import { date_display_CE_TO_BE } from '../../utils/format-helper';
import { flow } from 'mobx';
import { userAPI } from './UserService';
import moment from 'moment';
import { FileModel } from 'modules/file/FileModel';
import { userTypeValuelEnum } from './userTypeValuelEnum';

export const AddressModel = types
  .model('AddressModel', {
    latitude: types.optional(types.number, 0),
    longitude: types.optional(types.number, 0)
  })
  .views((self: any) => ({
    get coordinate(): any {
      return { lat: self.latitude, lng: self.longitude };
    },
    get fullAdress() {
      if (self.latitude && self.longitude) {
        return `${self.latitude}, ${self.longitude}`;
      } else {
        return '';
      }
    }
  }))
  .actions((self: any) => ({
    setLatLong: (latitude: number, longitude: number) => {
      self.latitude = latitude;
      self.longitude = longitude;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type IAddressModel = typeof AddressModel.Type;

export const UserModel = types
  .model('UserModel', {
    id: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    firstnameAndLastname: types.optional(types.string, ''),
    phoneNumber: types.optional(types.string, ''),
    address: types.optional(AddressModel, {}),
    created_at: types.optional(types.string, ''),
    updated_at: types.optional(types.string, '')
  })
  .views((self: any) => ({
    get lastRegistrationDate() {
      return moment(self.created_at).fromNow();
    },
    get usertoJSON() {
      return self.toJSON();
    }
  }))
  .actions((self: any) => ({
    getUserProfile: flow(function*() {
      try {
        const result = yield userAPI.getUserProfile(self.id);
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
    createUser: flow(function*() {
      try {
        self.id = self.email;
        const result = yield userAPI.createUser(self);
        return result;
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    updateProfile: flow(function*() {
      try {
        const { loading, campaigns, ...body } = self;
        self.id = self.email;
        const result = yield userAPI.updateUserProfile(self.id, {
          ...body
        });
        self.setAllField(result.data);
        return result;
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    deleteUserProfile: flow(function*() {
      try {
        const result = yield userAPI.deleteUserProfile(self.id);
        self.setAllField(result.data);
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
export type IUserModel = typeof UserModel.Type;
