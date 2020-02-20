import * as React from 'react';
import { Typography } from '@material-ui/core';
import { COLORS } from '../../../constants';
import withWidth from '@material-ui/core/withWidth';
import {
  AreaChart as BaseAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { FaUserAlt } from 'react-icons/fa';
import { withRouter, RouteComponentProps } from 'react-router';
import { isOnAdminMode } from 'utils/routes-helper';

interface IChartData {
  name: string;
  value: number;
}

export interface IAreaChart extends RouteComponentProps {
  height: number | string;
  mobileHeight?: number;
  data: IChartData[];
  hideGrid?: boolean;
  width?: Breakpoint;
  style?: any;
}

class AreaChart extends React.Component<IAreaChart> {
  public render() {
    const {
      hideGrid,
      data,
      height,
      mobileHeight,
      width,
      location
    } = this.props;
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active) {
        return (
          <div style={styles.tooltip}>
            <Typography style={styles.tooltipLabel}>
              {payload[0].value} <FaUserAlt style={styles.tooltipIcon} />
            </Typography>
          </div>
        );
      }

      return null;
    };

    return (
      <ResponsiveContainer
        width={'100%'}
        height={width === 'xs' ? mobileHeight || 400 : height}>
        <BaseAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          style={styles.container}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="5%"
                stopColor={
                  isOnAdminMode(location.pathname)
                    ? '#939eab'
                    : COLORS.lightBlue
                }
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={
                  isOnAdminMode(location.pathname)
                    ? '#3e3e3e'
                    : COLORS.lightBlue
                }
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin', 'dataMax + 50']} dataKey="value" />
          {hideGrid ? null : (
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={COLORS.grey}
            />
          )}
          <Tooltip
            cursor={{
              scatter: 'red',
              scatterWidth: 2
            }}
            content={<CustomTooltip />}
            itemStyle={{ color: 'red', backgroundColor: 'red' }}
          />

          <Area
            type="natural"
            dataKey="value"
            stroke="white"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </BaseAreaChart>
      </ResponsiveContainer>
    );
  }
}

const styles: any = {
  container: {
    fontFamily: '"NotoSansThaiUI-Medium", "NotoSans-Medium", sans-serif'
  },
  tooltip: {
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.white,
    backgroundColor: COLORS.darkGrey,
    padding: 5
  },
  tooltipIcon: {
    marginLeft: 2
  },
  tooltipLabel: {
    verticalAlign: 'middle'
  }
};

export default withWidth()(withRouter(AreaChart));
