import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Typography, Breadcrumbs } from '@material-ui/core';
import { COLORS } from '../../constants';
import {
  Grid,
  FormDisplay,
  FormDisplayChildren,
  GoogleMap
} from 'components/common';
import { IAppModel } from 'AppModel';
import { CampaignModel, ICampaignModel } from 'modules/campaign/CampaignModel';
import PageContainer from 'pages/layouts/partials/PageContainer';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface IAdsCampaignCreatePage extends RouteComponentProps<any> {
  appStore?: IAppModel;
}

@inject('appStore', 'authStore')
@observer
class AdsCampaignCreatePage extends Component<IAdsCampaignCreatePage> {
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
    const {} = this.props;
    return (
      <PageContainer backgroundColor={COLORS.whiteGreyBlack}>
        <Grid container style={styles.container} spacing={3} justify={'center'}>
          <Grid container item computer={5} tablet={8} mobile={12}>
            <Grid container item width={12}>
              {this.renderBreadcrumbsSection()}
            </Grid>
            <Grid container style={styles.paperStyle}>
              <Grid item width={12}>
                <img src={this.campaign.image.file} style={styles.imageStyle} />
              </Grid>
              <Grid container spacing={2} style={styles.bodyContainerStyle}>
                <Grid item width={12}>
                  <Typography variant={'h4'}>
                    {this.campaign.campaignName}
                  </Typography>
                  <Typography
                    variant={'body1'}
                    color={
                      'textSecondary'
                    }>{`โดย ${this.campaign.brand}`}</Typography>
                  <Typography variant={'body1'} color={'textSecondary'}>
                    {this.campaign.shortDescription}
                  </Typography>
                </Grid>
                <Grid item width={12}>
                  <FormDisplay title={'สถานะ'} value={this.campaign.status} />
                </Grid>
                <Grid item width={12}>
                  <FormDisplayChildren
                    title={'ระยะเวลา'}
                    noPad
                    component={
                      <Typography variant={'body2'}>
                        <FaRegCalendarAlt style={styles.calendarIconStyle} />
                        {this.campaign.periodTime}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item width={12}>
                  <FormDisplay
                    title={'รายละเอียด'}
                    value={this.campaign.description}
                  />
                </Grid>
                <Grid item width={12}>
                  <FormDisplayChildren
                    title={'สถานที่จัดแคมเปญ'}
                    component={
                      <GoogleMap
                        mapHeight={300}
                        address={this.campaign.address}
                      />
                    }
                    style={styles.formDisplayStyle}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    );
  }

  private renderBreadcrumbsSection = () => {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <Typography color="textSecondary">แคมเปญทั้งหมด</Typography>
        </Link>
        <Typography color="textPrimary">
          {this.campaign.campaignName}
        </Typography>
      </Breadcrumbs>
    );
  };
}

const styles: any = {
  paperStyle: {
    marginTop: 14,
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.lightGreyShade2}`
  },
  bodyContainerStyle: {
    padding: 18
  },
  imageStyle: {
    width: '100%'
  },
  calendarIconStyle: {
    marginRight: 4
  }
};
export default AdsCampaignCreatePage;
