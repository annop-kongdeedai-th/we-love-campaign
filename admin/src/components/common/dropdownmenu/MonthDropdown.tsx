import { inject, observer } from 'mobx-react';
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DropdownMenu } from '.';
import { MONTHS } from '../../../constants';

interface IMonthDropdown extends RouteComponentProps<any> {
  monthIndex?: number;
  onSelected: (month: string, monthIndex: number) => void;
}

@inject('authStore', 'appStore')
@observer
class MonthDropdown extends React.Component<IMonthDropdown> {
  public state = { anchorEl: null, open: false };
  public render() {
    const { monthIndex } = this.props;
    return (
      <DropdownMenu
        label={monthIndex ? MONTHS[monthIndex - 1] : 'เลือกเดือน'}
        menuItems={this.renduerMenuItems()}
      />
    );
  }

  private renduerMenuItems = () => {
    const { onSelected } = this.props;
    return MONTHS.map((month: string, index: number) => {
      return { label: month, onClick: () => onSelected(month, index + 1) };
    });
  };
}
const styles: any = {
  container: {
    paddingRight: '4em',
    height: '100%'
  }
};
export default withRouter(MonthDropdown);
