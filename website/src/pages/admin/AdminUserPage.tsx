import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IAuthModel } from 'modules/auth';
import { UserListTable } from 'modules/user/components';
import { UserListModel, IUserListModel } from 'modules/user/UserListModel';
import { COLORS } from '../../constants';
import { PersonOutline } from '@material-ui/icons';
import { TableHeaderWithFilter, Grid } from 'components/common';
import { IAppModel } from 'AppModel';
import PageContainer from 'pages/layouts/partials/PageContainer';
import { Button, Typography } from '@material-ui/core';

interface IAdminUserPage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}
@inject('appStore', 'authStore')
@observer
class AdminUserPage extends Component<IAdminUserPage> {
  private userListStore: IUserListModel = UserListModel.create({});

  async componentDidMount() {
    const { appStore } = this.props;
    try {
      await this.userListStore.getUserList();
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    const { authStore, appStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.white}>
        <Grid container style={styles.container} spacing={3}>
          <Grid item container width={12} justify={'flex-end'}>
            <Link to={'/admin-user/create'}>
              <Button variant={'contained'} color={'primary'}>
                <Typography>สร้างแอดมิน</Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item container width={12}>
            <TableHeaderWithFilter
              title={'ผู้ใช้งานทั้งหมด'}
              titleIcon={<PersonOutline />}
              dataCount={this.userListStore.paginate.xTotalCount}
              paginate={this.userListStore.paginate}
              sortedBy={this.userListStore.sortByText}
              onSelectedSortBy={this.userListStore.onSelectedSortBy}
              onGetData={this.userListStore.getUserList}
            />
            <UserListTable userListStore={this.userListStore} />
          </Grid>
        </Grid>
      </PageContainer>
    );
  }
}
const styles: any = {
  container: {
    //
  }
};
export default AdminUserPage;
