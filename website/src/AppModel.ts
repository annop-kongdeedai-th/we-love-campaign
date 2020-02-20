import { types } from 'mobx-state-tree';
import { COLORS, IInput } from '../src/constants';

export const AppModel = types
  .model('AppModel', {
    loading: types.optional(types.boolean, false),
    toast_message: types.maybeNull(types.string),
    isOpenDrawer: types.optional(types.boolean, false),
    headerTitleLayout: types.optional(types.string, ''),
    errorMessage: types.optional(types.string, '')
  })
  .actions((self: any) => ({
    setField: ({ fieldName, value }: IInput) => {
      self[fieldName] = value;
    },
    setLoading: (loading: boolean) => {
      self.loading = loading;
    },
    showErrorMessage: (text: string, timeout?: number) => {
      self.errorMessage = text;
      setTimeout(
        () => self.setField({ fieldName: 'errorMessage', value: '' }),
        timeout || 3000
      );
    },
    toggerDrawer: () => {
      self.isOpenDrawer = !self.isOpenDrawer;
    },
    setHeaderTitleLayout: (headerTitle: string) => {
      self.headerTitleLayout = headerTitle;
    },
    clearHeaderTitleLayout: () => {
      self.headerTitleLayout = '';
    },
    resetStyle: () => {
      self.pageBackgroundColor = COLORS.white;
      self.backgroundImage = undefined;
    }
  }));
export type IAppModel = typeof AppModel.Type;
export default AppModel.create({ loading: false });
