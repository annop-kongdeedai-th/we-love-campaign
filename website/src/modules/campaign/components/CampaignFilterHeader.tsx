import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Divider } from '@material-ui/core';
import { DropdownMenu, Grid } from 'components/common';
import { campaignStatusValueEnum } from '../CampaignModel';
import { FaThLarge, FaThList } from 'react-icons/fa';
import { campaignListViewModeType } from 'pages/campaign/CampaignPage';
import { COLORS } from '../../../constants';

interface ICampaignFilterHeader {
  title?: string;
  titleIcon?: any;
  dataCount?: number;
  campaignsFilterStatus: campaignStatusValueEnum;
  onSelectedCampaignsFilterStatus: (status: campaignStatusValueEnum) => void;
  campaignListViewMode: campaignListViewModeType;
  onSelectedCampaignListViewMode: (mode: campaignListViewModeType) => void;
}

@observer
class CampaignFilterHeader extends Component<ICampaignFilterHeader> {
  public render() {
    const {
      title,
      titleIcon,
      dataCount,
      campaignsFilterStatus,
      onSelectedCampaignsFilterStatus,
      campaignListViewMode,
      onSelectedCampaignListViewMode
    } = this.props;
    return (
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        style={styles.tableHeader}>
        {title || titleIcon ? (
          <Grid
            container
            item
            alignItems={'center'}
            computer={6}
            tablet={6}
            mobile={12}>
            {titleIcon ? (
              <div style={styles.personOutlineIconStyle}>{titleIcon}</div>
            ) : null}
            <span>{`${title} (${dataCount})`}</span>
          </Grid>
        ) : null}

        <Grid
          container
          item
          justify={'flex-end'}
          alignItems={'flex-end'}
          computer={6}
          tablet={6}
          mobile={12}
          spacing={1}>
          <Grid item>
            <DropdownMenu
              label={`ตัวกรอง: ${campaignsFilterStatus || 'ทั้งหมด'}`}
              menuItems={[
                {
                  label: 'ทั้งหมด',
                  onClick: () =>
                    onSelectedCampaignsFilterStatus(campaignStatusValueEnum.all)
                },
                {
                  label: campaignStatusValueEnum.inProgress,
                  onClick: () =>
                    onSelectedCampaignsFilterStatus(
                      campaignStatusValueEnum.inProgress
                    )
                },
                {
                  label: campaignStatusValueEnum.end,
                  onClick: () =>
                    onSelectedCampaignsFilterStatus(campaignStatusValueEnum.end)
                },
                {
                  label: campaignStatusValueEnum.cancelled,
                  onClick: () =>
                    onSelectedCampaignsFilterStatus(
                      campaignStatusValueEnum.cancelled
                    )
                },
                {
                  label: campaignStatusValueEnum.suspended,
                  onClick: () =>
                    onSelectedCampaignsFilterStatus(
                      campaignStatusValueEnum.suspended
                    )
                }
              ]}
            />
          </Grid>
          <Grid item>
            <FaThLarge
              size={25}
              color={
                campaignListViewMode === 'group'
                  ? COLORS.black
                  : COLORS.lightGrey
              }
              onClick={() => onSelectedCampaignListViewMode('group')}
              style={styles.iconStyle}
            />
          </Grid>
          <Grid item>
            <FaThList
              size={25}
              color={
                campaignListViewMode === 'row' ? COLORS.black : COLORS.lightGrey
              }
              onClick={() => onSelectedCampaignListViewMode('row')}
              style={styles.iconStyle}
            />
          </Grid>
        </Grid>

        <Grid item width={12}>
          <Divider style={styles.dividerStyle} />
        </Grid>
      </Grid>
    );
  }
}

const styles: any = {
  personOutlineIconStyle: {
    width: 30,
    height: 30,
    paddingRight: 8
  },
  tableHeader: {
    paddingTop: 14,
    paddingBottom: 14
  },
  dividerStyle: {
    marginTop: 8
  },
  iconStyle: {
    cursor: 'pointer',
    paddingBottom: 4
  }
};
export default CampaignFilterHeader;
