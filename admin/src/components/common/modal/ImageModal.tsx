import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Paper, withWidth } from '@material-ui/core';
import { IoMdClose } from 'react-icons/io';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { getPopupWidth } from 'utils/getPopupWidth';

interface IImageModal {
  width?: Breakpoint;
  trigger: any;
  src: any;
}
class ImageModal extends React.Component<IImageModal> {
  state = { open: false };

  private onOpen = () => {
    this.setState({ open: true });
  };

  private onClose = () => {
    this.setState({ open: false });
  };
  public render() {
    const { width, trigger, src } = this.props;
    return (
      <div>
        <span style={styles.triggerStyle} onClick={this.onOpen}>
          {trigger}
        </span>
        <Modal
          style={styles.modalStyle}
          open={this.state.open}
          onClose={this.onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}>
          <Fade in={this.state.open}>
            <Paper style={{ ...getPopupWidth(width!), ...styles.paperStyle }}>
              <IoMdClose onClick={this.onClose} style={styles.closeIconStyle} />
              <img src={src} style={styles.imageStyle} />
            </Paper>
          </Fade>
        </Modal>
      </div>
    );
  }
}

const styles: any = {
  triggerStyle: {
    display: 'unsset'
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  imageStyle: {
    outline: 'none',
    // height: '90%',
    width: '80%'
  },
  paperStyle: {
    outline: 'none',
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 14
  },
  closeIconStyle: {
    cursor: 'pointer',
    alignSelf: 'flex-end'
    // margin: 14
  }
};

export default withWidth()(ImageModal);
