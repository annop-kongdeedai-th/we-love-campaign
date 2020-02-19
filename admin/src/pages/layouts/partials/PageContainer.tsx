import React from 'react';
import { IMAGES } from '../../../constants';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { withWidth } from '@material-ui/core';

interface IPageContainer {
  width?: Breakpoint;
  backgroundColor?: string;
  backgroundImage?: string;
  hidePadded?: boolean;
}
class PageContainer extends React.Component<IPageContainer> {
  public render() {
    const { children } = this.props;
    return (
      <div style={{ ...this.getStyle(), ...styles.container }}>{children}</div>
    );
  }

  private getStyle = () => {
    const { hidePadded, backgroundColor, backgroundImage, width } = this.props;
    const styles: any = {};
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor;
    }
    if (backgroundImage) {
      styles.backgroundImage = `url(${backgroundImage})`;
      styles.backgroundSize = 'cover';
    }
    if (!hidePadded) {
      styles.padding = 28;
    }

    if (width! === 'xs') {
      // ทำให้ vh แสดงอย่างถูกต้องบน mobile
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      styles.height = 'calc(var(--vh, 1vh) * 95)';
    } else {
      styles.height = '95vh';
    }

    return styles;
  };
}

const styles: any = {
  container: {
    overflowY: 'auto'
  }
};

export default withWidth()(PageContainer);
