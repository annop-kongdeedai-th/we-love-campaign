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

interface IAdminCampaignDetailPage extends RouteComponentProps<any> {
  editMode?: boolean;
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject('appStore', 'authStore')
@observer
class AdminCampaignDetailPage extends Component<IAdminCampaignDetailPage> {
  private campaign: ICampaignModel = CampaignModel.create({});

  async componentDidMount() {
    const { match, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      const id = match.params.id;
      this.campaign.setField({ fieldName: 'id', value: +id });
      await this.campaign.getCampaignDetail();
      appStore!.setHeaderTitleLayout(this.campaign.campaignName);
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  }

  componentWillUnmount() {
    const { appStore } = this.props;
    appStore!.clearHeaderTitleLayout();
  }

  public render() {
    const { editMode, appStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.whiteGreyBlack}>
        <Grid container style={styles.container} spacing={3} justify={'center'}>
          <Grid item container justify={'center'}>
            <AdminCampaignBody campaign={this.campaign} editMode={editMode} />
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
export default AdminCampaignDetailPage;
