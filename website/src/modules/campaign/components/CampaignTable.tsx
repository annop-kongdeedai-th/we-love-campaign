import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableHead
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { COLORS } from '../../../constants';
import { ConfirmDialog, TextButton } from 'components/common';
import { Table } from 'components/common/table';
import { IAppModel } from 'AppModel';
import { ICampaignListModel } from '../CampaignListModel';
import { ICampaignModel } from '../CampaignModel';
import {
  DeleteOutlineOutlined,
  VisibilityOutlined,
  EditOutlined
} from '@material-ui/icons';

interface ICampaignTable {
  campaignListStore: ICampaignListModel;
  loading: boolean;
  appStore?: IAppModel;
}

@observer
@inject('appStore')
class CampaignTable extends React.Component<ICampaignTable> {
  public state = {
    selectedCampaignList: [] as number[]
  };

  public render() {
    const { campaignListStore, loading } = this.props;
    return (
      <React.Fragment>
        <Table
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
          paginate={campaignListStore.paginate}
          onPageChange={campaignListStore.getCampaignList}
          dataLength={campaignListStore.list.length}
          loading={loading}>
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </Table>
      </React.Fragment>
    );
  }

  private renderTableHeader = () => {
    return (
      <TableHead style={styles.tableHead}>
        <TableRow>
          <TableCell>
            <Checkbox onChange={this.onSelectedAllRegistrations} />
          </TableCell>
          <TableCell style={styles.headerCell}>แคมเปญ</TableCell>
          <TableCell style={styles.headerCell}>เจ้าของแคมเปญ</TableCell>
          <TableCell style={styles.headerCell}>ระยะเวลา</TableCell>
          <TableCell style={styles.headerCell}>สถานะ</TableCell>
          <TableCell
            style={{ ...styles.checkboxHeaderCell, ...styles.headerCell }}>
            {this.state.selectedCampaignList.length > 0 ? (
              <ConfirmDialog
                title={'ต้องการลบแคมเปญทั้งหมดหรือไม่?'}
                onClickConfirm={this.deleteAllCampaign}
                trigger={
                  <TextButton
                    shade={'admin'}
                    variant="contained"
                    fluid
                    style={styles.acceptButtonStyle}>
                    ลบแคมเปญทั้งหมดที่เลือก
                  </TextButton>
                }
              />
            ) : null}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  private renderTableBody = () => {
    const { campaignListStore } = this.props;
    return (
      <TableBody>
        {campaignListStore.list.map(
          (campaign: ICampaignModel, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={
                    campaign.id
                      ? this.state.selectedCampaignList.includes(campaign.id)
                      : false
                  }
                  onChange={(e: any) => this.onSelectedCampaign(e, campaign.id)}
                />
              </TableCell>
              <TableCell>{campaign.campaignName}</TableCell>
              <TableCell>{campaign.brand}</TableCell>
              <TableCell>{campaign.periodTime}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell align="right">
                <Link to={`/admin-campaign/${campaign.id}`}>
                  <VisibilityOutlined style={styles.blackIcon} />
                </Link>
                <Link to={`/admin-campaign/${campaign.id}/edit`}>
                  <EditOutlined style={styles.blackIcon} />
                </Link>
                <ConfirmDialog
                  title={'ต้องการยอมรับคำขอลงทะเบียนนี้หรือไม่?'}
                  onClickConfirm={() => this.onDeleteCampaign(campaign)}
                  trigger={
                    <Link to={'#'}>
                      <DeleteOutlineOutlined style={styles.redIcon} />
                    </Link>
                  }
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    );
  };

  private onSelectedAllRegistrations = (e: any) => {
    const { campaignListStore } = this.props;
    const checked = e.target.checked;
    if (checked) {
      campaignListStore.list.forEach((campaign: ICampaignModel) => {
        if (campaign.id) {
          this.setState((prevState: any) => ({
            selectedCampaignList: [
              ...prevState.selectedCampaignList,
              campaign.id
            ]
          }));
        }
      });
    } else {
      this.resetSelectedCampaignList();
    }
  };

  private onSelectedCampaign = (e: any, campaignId: number | undefined) => {
    const checked = e.target.checked;
    if (campaignId) {
      if (checked) {
        this.setState((prevState: any) => ({
          selectedCampaignList: [...prevState.selectedCampaignList, campaignId]
        }));
      } else {
        this.setState({
          selectedCampaignList: this.state.selectedCampaignList.filter(
            (id: number) => {
              return id !== campaignId;
            }
          )
        });
      }
    }
  };

  private deleteAllCampaign = async () => {
    const { campaignListStore, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await campaignListStore.deleteAllCampaign(
        this.state.selectedCampaignList
      );
      await campaignListStore.getCampaignList();
      this.resetSelectedCampaignList();
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private onDeleteCampaign = async (campaign: ICampaignModel) => {
    const { campaignListStore, appStore } = this.props;
    try {
      appStore!.setLoading(true);
      await campaign.deleteCampaign();
      await campaignListStore.getCampaignList();
    } catch (e) {
      console.log(e);
    } finally {
      appStore!.setLoading(false);
    }
  };

  private resetSelectedCampaignList = () => {
    this.setState({ selectedCampaignList: [] });
  };
}

const styles: any = {
  containerStyle: { paddingLeft: 3 },
  tableHead: {
    backgroundColor: COLORS.whiteGreyBlack
  },
  headerCell: {
    fontWeight: 'bold'
  },
  checkboxHeaderCell: {
    width: 300
  },
  blackIcon: {
    marginLeft: 4,
    marginRight: 4,
    color: COLORS.black
  },
  redIcon: {
    marginLeft: 4,
    marginRight: 4,
    color: COLORS.red
  }
};
export default CampaignTable;
