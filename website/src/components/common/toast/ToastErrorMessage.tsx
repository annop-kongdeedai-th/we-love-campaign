import React from 'react';
import { Typography, Snackbar, Paper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { IAppModel } from 'AppModel';
import { COLORS } from '../../../constants';

interface IToastErrorMessage {
  appStore?: IAppModel;
}

@inject('appStore')
@observer
class ToastErrorMessage extends React.Component<IToastErrorMessage> {
  public render() {
    const { appStore } = this.props;
    const open = appStore!.errorMessage !== '';
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        onClose={() =>
          appStore!.setField({ fieldName: 'errorMessage', value: '' })
        }
        style={styles.snackbarStyle}>
        <Paper style={styles.paperStyle}>
          <Typography style={styles.textStyle}>
            {appStore!.errorMessage}
          </Typography>
        </Paper>
      </Snackbar>
    );
  }
}

const styles: any = {
  snackbarStyle: {
    bottom: 0
  },
  paperStyle: {
    padding: 14,
    backgroundColor: COLORS.red
  },
  textStyle: {
    color: COLORS.white,
    fontSize: 18
  }
};

export default ToastErrorMessage;
