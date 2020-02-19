import React from 'react';
import { IMAGES, COLORS } from '../../constants';
import { Typography, List, ListItem } from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';
import SideBarIcon from './partials/SideBarIcon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { isOnAdminMode, isOnAuthMode } from 'utils/routes-helper';
import { IoIosSettings } from 'react-icons/io';
import { inject, observer } from 'mobx-react';
import { IAuthModel } from 'modules/auth';
import { IAppModel } from 'AppModel';
import { MdEventNote } from 'react-icons/md';

interface ISideBar extends RouteComponentProps<any> {
  mobileMode?: boolean;
  appStore?: IAppModel;
  authStore?: IAuthModel;
}

@inject('authStore', 'appStore')
@observer
class SideBar extends React.Component<ISideBar, any> {
  public render() {
    const { location } = this.props;
    return this.renderSideBarAdminMode();
  }

  private renderSideBarAdminMode = () => {
    const { location, mobileMode } = this.props;
    return (
      <List aria-label="mailbox folders" style={styles.listContainerStyle}>
        <List style={styles.listIconContainerStyle}>
          {isOnAuthMode(location.pathname) ? null : (
            <React.Fragment>
              <ListItem style={styles.listItemStyle}>
                <SideBarIcon
                  to={'/admin-campaign'}
                  icon={
                    <React.Fragment>
                      <MdEventNote size={20} />
                      {this.renderIconLabelText('หน้าหลัก')}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem style={styles.listItemStyle}>
                <SideBarIcon
                  to={'/admin-user'}
                  icon={
                    <React.Fragment>
                      <PersonOutline />
                      {this.renderIconLabelText('ผู้ใช้งาน')}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </React.Fragment>
          )}
          {this.renderSideBarFooter()}
        </List>
      </List>
    );
  };

  private renderIconLabelText = (label: string) => {
    const { mobileMode } = this.props;
    if (mobileMode) {
      return <Typography style={styles.textStyle}>{label}</Typography>;
    } else {
      return null;
    }
  };

  private renderSideBarFooter = () => {
    const { mobileMode, location } = this.props;
    return (
      <React.Fragment>
        {mobileMode ? (
          <React.Fragment>
            <ListItem style={styles.listItemStyle}>
              <SideBarIcon
                to={'#'}
                onClick={this.onSignOut}
                icon={
                  <React.Fragment>
                    <FaSignOutAlt size={20} />
                    {this.renderIconLabelText('ออกจากระบบ')}
                  </React.Fragment>
                }
              />
            </ListItem>
          </React.Fragment>
        ) : null}
        <ListItem style={styles.listItemStyle}>
          <Typography>{`V. ${process.env.REACT_APP_API_VERSION}`}</Typography>
        </ListItem>
      </React.Fragment>
    );
  };
  private onSignOut = async () => {
    const { authStore, location, history, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await authStore!.signOut();
      history.push(
        isOnAdminMode(location.pathname) ? '/admin-login' : '/ads-login'
      );
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };
}
const styles: any = {
  listContainerStyle: { height: '100%' },
  listIconContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  listItemStyle: {
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0
  },
  versionListItemStyle: {
    textAlign: 'center'
  },
  iconGroupStyle: {
    display: 'grid',
    justifyContent: 'center'
  },
  textStyle: {
    marginLeft: 8
  }
};
export default withRouter(SideBar);
