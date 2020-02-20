import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IAuthModel } from 'modules/auth';
import { COLORS } from '../../constants';
import { TableHeaderWithFilter, Grid } from 'components/common';
import PageContainer from 'pages/layouts/partials/PageContainer';
import { CampaignTable } from 'modules/campaign/components';
import {
  CampaignListModel,
  ICampaignListModel
} from 'modules/campaign/CampaignListModel';
import { MdEventNote } from 'react-icons/md';
import { Typography, Button } from '@material-ui/core';

interface IAdminCampaignPage extends RouteComponentProps {
  authStore?: IAuthModel;
}
@inject('appStore', 'authStore')
@observer
class AdminCampaignPage extends Component<IAdminCampaignPage> {
  private campaignListStore: ICampaignListModel = CampaignListModel.create({});

  async componentDidMount() {
    try {
      await this.campaignListStore.getCampaignList();
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    const { authStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.white}>
        <Grid container style={styles.container} spacing={3}>
          <Grid item container width={12} justify={'flex-end'}>
            <Link to={'/admin-campaign/create'}>
              <Button variant={'contained'} color={'primary'}>
                <Typography>สร้างแคมเปญ</Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item container width={12}>
            <TableHeaderWithFilter
              title={'แคมเปญทั้งหมด'}
              titleIcon={<MdEventNote />}
              dataCount={this.campaignListStore.paginate.xTotalCount}
              paginate={this.campaignListStore.paginate}
              sortedBy={this.campaignListStore.sortByText}
              onSelectedSortBy={this.campaignListStore.onSelectedSortBy}
              onGetData={this.campaignListStore.getCampaignList}
            />
            <CampaignTable
              campaignListStore={this.campaignListStore}
              loading={this.campaignListStore.loading}
            />
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
export default AdminCampaignPage;
