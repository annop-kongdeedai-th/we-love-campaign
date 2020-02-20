import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export const getPopupWidth = (width: Breakpoint) => {
  let widthValue;
  if (width === 'xs') {
    widthValue = '80%';
  } else {
    widthValue = '40%';
  }

  return { width: widthValue };
};
