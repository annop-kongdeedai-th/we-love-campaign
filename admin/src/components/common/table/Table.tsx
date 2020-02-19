import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { IPaginateModel } from 'modules/masterdata/PaginateModel';
import TableFooter from './TableFooter';
import {
  Table as BaseTable,
  CircularProgress,
  TableBody
} from '@material-ui/core';
import { TableProps } from '@material-ui/core/Table';
import TableEmptyRow from './TableEmptyRow';
import { Grid } from '..';

interface ITable extends TableProps {
  paginate?: IPaginateModel;
  onPageChange?: () => void;
  loading: boolean;
  dataLength: number;
}

@observer
class Table extends Component<ITable> {
  public render() {
    const {
      dataLength,
      loading,
      paginate,
      onPageChange,
      children,
      ...rest
    } = this.props;
    return (
      <div style={styles.container}>
        {loading ? (
          <CircularProgress style={styles.loading} />
        ) : (
          <Grid container>
            <Grid item width={12}>
              <BaseTable {...rest}>
                {children}
                {dataLength <= 0 ? (
                  <TableBody>
                    <TableEmptyRow colSpan={100} />
                  </TableBody>
                ) : null}
              </BaseTable>
            </Grid>
            {paginate && onPageChange ? (
              <Grid
                item
                container
                width={12}
                justify={'flex-end'}
                style={styles.tableFooterContainerStyle}>
                <TableFooter paginate={paginate} onPageChange={onPageChange} />
              </Grid>
            ) : null}
          </Grid>
        )}
      </div>
    );
  }
}

const styles: any = {
  container: {
    width: '100%',
    textAlign: 'center',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  tableFooterContainerStyle: {
    paddingTop: 14
  },
  loading: {
    marginTop: 35
  }
};

export default Table;
