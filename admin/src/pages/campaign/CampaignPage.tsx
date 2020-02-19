import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IAuthModel } from 'modules/auth';
import {
  CampaignCardList,
  CampaignFilterHeader
} from 'modules/campaign/components';
import { COLORS } from '../../constants';
import { Grid } from 'components/common';
import { IAppModel } from 'AppModel';
import {
  ICampaignListModel,
  CampaignListModel
} from 'modules/campaign/CampaignListModel';
import PageContainer from 'pages/layouts/partials/PageContainer';
import { campaignStatusValueEnum } from 'modules/campaign/CampaignModel';
import { Pagination } from '@material-ui/lab';

interface ICampaignPage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

export type campaignListViewModeType = 'group' | 'row';

@inject('appStore', 'authStore')
@observer
class CampaignPage extends Component<ICampaignPage> {
  private campaignListStore: ICampaignListModel = CampaignListModel.create({});

  state = {
    campaignListViewMode: 'group' as campaignListViewModeType,
    loading: false
  };

  async componentDidMount() {
    const { appStore } = this.props;
    try {
      await this.setLoading(true);
      await this.campaignListStore.getCampaignList(undefined);
    } catch (e) {
      console.log(e);
    } finally {
      await this.setLoading(false);
    }
  }

  public render() {
    const { authStore, appStore } = this.props;
    return (
      <PageContainer backgroundColor={COLORS.white}>
        <Grid container style={styles.container} spacing={3} justify={'center'}>
          <Grid container item computer={8} tablet={8} mobile={12} spacing={1}>
            <Grid item container width={12}>
              <CampaignFilterHeader
                title={'แคมเปญ'}
                dataCount={this.campaignListStore.paginate.xTotalCount}
                campaignsFilterStatus={campaignStatusValueEnum.all}
                onSelectedCampaignsFilterStatus={
                  this.onSelectedCampaignsFilterStatus
                }
                campaignListViewMode={this.state.campaignListViewMode}
                onSelectedCampaignListViewMode={(
                  mode: campaignListViewModeType
                ) => this.setState({ campaignListViewMode: mode })}
              />
            </Grid>
            <Grid item width={12}>
              <CampaignCardList
                campaigns={this.campaignListStore.list}
                campaignListViewMode={this.state.campaignListViewMode}
                loading={this.state.loading}
              />
            </Grid>
            <Grid container justify={'flex-end'} item width={12}>
              <Pagination
                count={this.campaignListStore.paginate.totalPage}
                page={this.campaignListStore.paginate._page}
                onChange={this.onChangePaginate}
                variant="outlined"
                shape="rounded"
              />
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    );
  }

  private setLoading = (loading: boolean) => {
    this.setState({ loading: loading });
  };

  private onChangePaginate = async (event: any, value: number) => {
    try {
      this.setLoading(true);
      this.campaignListStore.paginate.setPage(value);
      await this.campaignListStore.getCampaignList();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  private onSelectedCampaignsFilterStatus = async (
    status: campaignStatusValueEnum
  ) => {
    try {
      this.setLoading(true);
      await this.campaignListStore.onSelectedCampaignsFilterStatus(status);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };
}
const styles: any = {
  container: {
    //
  }
};
export default CampaignPage;
