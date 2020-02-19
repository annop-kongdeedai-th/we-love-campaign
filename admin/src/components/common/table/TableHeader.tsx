import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { ArrowForward } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Grid } from '../grid';
import { TextButton } from '../button';
import { COLORS } from '../../../constants';
import { Typography } from '@material-ui/core';

interface ITableHeader {
  title?: string;
  titleIcon?: any;
  dataCount?: number;
  linkTo?: string;
  linkTextStyle?: boolean;
}

@observer
class TableHeader extends Component<ITableHeader> {
  public render() {
    const { title, titleIcon, dataCount, linkTo, linkTextStyle } = this.props;
    return (
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        spacing={2}
        style={styles.tableHeader}>
        {title || titleIcon ? (
          <Grid
            container
            item
            alignItems={'center'}
            computer={9}
            tablet={9}
            mobile={12}>
            {titleIcon ? (
              <div style={styles.personOutlineIconStyle}>{titleIcon}</div>
            ) : null}
            <Typography style={styles.titleStyle}>{`${title} ${
              dataCount ? `(${dataCount})` : ''
            }`}</Typography>
          </Grid>
        ) : null}
        {linkTo ? (
          <Grid
            item
            container
            computer={3}
            tablet={3}
            mobile={12}
            justify={'flex-end'}>
            <Link to={linkTo} style={styles.viewAllButtonStyle}>
              {linkTextStyle ? (
                'ดูทั้งหมด'
              ) : (
                <TextButton shade={'admin'} fluid>
                  ดูทั้งหมด <ArrowForward />
                </TextButton>
              )}
            </Link>
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

const styles: any = {
  personOutlineIconStyle: {
    width: 30,
    height: 30,
    paddingRight: 8
  },
  titleStyle: {
    fontWeight: 'bold'
  },
  tableHeader: {
    paddingTop: 14,
    paddingBottom: 14
  },
  viewAllButtonStyle: { color: COLORS.lightBlue }
};
export default TableHeader;
