import * as React from 'react';
import { Grid } from '../grid';
import { LinkActive } from '../text';
import { DropdownMenu } from '../dropdownmenu';
import { AreaChart } from '.';
import { IAreaChart } from './AreaChart';
import { withRouter } from 'react-router';
import { Typography } from '@material-ui/core';

interface IAreaChartWithFilter extends IAreaChart {
  label?: string;
  labelDropdown?: string;
}
class AreaChartWithFilter extends React.Component<IAreaChartWithFilter> {
  public render() {
    const { label, labelDropdown, ...rest } = this.props;

    return (
      <Grid container spacing={1}>
        <Grid item width={12}>
          {this.renderHeader()}
        </Grid>
        <Grid item width={12}>
          <AreaChart {...rest} />
        </Grid>
      </Grid>
    );
  }

  private renderHeader = () => {
    const { label, labelDropdown } = this.props;
    return (
      <div style={styles.headerContainer}>
        <div>
          {label || labelDropdown ? (
            labelDropdown ? (
              <DropdownMenu
                label={labelDropdown}
                menuItems={[
                  {
                    label: 'จำนวนผู้ใช้งาน',
                    onClick: () => console.log('จำนวนผู้ใช้งาน')
                  },
                  {
                    label: 'จำนวนผู้ใช้งาน',
                    onClick: () => console.log('จำนวนผู้ใช้งาน')
                  }
                ]}
              />
            ) : (
              <Typography variant={'h6'}>{label}</Typography>
            )
          ) : null}
        </div>
        <div>
          <LinkActive active padded={'right'}>
            {'ปี'}
          </LinkActive>
          <LinkActive padded={'horizontal'}>{'เดือน'}</LinkActive>
          <LinkActive padded={'horizontal'}>{'อาทิตย์'}</LinkActive>
          <LinkActive padded={'left'}>{'วัน'}</LinkActive>
        </div>
      </div>
    );
  };
}

const styles: any = {
  gridContainerStyle: { height: '100%' },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14
  },
  filterTextStyle: {
    marginLeft: 14,
    marginRight: 14
  }
};

export default withRouter(AreaChartWithFilter);
