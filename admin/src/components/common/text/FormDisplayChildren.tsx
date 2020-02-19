import * as React from 'react';
import { COLORS } from '../../../constants';
import { Typography } from '@material-ui/core';

interface IFormDisplayChildren {
  title: string;
  noPad?: boolean;
  showUnderline?: boolean;
  component: any;
  style?: any;
}
class FormDisplayChildren extends React.Component<IFormDisplayChildren> {
  public static defaultProps = {};
  public render() {
    const { title, noPad, showUnderline, component, style } = this.props;

    return (
      <div style={{ ...style }}>
        <Typography variant={'body1'} style={styles.titleStyle}>
          {title}
        </Typography>
        <div
          style={{
            ...styles.componentStyle,
            paddingTop: noPad ? 2 : 14,
            borderBottom: showUnderline
              ? `1px solid ${COLORS.lightGrey}`
              : 'none',
            paddingBottom: showUnderline ? 10 : 0
          }}>
          {component}
        </div>
      </div>
    );
  }
}
const styles = {
  titleStyle: { fontWeight: 200, color: COLORS.lightGrey },
  componentStyle: {
    // paddingTop: 14
  }
};
export default FormDisplayChildren;
