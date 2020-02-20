import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect } from 'react-router';
import { IAppModel } from '../../AppModel';
import PageLayout from './PageLayout';
import { COLORS } from '../../constants';
import SideBar from './SideBar';
import { Hidden, SwipeableDrawer } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { IAuthModel } from 'modules/auth';
import { isOnAdminMode } from 'utils/routes-helper';

interface IMainLayout {
  width?: Breakpoint;
  location?: any;
  children: any;
  appStore?: IAppModel;
  authStore?: IAuthModel;
}

@inject('appStore', 'authStore')
@observer
class MainLayout extends React.Component<IMainLayout, any> {
  // constructor(props: any) {
  //   super(props);
  //   if (this.props.authStore!.profile.id === '') {
  //     this.props.authStore!.getUserProfile();
  //   }
  // }

  public componentDidUpdate(prevProps: any) {
    const { appStore } = this.props;
    const pageHeaderElement = document.getElementById('pageHeaderElement');
    if (this.props.location !== prevProps.location) {
      // pageHeaderElement.scrollIntoView();
      window.scrollTo(0, 0);
      appStore!.resetStyle();
    }
  }

  public render() {
    const { width, location, appStore } = this.props;
    return (
      <div style={styles.pageWrapper}>
        {isOnAdminMode(location.pathname) ? (
          <React.Fragment>
            <Hidden xsDown>
              <div style={styles.left}>
                <SideBar />
              </div>
            </Hidden>
            <Hidden only={['xl', 'sm', 'md', 'lg']}>
              <SwipeableDrawer
                onClose={appStore!.toggerDrawer}
                onOpen={appStore!.toggerDrawer}
                open={appStore!.isOpenDrawer}
                disableSwipeToOpen>
                <div style={styles.mobileLeft}>
                  <SideBar mobileMode />
                </div>
              </SwipeableDrawer>
            </Hidden>
          </React.Fragment>
        ) : null}
        <div
          style={{
            ...styles.right,
            paddingLeft:
              width === 'xs' || !isOnAdminMode(location.pathname) ? 0 : '4.5em'
          }}>
          {/* <div id="pageHeaderElement" style={styles.pageHeaderElementStyle} /> */}
          <PageLayout width={width!}>{this.props.children}</PageLayout>
        </div>
      </div>
    );
  }

  private checkActive = (groupName: string) => {
    // เช็คว่า path slash แรก มีค่าตรงกับ groupName ไหม เช่น /admin/role_permission จะเช็ค admin กับ groupName
    // return this.props.appStore!.pageHeader === groupName;
    return true;
  };
}
const styles: any = {
  pageWrapper: {
    overflow: 'hidden',
    height: '100%',
    margin: 0,
    padding: 0
  },
  left: {
    position: 'fixed',
    top: 0,
    width: '4.5em',
    height: '100vh',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    paddingTop: 14,
    borderRight: `1px ${COLORS.lightGreyShade2} solid`
  },
  mobileLeft: {
    // position: 'fixed',
    top: 0,
    width: '15em',
    height: '100vh',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    paddingTop: 14,
    borderRight: `1px ${COLORS.lightGreyShade2} solid`,
    overflowY: 'auto'
  },
  right: {
    // overflowY: 'auto',
    height: '100%'
  },
  top: {
    position: 'fixed',
    top: 0,
    left: 250,
    right: 0,
    height: 54,
    zIndex: 1000,
    background: '#ff0',
    border: '2px solid red'
  },
  pageHeaderElementStyle: {
    marginTop: -20
  }
};

export default withWidth()(MainLayout);
