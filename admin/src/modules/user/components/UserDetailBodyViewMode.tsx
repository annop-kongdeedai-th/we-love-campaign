import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Typography, Avatar, Button } from '@material-ui/core';
import {
  FormDisplay,
  FormDisplayChildren,
  Grid,
  TextButton
} from 'components/common';
import { IUserModel } from '../UserModel';

interface IUserDetailBodyViewMode {
  user: IUserModel;
  onClickEdit: () => void;
}

@inject('appStore')
@observer
class UserDetailBodyViewMode extends Component<IUserDetailBodyViewMode> {
  public render() {
    const { user, onClickEdit } = this.props;
    return (
      <Grid container style={styles.container}>
        <Grid item>
          <FormDisplay
            title={'ชื่อผู้ใช้งาน'}
            value={user.firstnameAndLastname}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'อีเมลล์'}
            value={user.email}
            style={styles.formDisplayStyle}
          />

          <FormDisplay
            title={'เบอร์โทรศัพท์ติดต่อ'}
            value={user.phoneNumber}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'ที่อยู่'}
            value={user.address.fullAdress}
            style={styles.formDisplayStyle}
          />
        </Grid>

        <Grid item container style={styles.footerButtonRow}>
          <TextButton
            shade={'admin'}
            variant="contained"
            fluid
            onClick={onClickEdit}>
            แก้ไข
          </TextButton>
        </Grid>
      </Grid>
    );
  }
}
const styles: any = {
  container: {
    marginTop: 40
  },
  formDisplayStyle: {
    marginTop: 28,
    marginBottom: 28
  },
  avartarStyle: {
    width: 100,
    height: 100,
    marginBottom: 14
  },
  footerButtonRow: {
    paddingTop: 24,
    paddingBottom: 24
  }
};
export default UserDetailBodyViewMode;
