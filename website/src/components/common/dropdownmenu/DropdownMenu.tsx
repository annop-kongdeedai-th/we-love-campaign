import { inject, observer } from 'mobx-react';
import React from 'react';
import { MenuItem, Button, Menu, Fade, Typography } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ExpandMore } from '@material-ui/icons';
import { TextButton } from '../button';

interface IMenuItem {
  label: string;
  onClick: () => void;
}

interface IDropdownMenu extends RouteComponentProps<any> {
  label: string;
  menuItems: IMenuItem[];
}

@inject('authStore', 'appStore')
@observer
class DropdownMenu extends React.Component<IDropdownMenu> {
  public state = { anchorEl: null, open: false };
  public render() {
    const { label, menuItems } = this.props;
    return (
      <div style={styles.padHorizonal}>
        <TextButton
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={this.handleClick}>
          <Typography>{label}</Typography>
          <ExpandMore />
        </TextButton>
        <Menu
          anchorEl={this.state.anchorEl}
          keepMounted
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Fade}>
          {menuItems.map((menu: IMenuItem, index: number) => (
            <MenuItem key={index} onClick={() => this.handleClose(menu)}>
              {menu.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  private handleClose = (menu: IMenuItem) => {
    if (menu.onClick) {
      menu.onClick();
    }
    this.setState({ anchorEl: null, open: false });
  };
}
const styles: any = {
  container: {
    paddingRight: '4em',
    height: '100%'
  }
};
export default withRouter(DropdownMenu);
