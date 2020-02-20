import { inject, observer } from 'mobx-react';
import React from 'react';
import { IconButton, Button } from '@material-ui/core';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { IAuthModel } from 'modules/auth';
import { Grid } from 'components/common';
import { getHeaderTitleLayout } from 'utils';
import { GoThreeBars } from 'react-icons/go';
import { IAppModel } from 'AppModel';
import { isOnAuthMode, isOnAdminMode } from 'utils/routes-helper';
import { FaChevronRight } from 'react-icons/fa';

interface IMobileHeaderLayout extends RouteComponentProps<any> {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject('authStore', 'appStore')
@observer
class MobileHeaderLayout extends React.Component<IMobileHeaderLayout> {
  state = { anchorEl: null };
  public render() {
    const { location, appStore } = this.props;
    return (
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        style={styles.container}>
        <Grid item width={5}>
          {isOnAdminMode(location.pathname) && !isOnAuthMode(location.pathname)
            ? this.renderThreeBars()
            : null}
        </Grid>
        <Grid item width={2} style={styles.headerTitleContainer}>
          {`${appStore!.headerTitleLayout ||
            getHeaderTitleLayout(location.pathname)}`}
        </Grid>
        <Grid container item width={5} justify={'flex-end'}>
          {isOnAdminMode(location.pathname) ? null : this.renderGoToAdmin()}
        </Grid>
      </Grid>
    );
  }

  private renderThreeBars = () => {
    const { appStore } = this.props;
    return (
      <IconButton
        onClick={appStore!.toggerDrawer}
        edge="start"
        color="inherit"
        aria-label="open drawer">
        <GoThreeBars
          color={'disabled'}
          size={28}
          style={styles.threeDotBarStyle}
        />
      </IconButton>
    );
  };

  private renderGoToAdmin = () => {
    const { authStore, history, location } = this.props;
    return (
      <Link to={'/admin-login'}>
        <Button>
          {'เข้าสู่ระบบหลังบ้าน'}
          <FaChevronRight />
        </Button>
      </Link>
    );
  };
}
const styles: any = {
  container: {
    height: '100%'
  },
  headerTitleContainer: {
    textAlign: 'center'
  },
  threeDotBarStyle: {
    marginLeft: 8
    // color: COLORS.black
    // backgroundColor: 'red'
  }
};
export default withRouter(MobileHeaderLayout);
