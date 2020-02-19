import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableHead
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IUserListModel } from '../UserListModel';
import { IUserModel } from '../UserModel';
import { userTypeValuelEnum } from '../userTypeValuelEnum';
import { observer, inject } from 'mobx-react';
import { COLORS } from '../../../constants';
import {
  VisibilityOutlined,
  EditOutlined,
  DeleteOutlineOutlined
} from '@material-ui/icons';

import { ConfirmDialog, Table, TextButton } from 'components/common';
import { IAppModel } from 'AppModel';

interface IUserListTable {
  userListStore: IUserListModel;
  appStore?: IAppModel;
}

@inject('appStore')
@observer
class UserListTable extends React.Component<IUserListTable> {
  public state = {
    selectedUserList: [] as string[]
  };

  public render() {
    const { userListStore } = this.props;
    return (
      <Table
        aria-labelledby="tableTitle"
        size={'medium'}
        aria-label="enhanced table"
        paginate={userListStore.paginate}
        onPageChange={userListStore.getUserList}
        loading={userListStore.loading}
        dataLength={userListStore.list.length}>
        {this.renderTableHeader()}
        {this.renderTableBody()}
      </Table>
    );
  }

  private renderTableHeader = () => {
    return (
      <TableHead style={styles.tableHead}>
        <TableRow>
          <TableCell>
            <Checkbox onChange={this.onSelectedAllUser} />
          </TableCell>
          <TableCell style={styles.headerCell}>ชื่อลงทะเบียน</TableCell>
          <TableCell style={styles.headerCell}>อีเมลล์</TableCell>
          <TableCell style={styles.headerCell}>วันลงทะเบียน</TableCell>
          <TableCell
            style={{ ...styles.checkboxHeaderCell, ...styles.headerCell }}>
            {this.state.selectedUserList.length > 0 ? (
              <ConfirmDialog
                title={'ลบบัญชีผู้ใช้งานทั้งหมดที่เลือก'}
                onClickConfirm={this.deleteAllUser}
                trigger={
                  <TextButton
                    shade={'admin'}
                    fluid
                    variant="contained"
                    style={styles.confirmButtonStyle}>
                    ลบผู้ใช้งานทั้งหมดที่เลือก
                  </TextButton>
                }
              />
            ) : null}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  private renderTableBody = () => {
    const { userListStore } = this.props;
    return (
      <TableBody>
        {userListStore.list.map((user: IUserModel, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={
                  user.id
                    ? this.state.selectedUserList.includes(user.id)
                    : false
                }
                onChange={e => this.onSelectedUser(e, user.id)}
              />
            </TableCell>
            <TableCell>{user.firstnameAndLastname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.lastRegistrationDate}</TableCell>
            <TableCell align="right">
              <Link to={`/admin-user/${user.id}`}>
                <VisibilityOutlined style={styles.blackIcon} />
              </Link>
              <Link to={`/admin-user/${user.id}/edit`}>
                <EditOutlined style={styles.blackIcon} />
              </Link>
              <ConfirmDialog
                title={'ต้องการลบบัญชีผู้ใช้งานนี้ไหม'}
                onClickConfirm={() => this.onDeleteUserProfile(user)}
                trigger={
                  <Link to={'#'}>
                    <DeleteOutlineOutlined style={styles.redIcon} />
                  </Link>
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  private deleteAllUser = async () => {
    const { userListStore, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await userListStore.deleteAllUser(this.state.selectedUserList);
      await userListStore.getUserList();
      this.resetSelectedUserList();
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onDeleteUserProfile = async (user: IUserModel) => {
    const { userListStore, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await user.deleteUserProfile();
      await userListStore.getUserList();
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onSelectedAllUser = (e: any) => {
    const { userListStore } = this.props;
    const checked = e.target.checked;
    if (checked) {
      userListStore.list.forEach((user: IUserModel) => {
        if (user.id) {
          this.setState((prevState: any) => ({
            selectedUserList: [...prevState.selectedUserList, user.id]
          }));
        }
      });
    } else {
      this.resetSelectedUserList();
    }
  };

  private onSelectedUser = (e: any, userId: string) => {
    const checked = e.target.checked;
    if (userId) {
      if (checked) {
        this.setState((prevState: any) => ({
          selectedUserList: [...prevState.selectedUserList, userId]
        }));
      } else {
        this.setState({
          selectedUserList: this.state.selectedUserList.filter((id: string) => {
            return id !== userId;
          })
        });
      }
    }
  };

  private resetSelectedUserList = () => {
    this.setState({ selectedUserList: [] });
  };
}
const styles: any = {
  containerStyle: { paddingLeft: 3 },
  tableHead: {
    backgroundColor: COLORS.whiteGreyBlack
  },
  headerCell: {
    fontWeight: 'bold'
  },
  checkboxHeaderCell: {
    width: 300
  },
  blackIcon: {
    marginLeft: 4,
    marginRight: 4,
    color: COLORS.black
  },
  redIcon: {
    marginLeft: 4,
    marginRight: 4,
    color: COLORS.red
  },
  yellowIcon: {
    marginLeft: 4,
    marginRight: 4,
    color: COLORS.yellow
  },
  cancelButtonStyle: {
    paddingLeft: 30,
    paddingRight: 30
  },
  confirmButtonStyle: {
    paddingLeft: 30,
    paddingRight: 30
  }
};
export default UserListTable;
