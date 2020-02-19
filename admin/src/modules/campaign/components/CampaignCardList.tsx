import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { COLORS, IMAGES } from '../../../constants';
import {
  CampaignCard,
  CampaignImageWithDescriptionCard
} from 'modules/campaign/components';
import {
  ICampaignModel,
  campaignStatusValueEnum
} from 'modules/campaign/CampaignModel';
import { Grid } from 'components/common';
import { Typography, CircularProgress } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router';
import { isOnAdminMode } from 'utils/routes-helper';
import { campaignListViewModeType } from 'pages/campaign/CampaignPage';

interface ICampaignCardList extends RouteComponentProps<any> {
  campaigns: ICampaignModel[];
  campaignListViewMode: campaignListViewModeType;
  loading: boolean;
  editMode?: boolean;
}

@inject('appStore')
@observer
class CampaignCardList extends Component<ICampaignCardList> {
  state = {
    campaignsFilterStatus: campaignStatusValueEnum.all as campaignStatusValueEnum
  };

  public render() {
    const { campaigns, loading, location, campaignListViewMode } = this.props;
    const campaignsFilterByStatus =
      this.state.campaignsFilterStatus === campaignStatusValueEnum.all
        ? campaigns
        : campaigns.filter(
            (campaign: ICampaignModel) =>
              campaign.status === this.state.campaignsFilterStatus
          );

    return (
      <Grid container spacing={3}>
        {loading ? (
          <Grid container item width={12} justify={'center'}>
            <CircularProgress
              style={{
                color: isOnAdminMode(location.pathname)
                  ? COLORS.black
                  : COLORS.lightBlue
              }}
            />
          </Grid>
        ) : campaignsFilterByStatus.length > 0 ? (
          campaignsFilterByStatus.map((campaign: ICampaignModel, index) => {
            return (
              <Grid
                item
                container
                computer={campaignListViewMode === 'group' ? 3 : 12}
                tablet={12}
                mobile={12}
                key={index}>
                {campaignListViewMode === 'group' ? (
                  <CampaignCard campaign={campaign} />
                ) : (
                  <CampaignImageWithDescriptionCard campaign={campaign} />
                )}
              </Grid>
            );
          })
        ) : (
          this.renderEmptyCampaign()
        )}
      </Grid>
    );
  }

  private renderEmptyCampaign = () => {
    return (
      <div style={styles.emptyContainerStyle}>
        <img src={IMAGES.pencilEmpty} />
        <Typography style={styles.emptyCampaignText}>ยังไม่มีแคมเปญ</Typography>
      </div>
    );
  };
}
const styles: any = {
  emptyContainerStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80
  },
  emptyCampaignText: {
    marginTop: 30,
    color: COLORS.lightGrey
  }
};
export default withRouter(CampaignCardList);
