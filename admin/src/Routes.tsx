import React, { lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import MainLayout from 'pages/layouts/MainLayout';
import { inject, observer } from 'mobx-react';

const AdminUserCreatePage = lazy(() =>
  import('./pages/admin/AdminUserCreatePage')
);
const AdminUserPage = lazy(() => import('./pages/admin/AdminUserPage'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminCampaignPage = lazy(() => import('./pages/admin/AdminCampaignPage'));
const AdminCampaignCreatePage = lazy(() =>
  import('./pages/admin/AdminCampaignCreatePage')
);
const AdminCampaignDetailPage = lazy(() =>
  import('./pages/admin/AdminCampaignDetailPage')
);
const AdminUserDetailPage = lazy(() =>
  import('./pages/admin/AdminUserDetailPage')
);
const CampaignPage = lazy(() => import('./pages/campaign/CampaignPage'));
const CampaignDetailPage = lazy(() =>
  import('./pages/campaign/CampaignDetailPage')
);

@inject('authStore')
@observer
class Routes extends React.Component<any> {
  constructor(props: any) {
    super(props);
    try {
      if (this.props.authStore!.profile.id === '') {
        this.props.authStore!.getUserProfile();
      }
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    return (
      <Switch>
        <MainLayout>
          <Switch>
            {/* ========================= ADMIN ========================= */}
            {/* Admin Login */}
            <Route exact path="/admin-login" component={AdminLoginPage} />

            {/* Admin Home */}
            <Route exact path="/admin-campaign" component={AdminCampaignPage} />
            {/* Admin Campaign */}
            <Route
              exact
              path="/admin-campaign/create"
              component={AdminCampaignCreatePage}
            />
            <Route
              exact
              path="/admin-campaign/:id"
              component={AdminCampaignDetailPage}
            />
            <Route
              exact
              path="/admin-campaign/:id/edit"
              component={(props: any) => (
                <AdminCampaignDetailPage editMode={true} {...props} />
              )}
            />

            {/* Admin User */}
            <Route exact path="/admin-user" component={AdminUserPage} />
            <Route
              exact
              path="/admin-user/create"
              component={AdminUserCreatePage}
            />
            <Route
              exact
              path="/admin-user/:id"
              component={AdminUserDetailPage}
            />
            <Route
              exact
              path="/admin-user/:id/edit"
              component={(props: any) => (
                <AdminUserDetailPage editMode={true} {...props} />
              )}
            />

            {/* Campaign */}
            <Route exact path="/" component={CampaignPage} />
            <Route exact path="/campaign/:id" component={CampaignDetailPage} />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}

export default withRouter(Routes);
