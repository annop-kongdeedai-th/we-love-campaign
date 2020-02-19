import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Typography,
  Avatar,
  TextField,
  InputAdornment
} from '@material-ui/core';
import {
  FormDisplayChildren,
  GoogleMapModal,
  Grid,
  TextButton
} from 'components/common';
import { IUserModel } from '../UserModel';
import { FaChevronRight } from 'react-icons/fa';

interface IUserDetailBodyEditMode {
  user: IUserModel;
  onClickCancel: () => void;
  onEditUserDetail: (edittingUser: IUserModel) => void;
  createMode?: boolean;
}

@inject('appStore')
@observer
class UserDetailBodyEditMode extends Component<IUserDetailBodyEditMode> {
  public render() {
    const { user, createMode, onClickCancel, onEditUserDetail } = this.props;
    return (
      <Grid container style={styles.container}>
        <Grid item>
          <TextField
            id="standard-number"
            fullWidth
            label="ชื่อผู้ใช้งาน"
            placeholder="กรุณากรอกชื่อผู้ใช้งาน"
            value={user.firstnameAndLastname}
            onChange={(e: any) => this.onChangeText(e, 'firstnameAndLastname')}
            InputLabelProps={{
              shrink: true
            }}
            style={styles.textFieldStyle}
          />
          <TextField
            id="standard-number"
            fullWidth
            label="อีเมลล์"
            placeholder="กรุณากรอกอีเมลล์"
            value={user.email}
            onChange={(e: any) => this.onChangeText(e, 'email')}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              readOnly: createMode ? false : true
            }}
            style={styles.textFieldStyle}
          />
          {createMode ? (
            <TextField
              id="standard-number"
              fullWidth
              label="รหัสผ่าน"
              placeholder="กรุณากรอกรหัสผ่าน"
              type={'password'}
              value={user.password}
              onChange={(e: any) => this.onChangeText(e, 'password')}
              InputLabelProps={{
                shrink: true
              }}
              style={styles.textFieldStyle}
            />
          ) : null}
          <TextField
            id="standard-number"
            fullWidth
            label="เบอร์โทรศัพท์ติดต่อ"
            placeholder="กรุณากรอกเบอร์โทรศัพท์ติดต่อ"
            value={user.phoneNumber}
            onChange={(e: any) => this.onChangeText(e, 'phoneNumber')}
            InputLabelProps={{
              shrink: true
            }}
            style={styles.textFieldStyle}
          />
          <GoogleMapModal
            address={user.address}
            trigger={
              <TextField
                id="standard-number"
                fullWidth
                label="ที่อยู่"
                placeholder="กรุณาเลือกที่อยู่"
                value={user.address.fullAdress}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <FaChevronRight />
                    </InputAdornment>
                  )
                }}
                onClick={() => console.log('')}
                style={styles.textFieldStyle}
              />
            }
          />
        </Grid>
        <Grid
          item
          container
          justify={'space-around'}
          spacing={2}
          style={styles.footerButtonRow}>
          <Grid item computer={6} tablet={6} mobile={12}>
            <TextButton fluid variant="contained" onClick={onClickCancel}>
              ยกเลิก
            </TextButton>
          </Grid>
          <Grid item computer={6} tablet={6} mobile={12}>
            <TextButton
              shade={'admin'}
              fluid
              variant="contained"
              onClick={() => onEditUserDetail(user)}>
              บันทึก
            </TextButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private onChangeText = (e: any, fieldName: string) => {
    const { user } = this.props;
    user.setField({ fieldName: fieldName, value: e.target.value });
  };
}
const styles: any = {
  container: {
    marginTop: 40
  },
  textFieldStyle: {
    marginTop: 28,
    marginBottom: 28
  },
  avartarStyle: {
    width: 100,
    height: 100,
    marginBottom: 14
  },
  footerButtonRow: {
    marginTop: 24
  },
  formDisplayStyle: {
    marginTop: 28,
    marginBottom: 28
  }
};
export default UserDetailBodyEditMode;
