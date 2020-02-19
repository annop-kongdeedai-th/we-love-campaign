import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';

interface ITableEmptyRow {
  colSpan: number;
}

@observer
class TableEmptyRow extends Component<ITableEmptyRow> {
  public render() {
    const { colSpan } = this.props;
    return (
      <TableRow>
        <TableCell align={'center'} colSpan={colSpan}>
          <Typography style={styles.typographyStyle}>
            {'ไม่พบข้อมูล'}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
}

const styles = {
  typographyStyle: {
    paddingTop: 24,
    paddingBottom: 24
  }
};
export default TableEmptyRow;
