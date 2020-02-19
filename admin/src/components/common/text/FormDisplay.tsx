import * as React from 'react';
import { COLORS } from '../../../constants';
import { Typography } from '@material-ui/core';

interface IFormDisplay {
  title: string;
  value: string | number;
  style?: any;
}
class FormDisplay extends React.Component<IFormDisplay> {
  public static defaultProps = {};
  public render() {
    const { title, value, style } = this.props;

    return (
      <div style={style}>
        <Typography variant={'body1'} style={styles.titleStyle}>
          {title}
        </Typography>
        <Typography variant={'body1'}>{value || '-'}</Typography>
      </div>
    );
  }
}
const styles = {
  titleStyle: { fontWeight: 200, color: COLORS.lightGrey }
};
export default FormDisplay;
