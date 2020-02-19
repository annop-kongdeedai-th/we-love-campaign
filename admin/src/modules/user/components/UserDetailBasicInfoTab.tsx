import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  UserDetailBodyViewMode,
  UserDetailBodyEditMode
} from 'modules/user/components';
import { COLORS } from '../../../constants';
import { IUserModel, UserModel } from '../UserModel';
import { Grid } from 'components/common';
import { IAppModel } from 'AppModel';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IUserDetailBasicInfoTab extends RouteComponentProps<any> {
  user: IUserModel;
  editMode?: boolean;
  createMode?: boolean;
  appStore?: IAppModel;
}

@inject('appStore', 'appStore')
@observer
class UserDetailBasicInfoTab extends Component<IUserDetailBasicInfoTab> {
  public render() {
    const { user, createMode, editMode } = this.props;
    return (
      <Grid container item computer={4} tablet={4} mobile={12}>
        <Grid item container width={12}>
          {createMode || editMode ? (
            <UserDetailBodyEditMode
              user={UserModel.create(user.usertoJSON)}
              onClickCancel={this.onClickCancel}
              onEditUserDetail={
                createMode ? this.onCreateUser : this.onEditUserDetail
              }
              createMode={createMode}
            />
          ) : (
            <UserDetailBodyViewMode
              user={user}
              onClickEdit={this.onClickEdit}
            />
          )}
        </Grid>
      </Grid>
    );
  }

  private onClickEdit = () => {
    const { user, history } = this.props;
    history.push(`/admin-user/${user.id}/edit`);
  };

  private onEditUserDetail = async (edittingUser: IUserModel) => {
    const { user, history, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      user.setAllField(edittingUser.usertoJSON);
      await user.updateProfile();
      history.push(`/admin-user/${edittingUser.id}/edit`);
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onCreateUser = async (edittingUser: IUserModel) => {
    const { user, history, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      user.setAllField(edittingUser.usertoJSON);
      const result = await user.createUser();
      history.push(`/admin-user/${result.data.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onClickCancel = () => {
    const { user, history } = this.props;
    history.push(`/admin-user/${user.id}`);
  };
}
const styles: any = {
  container: {
    backgroundColor: COLORS.white
  }
};
export default withRouter(UserDetailBasicInfoTab);
