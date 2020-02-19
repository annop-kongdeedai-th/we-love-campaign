import { inject, observer } from 'mobx-react';
import React, { Suspense } from 'react';
import { IAppModel } from '../../AppModel';
import HeaderLayout from './partials/HeaderLayout';
import MobileHeaderLayout from './partials/MobileHeaderLayout';
import { COLORS } from '../../constants';
import { LinearProgress, Hidden } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { isOnAdminMode } from 'utils/routes-helper';
import { RouteComponentProps, withRouter } from 'react-router';

interface IPageLayout extends RouteComponentProps<any> {
  width: Breakpoint;
  children?: any;
  appStore?: IAppModel;
}

@inject('appStore')
@observer
class PageLayout extends React.Component<IPageLayout> {
  public render() {
    const { width, location } = this.props;
    return (
      <React.Fragment>
        {width === 'xs' ? (
          <div style={styles.topMobile}>
            <MobileHeaderLayout />
          </div>
        ) : (
          <div
            style={{
              left: isOnAdminMode(location.pathname) ? '4.5em' : 0,
              ...styles.top
            }}>
            <HeaderLayout />
          </div>
        )}

        <div style={styles.content}>
          <Suspense fallback={<LinearProgress />}>
            <div style={styles.children}>{this.props.children}</div>
          </Suspense>
        </div>
      </React.Fragment>
    );
  }
}
const styles: any = {
  top: {
    position: 'fixed',
    top: 0,
    height: '5vh',
    width: '100%',
    zIndex: 1000,
    backgroundColor: COLORS.white,
    // '-webkitBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    // '-mozBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    boxShadow: '0px 13px 17px -7px rgba(181,179,181,0.1)'
  },
  topMobile: {
    position: 'fixed',
    top: 0,
    height: '5vh',
    width: '100%',
    zIndex: 1000,
    backgroundColor: COLORS.white,
    // '-webkitBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    // '-mozBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    boxShadow: '0px 13px 17px -7px rgba(181,179,181,0.1)'
  },
  content: {
    marginTop: '5vh',
    height: 'auto',
    width: '100%',
    backgroundColor: COLORS.transparent
  },
  children: {
    // padding: 28
  }
};
export default withRouter(PageLayout);
