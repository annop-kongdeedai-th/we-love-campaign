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

interface IAdminUserDetailPage extends RouteComponentProps {
  editMode?: boolean;
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject('appStore', 'authStore')
@observer
class AdminUserDetailPage extends Component<IAdminUserDetailPage> {
  private user: IUserModel = UserModel.create({});

  state = { loading: false };

  async componentDidMount() {
    const { match, appStore } = this.props;
    try {
      // @ts-ignore
      const id = match.params.id;
      await this.setLoading(true);
      this.user.setField({ fieldName: 'id', value: id });
      await this.user.getUserProfile();
    } catch (e) {
      console.log(e);
    } finally {
      await this.setLoading(false);
    }
  }

  public render() {
    const { editMode, appStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.whiteGreyBlack}>
        <Grid container style={styles.container} spacing={3} justify={'center'}>
          <Grid item container justify={'center'}>
            <UserDetailBasicInfoTab user={this.user} editMode={editMode} />
          </Grid>
        </Grid>
      </PageContainer>
    );
  }

  private setLoading = (loading: boolean) => {
    this.setState({ loading: loading });
  };
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
export default AdminUserDetailPage;
