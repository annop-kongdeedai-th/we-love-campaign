import { inject, observer } from 'mobx-react';
import React from 'react';
import {
  Avatar,
  MenuItem,
  Button,
  Menu,
  Fade,
  Typography
} from '@material-ui/core';
import { COLORS } from '../../../constants';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { ArrowDropDown } from '@material-ui/icons';
import { IAuthModel } from 'modules/auth';
import { getHeaderTitleLayout } from 'utils';
import { isOnAdminMode, isOnAuthMode } from 'utils/routes-helper';
import { IAppModel } from 'AppModel';
import { FaChevronRight } from 'react-icons/fa';
import { Grid } from 'components/common';

interface IHeaderLayout extends RouteComponentProps<any> {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject('authStore', 'appStore')
@observer
class HeaderLayout extends React.Component<IHeaderLayout> {
  state = { userMenu: null };
  public render() {
    const { location, appStore } = this.props;
    return (
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        style={{
          paddingRight: isOnAdminMode(location.pathname) ? '4em' : 0,
          ...styles.container
        }}>
        {isOnAuthMode(location.pathname) ? null : (
          <React.Fragment>
            <Grid item container width={5} style={styles.leftContainer} />
            <Grid
              item
              container
              width={2}
              justify={'center'}
              style={styles.headerTitleContainer}>
              {`${appStore!.headerTitleLayout ||
                getHeaderTitleLayout(location.pathname)}`}
            </Grid>
            <Grid
              container
              item
              width={5}
              justify={'flex-end'}
              style={styles.userProfileContainer}>
              {isOnAdminMode(location.pathname)
                ? this.renderUserMenu()
                : this.renderGoToAdmin()}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    );
  }

  private renderUserMenu = () => {
    const { authStore, history, location } = this.props;
    const userMenuopen = Boolean(this.state.userMenu);
    return (
      <Grid
        container
        direction={'row'}
        justify={'flex-end'}
        alignItems={'center'}>
        <div style={styles.padHorizonal}>
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={this.handleUserMenuClick}>
            <span>{authStore!.profile.firstnameAndLastname}</span>
            <ArrowDropDown />
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={this.state.userMenu}
            keepMounted
            open={userMenuopen}
            onClose={this.handleUserMenuClose}
            TransitionComponent={Fade}>
            <MenuItem
              onClick={this.onSignOut}
              style={{ justifyContent: 'center', color: COLORS.lightBlue }}>
              <Typography>ออกจากระบบ</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    );
  };

  private renderGoToAdmin = () => {
    const { authStore, history, location } = this.props;
    return (
      <Link to={'/admin-login'}>
        <Button style={styles.goToAdminButtonStyle}>
          {'เข้าสู่ระบบหลังบ้าน'}
          <FaChevronRight style={styles.chevronIconStyle} />
        </Button>
      </Link>
    );
  };

  private handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ userMenu: event.currentTarget });
  };

  private handleUserMenuClose = () => {
    this.setState({ userMenu: null });
  };

  private onSignOut = async () => {
    const { authStore, location, history, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await authStore!.signOut();
      history.push('/admin-login');
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
      this.handleUserMenuClose();
    }
  };
}

const styles: any = {
  container: {
    height: '100%'
  },
  leftContainer: {
    //
  },
  headerTitleContainer: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  userProfileContainer: {
    paddingRight: 30
  },
  padHorizonal: {
    marginLeft: 7,
    marginRight: 7
  },
  chevronIconStyle: {
    marginLeft: 4
  },
  goToAdminButtonStyle: {
    color: COLORS.facebook
  }
};
export default withRouter(HeaderLayout);
