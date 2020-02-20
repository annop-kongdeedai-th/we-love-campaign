import { applySnapshot, flow, types } from 'mobx-state-tree';
import { UserModel } from '../user/UserModel';
import { userTypeValuelEnum } from '../user/userTypeValuelEnum';
import { authAPI } from './AuthService';
import { userAPI } from 'modules/user/UserService';

export const AuthModel = types
  .model('AuthModel', {
    email: types.optional(types.string, 'admin'),
    password: types.optional(types.string, 'admin'),
    confirmPassword: types.optional(types.string, ''),
    profile: types.optional(UserModel, {}),
    loading: types.optional(types.boolean, false)
  })
  .views((self: any) => ({
    //
  }))
  .actions((self: any) => ({
    onSignIn: flow(function*() {
      try {
        self.loading = true;
        const result = yield authAPI.sign_in({
          email: self.email,
          password: self.password
        });

        if (result.data && result.data.length > 0) {
          self.profile = result.data[0];
          window.localStorage.setItem('userId', self.profile.id);
        } else {
          throw 'signin failed';
        }
      } catch (e) {
        throw e;
      } finally {
        self.loading = false;
      }
    }),
    checekIfUserExist: flow(function*() {
      try {
        self.loading = true;
        const result = yield userAPI.getUserProfile(self.email);
        if (Object.entries(result.data).length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        throw e;
      } finally {
        self.loading = false;
      }
    }),
    signOut: flow(function*() {
      try {
        yield new Promise(resolve => {
          setTimeout(() => resolve(), 1000);
        });
        window.localStorage.removeItem('userId');
        self.resetAll();
      } catch (e) {
        throw e;
      } finally {
        //
      }
    }),
    getUserProfile: flow(function*() {
      const userIdStorage = window.localStorage.getItem('userId');
      if (userIdStorage) {
        self.profile.id = userIdStorage;
        if (userIdStorage) {
          const result = yield userAPI.getUserProfile(userIdStorage);
          self.profile = result.data;
        }
      }
    }),
    setField: (fieldName: string, value: any) => {
      self[fieldName] = value;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));
export type IAuthModel = typeof AuthModel.Type;
export const authStore = AuthModel.create();
