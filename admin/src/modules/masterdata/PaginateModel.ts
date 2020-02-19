import { applySnapshot, types } from 'mobx-state-tree';

export const PaginateModel = types
  .model('PaginateModel', {
    _limit: types.optional(types.number, 10),
    _page: types.optional(types.number, 1),
    xTotalCount: types.optional(types.number, 0)
  })
  .views((self: any) => ({
    get totalPage() {
      return Math.ceil(self.xTotalCount / self._limit);
    },
    get totalPageList() {
      return Array.from(new Array(self.totalPage), (val, index) => index + 1);
    }
  }))
  .actions((self: any) => ({
    setPage: (page: number) => {
      self._page = page;
    },
    setLimit: (_limit: number) => {
      self._limit = _limit;
    },
    setXTotalCount: (xTotalCount: string) => {
      self.xTotalCount = +xTotalCount;
    },
    increasePaginate: (count?: number) => {
      if (self._page + (count || 1) <= self.totalPage) {
        self._page = self._page + (count || 1);
      }
    },
    setDefaultPaginate: () => {
      self._limit = 10;
      self._page = 1;
      self.xTotalCount = 0;
    },
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));

export type IPaginateModel = typeof PaginateModel.Type;
