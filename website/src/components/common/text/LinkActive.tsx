import * as React from 'react';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { COLORS } from '../../../constants';
import { withRouter, RouteComponentProps } from 'react-router';
import { isOnAdminMode } from 'utils/routes-helper';

interface ILinkActive extends TypographyProps, RouteComponentProps<any> {
  active?: boolean;
  padded?: 'left' | 'right' | 'horizontal';
  style?: any;
}

class LinkActive extends React.Component<ILinkActive> {
  public static defaultProps = {};
  public render() {
    const {
      active,
      padded,
      children,
      location,
      history,
      match,
      staticContext,
      style,
      ...rest
    } = this.props;
    return (
      <Typography
        component={'span'}
        {...rest}
        style={{ ...this.getStyle(), ...style }}>
        {children}
      </Typography>
    );
  }

  private getStyle = () => {
    const { active, padded, location } = this.props;
    const styles: any = {};

    styles.cursor = 'pointer';

    if (active !== undefined) {
      if (active) {
        styles.color = isOnAdminMode(location.pathname)
          ? COLORS.black
          : COLORS.lightBlue;
      } else {
        styles.color = COLORS.lightGrey;
      }
    } else {
      styles.color = COLORS.lightGrey;
    }

    if (padded) {
      if (padded === 'left') {
        styles.marginLeft = 14;
      } else if (padded === 'right') {
        styles.marginRight = 14;
      } else if (padded === 'horizontal') {
        styles.marginLeft = 14;
        styles.marginRight = 14;
      }
    }
    return styles;
  };
}

export default withRouter(LinkActive);
