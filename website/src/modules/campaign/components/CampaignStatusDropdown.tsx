import { inject, observer } from 'mobx-react';
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DropdownMenu } from 'components/common';
import { campaignStatusValueEnum } from '../CampaignModel';

interface ICampaignStatusDropdown extends RouteComponentProps<any> {
  campaignStatus?: campaignStatusValueEnum;
  onSelected: (status: campaignStatusValueEnum) => void;
}

@inject('authStore', 'appStore')
@observer
class CampaignStatusDropdown extends React.Component<ICampaignStatusDropdown> {
  public state = { anchorEl: null, open: false };
  public render() {
    const { campaignStatus } = this.props;
    return (
      <DropdownMenu
        label={campaignStatus || 'เลือกสถานะ'}
        menuItems={this.renduerMenuItems()}
      />
    );
  }

  private renduerMenuItems = () => {
    const { onSelected } = this.props;
    return Object.keys(campaignStatusValueEnum).map((key: any) => {
      return {
        //@ts-ignore
        label: campaignStatusValueEnum[key],
        //@ts-ignore
        onClick: () => onSelected(campaignStatusValueEnum[key])
      };
    });
  };
}
const styles: any = {
  container: {
    paddingRight: '4em',
    height: '100%'
  }
};
export default withRouter(CampaignStatusDropdown);
