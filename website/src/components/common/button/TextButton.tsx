import * as React from 'react';
import { Button as BaseButton } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { COLORS } from '../../../constants';
import { isOnAdminMode } from 'utils/routes-helper';
import { withRouter, RouteComponentProps } from 'react-router';

interface ITextButton extends ButtonProps, RouteComponentProps<any> {
  shade?: 'admin' | 'ads';
  autoShade?: boolean;
  textColor?: string;
  backgroundColor?: string;
  bordered?: boolean;
  invert?: boolean;
  fluid?: boolean;
  style?: any;
}

class TextButton extends React.Component<ITextButton> {
  public static defaultProps = {};
  public render() {
    const {
      shade,
      autoShade,
      textColor,
      backgroundColor,
      bordered,
      invert,
      fluid,
      style,
      location,
      children,
      staticContext,
      ...rest
    } = this.props;
    const buttonStyles = this.getTextButtonStyle();
    return (
      <BaseButton
        style={{ ...styles.container, ...buttonStyles, ...style }}
        {...rest}>
        {children}
      </BaseButton>
    );
  }

  private getTextButtonStyle = () => {
    const {
      shade,
      autoShade,
      textColor,
      backgroundColor,
      invert,
      fluid,
      bordered,
      location
    } = this.props;
    const styles: any = {};

    if (bordered) {
      styles.border = `1px solid ${textColor || COLORS.lightBlue}`;
    }

    if (shade || autoShade) {
      if (shade === 'admin' || isOnAdminMode(location.pathname)) {
        if (invert) {
          styles.color = COLORS.black;
          styles.backgroundColor = COLORS.whiteGreyBlack;
          if (bordered) {
            styles.border = `1px solid ${COLORS.black}`;
          }
        } else {
          styles.color = COLORS.white;
          styles.backgroundColor = COLORS.black;
        }
      } else if (shade === 'ads' || !isOnAdminMode(location.pathname)) {
        if (invert) {
          styles.color = COLORS.lightBlue;
          styles.backgroundColor = COLORS.whiteGreyBlack;
          if (bordered) {
            styles.border = `1px solid ${COLORS.lightBlue}`;
          }
        } else {
          styles.color = COLORS.white;
          styles.backgroundColor = COLORS.lightBlue;
        }
      }
    }
    if (textColor) {
      styles.color = textColor;
    }
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor;
    }
    if (fluid) {
      styles.width = '100%';
    }

    return styles;
  };
}

const styles = {
  container: {}
};

export default withRouter(TextButton);
