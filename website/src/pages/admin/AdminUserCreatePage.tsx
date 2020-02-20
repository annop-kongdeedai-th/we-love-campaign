import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IAuthModel } from 'modules/auth';
import { UserDetailBasicInfoTab } from 'modules/user/components';
import { COLORS } from '../../constants';
import { UserModel, IUserModel } from 'modules/user/UserModel';
import { Grid } from 'components/common';
import { IAppModel } from 'AppModel';
import PageContainer from 'pages/layouts/partials/PageContainer';

interface IAdminUserCreatePage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject('appStore', 'authStore')
@observer
class AdminUserCreatePage extends Component<IAdminUserCreatePage> {
  private user: IUserModel = UserModel.create({});

  public render() {
    const { appStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.whiteGreyBlack}>
        <Grid container style={styles.container} spacing={3} justify={'center'}>
          <Grid item container justify={'center'}>
            <UserDetailBasicInfoTab user={this.user} createMode />
          </Grid>
        </Grid>
      </PageContainer>
    );
  }
}
const styles: any = {
  container: {
    //
  },
  suspendedButton: {
    height: '100%'
  },
  deleteButton: {
    height: '100%'
  },
  formDisplayStyle: {
    paddingTop: 14,
    paddingBottom: 14
  },
  gridBodyStyle: {
    marginTop: 40
  }
};
export default AdminUserCreatePage;
