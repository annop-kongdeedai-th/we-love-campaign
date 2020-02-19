import React from 'react';
import Modal from '@material-ui/core/Modal';
import { CircularProgress } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { IAppModel } from 'AppModel';

interface ILoadingModal {
  appStore?: IAppModel;
}

@inject('appStore', 'authStore')
@observer
class LoadingModal extends React.Component<ILoadingModal> {
  public render() {
    const { appStore } = this.props;
    return (
      <Modal style={styles.modalStyle} open={appStore!.loading}>
        <div style={styles.loaderStyle}>
          <CircularProgress />
        </div>
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    border: 'none'
  },
  loaderStyle: {
    outline: 'none'
  }
};

export default LoadingModal;
