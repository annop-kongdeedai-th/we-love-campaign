import * as React from 'react';
import { Grid as BaseGrid } from '@material-ui/core';
import { GridProps, GridSize } from '@material-ui/core/Grid';

interface IBreakPoint {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}

interface IGrid extends GridProps {
  computer?: GridSize;
  tablet?: GridSize;
  mobile?: GridSize;
  width?: GridSize;
}
class Grid extends React.Component<IGrid> {
  public render() {
    const { children, ...rest } = this.props;
    const gridSize = this.gridSize();
    return (
      <BaseGrid {...gridSize} {...rest}>
        {children}
      </BaseGrid>
    );
  }

  private gridSize = () => {
    const { width, computer, tablet, mobile } = this.props;
    const breakPoint: IBreakPoint = {};
    if (width) {
      breakPoint.xs = width;
      breakPoint.sm = width;
      breakPoint.md = width;
      breakPoint.lg = width;
      breakPoint.xl = width;
    } else {
      if (computer) {
        breakPoint.lg = computer;
        breakPoint.xl = computer;
      }
      if (tablet) {
        breakPoint.sm = tablet;
        breakPoint.md = tablet;
      }
      if (mobile) {
        breakPoint.xs = mobile;
      }
    }
    return breakPoint;
  };
}

export default Grid;
