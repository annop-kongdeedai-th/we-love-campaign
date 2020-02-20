import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { COLORS } from '../../../constants';
import { Grid } from 'components/common';
import { IAppModel } from 'AppModel';
import { ICampaignModel } from '../CampaignModel';
import { AdminCampaignBodyViewMode, AdminCampaignBodyEditMode } from '.';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IAdminCampaignBody extends RouteComponentProps<any> {
  campaign: ICampaignModel;
  editMode?: boolean;
  createMode?: boolean;
  appStore?: IAppModel;
}

@inject('appStore', 'appStore')
@observer
class AdminCampaignBody extends Component<IAdminCampaignBody> {
  public render() {
    const { campaign, createMode, editMode } = this.props;
    return (
      <Grid container item computer={4} tablet={8} mobile={12}>
        <Grid item container width={12}>
          {createMode || editMode ? (
            <AdminCampaignBodyEditMode
              campaign={campaign}
              onClickCancel={this.onClickCancel}
              onEditCampaignDetail={
                createMode ? this.onCreateCampaign : this.onEditCampaignDetail
              }
            />
          ) : (
            <AdminCampaignBodyViewMode
              campaign={campaign}
              onClickEdit={this.onClickEdit}
            />
          )}
        </Grid>
      </Grid>
    );
  }

  private onClickEdit = () => {
    const { campaign, history } = this.props;
    history.push(`/admin-campaign/${campaign.id}/edit`);
  };

  private onEditCampaignDetail = async (edittingCampaign: ICampaignModel) => {
    const { campaign, history, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      campaign.setAllField(edittingCampaign.campaigntoJSON);
      await campaign.updateCampaign();
      history.push(`/admin-campaign/${edittingCampaign.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onCreateCampaign = async (edittingCampaign: ICampaignModel) => {
    const { campaign, history, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      campaign.setAllField(edittingCampaign.campaigntoJSON);
      const result = await campaign.createCampaign();
      history.push(`/admin-campaign/${result.data.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onClickCancel = () => {
    const { campaign, history } = this.props;
    history.push(`/admin-campaign/${campaign.id}`);
  };
}
const styles: any = {
  container: {
    backgroundColor: COLORS.white
  }
};
export default withRouter(AdminCampaignBody);
