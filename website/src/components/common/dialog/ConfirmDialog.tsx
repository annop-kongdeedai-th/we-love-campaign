import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextButton } from '../button';

interface IConfirmDialog {
  trigger: any;
  title?: string;
  message?: string;
  onClickConfirm?: () => void;
  onClickCancel?: () => void;
}

class ConfirmDialog extends React.Component<IConfirmDialog> {
  state = { open: false };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const { trigger, title, message } = this.props;
    return (
      <React.Fragment>
        <div style={styles.triggerStyle} onClick={this.handleClickOpen}>
          {trigger}
        </div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          {message ? (
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
          ) : null}
          <DialogActions>
            <TextButton onClick={this.onClickCancel} color="primary">
              ยกเลิก
            </TextButton>
            <TextButton onClick={this.onClickConfirm} color="primary" autoFocus>
              ยอมรับ
            </TextButton>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  private handleClickOpen = () => {
    if (this._isMounted) {
      this.setState({ open: true });
    }
  };

  private handleClose = () => {
    if (this._isMounted) {
      this.setState({ open: false });
    }
  };

  private onClickConfirm = async () => {
    const { onClickConfirm } = this.props;
    try {
      if (onClickConfirm) {
        await onClickConfirm();
      }
      if (this._isMounted) {
        await this.setState({ open: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  private onClickCancel = async () => {
    const { onClickCancel } = this.props;
    try {
      if (onClickCancel) {
        await onClickCancel();
      }
      if (this._isMounted) {
        await this.setState({ open: false });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

const styles: any = {
  triggerStyle: {
    display: 'unset'
  }
};

export default ConfirmDialog;
