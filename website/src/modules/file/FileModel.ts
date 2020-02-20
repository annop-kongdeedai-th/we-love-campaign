import { applySnapshot, types, flow } from 'mobx-state-tree';
import { toBase64 } from 'utils/toBase64';

export const FileModel = types
  .model('FileModel', {
    fileName: types.optional(types.string, ''),
    fileType: types.optional(types.string, ''),
    file: types.optional(types.string, '')
  })
  .views((self: any) => ({
    get fileToJSON() {
      return self.toJSON();
    }
  }))
  .actions((self: any) => ({
    setFile: flow(function*(file: File) {
      const base64 = yield toBase64(file);
      self.fileName = file.name;
      self.fileType = file.type;
      self.file = base64;
    }),
    resetAll: () => {
      applySnapshot(self, {});
    }
  }));

export type IFileModel = typeof FileModel.Type;
