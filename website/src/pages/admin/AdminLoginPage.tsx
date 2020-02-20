import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { COLORS, IMAGES } from '../../constants';
import { TextField, Button, Link, Paper, Typography } from '@material-ui/core';
import { IAuthModel } from 'modules/auth';
import { Grid, TextButton } from 'components/common';
import { IAppModel } from 'AppModel';
import PageContainer from 'pages/layouts/partials/PageContainer';

interface IAdminLoginPage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}
@inject('appStore', 'authStore')
@observer
class AdminLoginPage extends Component<IAdminLoginPage> {
  public state = {
    step: 'LoginForm'
  };

  public render() {
    const { authStore, appStore } = this.props;
    return (
      <div style={styles.container}>
        <Paper style={styles.loginBox}>
          <Grid
            spacing={3}
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            // style={styles.loginBox}
          >
            <Grid item width={12} style={styles.itemCenter}>
              <Typography variant={'h5'} style={styles.logoTypographyStyle}>
                {'WE LOVE CAMPAIGN'}
              </Typography>
              <Typography variant={'h5'} style={styles.logoTypographyStyle}>
                {'MANAGEMENT'}
              </Typography>
            </Grid>
            <Grid item width={12}>
              <TextField
                id="standard-disabled"
                label="อีเมลล์"
                placeholder="อีเมลล์"
                value={authStore!.email}
                onChange={(e: any) =>
                  authStore!.setField('email', e.target.value)
                }
                margin="normal"
                required
                style={styles.textFieldStyle}
              />
            </Grid>
            <Grid item width={12}>
              <TextField
                id="standard-disabled"
                label="รหัสผ่าน"
                placeholder="รหัสผ่าน"
                type={'password'}
                value={authStore!.password}
                onChange={(e: any) =>
                  authStore!.setField('password', e.target.value)
                }
                margin="normal"
                required
                style={styles.textFieldStyle}
              />
            </Grid>
            <Grid item width={12} style={styles.itemCenter}>
              <TextButton
                shade={'admin'}
                variant="contained"
                onClick={this.onPressLogin}
                style={styles.signInButtonStyle}>
                เข้าสู่ระบบ
              </TextButton>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }

  public onChangeStep = (stepName: string) => {
    this.setState({
      step: stepName
    });
  };

  private onPressLogin = async () => {
    const { authStore, appStore, history } = this.props;
    try {
      appStore!.setLoading(true);
      if (authStore!.email && authStore!.password) {
        await authStore!.onSignIn();
        // navigation.navigate('CampaignList');
        history.push('/admin-campaign');
      } else {
        alert('Failed!');
        // appStore!.showToast('กรุณากรอกอีเมลล์หรือพาสเวิร์ดให้ครบ');
      }
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };
}
const styles: any = {
  container: {
    display: 'flex',
    flex: 1,
    height: '95vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${IMAGES.adminLoginBg})`,
    backgroundSize: 'cover',
    overflowY: 'auto'
  },
  loginBox: {
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 30,
    paddingBottom: 30,
    // backgroundColor: COLORS.red
    borderRadius: 5,
    width: 450
  },
  imageStyle: {
    width: 130
  },
  textFieldStyle: {
    width: '100%'
  },
  itemCenter: {
    textAlign: 'center'
  },
  signInButtonStyle: {
    paddingLeft: 70,
    paddingRight: 70
  },
  logoTypographyStyle: {
    fontWeight: 'bold'
  }
};
export default AdminLoginPage;
