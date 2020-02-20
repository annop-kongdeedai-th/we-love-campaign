import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IAddressModel } from 'modules/user/UserModel';
import { GoogleMap } from '../map';

interface IGoogleMapModal {
  trigger: any;
  address: IAddressModel;
}
class GoogleMapModal extends React.Component<IGoogleMapModal> {
  state = { open: false, lat: null, lng: null };

  private onOpen = () => {
    this.setState({ open: true });
  };

  private onClose = () => {
    this.setState({ open: false });
  };
  public render() {
    const { trigger, address } = this.props;
    return (
      <div>
        <div style={styles.triggerStyle} onClick={this.onOpen}>
          {trigger}
        </div>
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
            <div style={styles.contentStyle}>
              <GoogleMap
                address={address}
                mapHeight={'100%'}
                onClick={this.handleClickedMap}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }

  private handleClickedMap = (e: any) => {
    const { address } = this.props;
    let latitude = e.lat;
    let longtitude = e.lng;
    this.setState({ lat: latitude, lng: longtitude });
    address.setLatLong(latitude, longtitude);
  };
}

const styles = {
  triggerStyle: {
    display: 'unsset'
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  contentStyle: {
    outline: 'none',
    height: '80%',
    width: '80%'
  }
};

export default GoogleMapModal;
