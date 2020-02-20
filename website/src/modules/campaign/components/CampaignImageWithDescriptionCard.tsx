import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { ICampaignModel } from '../CampaignModel';
import { Grid } from 'components/common';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ICampaignImageWithDescriptionCard extends RouteComponentProps<any> {
  campaign: ICampaignModel;
}

@inject('appStore')
@observer
class CampaignImageWithDescriptionCard extends Component<
  ICampaignImageWithDescriptionCard
> {
  public render() {
    const { campaign, history } = this.props;
    return (
      <Paper
        onClick={() => history.push(`/campaign/${campaign.id}`)}
        style={styles.container}>
        <Grid container>
          <Grid container item computer={4} tablet={4} mobile={12}>
            <img src={campaign.image.file} style={styles.imageStyle} />
          </Grid>
          <Grid
            container
            item
            computer={8}
            tablet={8}
            mobile={12}
            spacing={1}
            style={styles.bodyContainerStyle}>
            <Grid container item width={12}>
              <Typography variant={'h6'} style={styles.campaignNameStyle}>
                {campaign.campaignName}
              </Typography>
            </Grid>
            <Grid container item width={12}>
              <Typography variant={'body1'} color={'textSecondary'}>
                {`โดย ${campaign.brand}`}
              </Typography>
            </Grid>
            <Grid container item width={12}>
              <Typography variant={'body2'}>
                <FaRegCalendarAlt style={styles.calendarIconStyle} />
                {campaign.periodTime}
              </Typography>
            </Grid>
            <Grid container item width={12}>
              <Typography>{campaign.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const styles: any = {
  container: {
    width: '100%',
    cursor: 'pointer'
  },
  imageStyle: {
    width: '100%',
    height: 200
  },
  viewAllButtonStyle: {
    height: 'fit-content'
  },
  viewAllTextStyle: {
    fontWeight: 'bold',
    marginRight: 8
  },
  campaignNameStyle: {
    fontWeight: 'bold'
  },
  calendarIconStyle: {
    marginRight: 4
  },
  bodyContainerStyle: {
    padding: 14
  }
};
export default withRouter(CampaignImageWithDescriptionCard);
