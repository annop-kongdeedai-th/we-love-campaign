import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IAuthModel } from 'modules/auth';
import { COLORS } from '../../constants';
import { Grid } from 'components/common';
import { IAppModel } from 'AppModel';
import PageContainer from 'pages/layouts/partials/PageContainer';
import { ICampaignModel, CampaignModel } from 'modules/campaign/CampaignModel';
import { AdminCampaignBody } from 'modules/campaign/components';

interface IAdminCampaignCreatePage extends RouteComponentProps<any> {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject('appStore', 'authStore')
@observer
class AdminCampaignCreatePage extends Component<IAdminCampaignCreatePage> {
  private campaign: ICampaignModel = CampaignModel.create({});

  async componentDidMount() {
    const { match, appStore } = this.props;
    try {
      appStore!.setLoading(true);
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  }

  public render() {
    const { appStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.whiteGreyBlack}>
        <Grid container style={styles.container} spacing={3} justify={'center'}>
          <Grid item container justify={'center'}>
            <AdminCampaignBody campaign={this.campaign} createMode />
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
export default AdminCampaignCreatePage;
