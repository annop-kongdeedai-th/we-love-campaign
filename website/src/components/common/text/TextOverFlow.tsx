import * as React from 'react';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';

interface ITextOverFlow extends TypographyProps {
  numberOfLines?: number;
  style?: any;
}

const lineHeight = 15;

class TextOverFlow extends React.Component<ITextOverFlow> {
  public static defaultProps = {};
  public render() {
    const { numberOfLines, children, style, ...rest } = this.props;
    return (
      <div
        style={{
          maxHeight: lineHeight * (numberOfLines || 1),
          ...styles.textStyle,
          ...style
        }}>
        <Typography {...rest}>{children}</Typography>
      </div>
    );
  }
}
const styles = {
  textStyle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: lineHeight
  }
};
export default TextOverFlow;
