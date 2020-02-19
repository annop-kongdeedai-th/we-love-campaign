import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { IPaginateModel } from 'modules/masterdata/PaginateModel';
import { Pagination } from '@material-ui/lab';

export interface ITableFooter {
  paginate: IPaginateModel;
  onPageChange: () => void;
}

@observer
class TableFooter extends Component<ITableFooter> {
  public render() {
    const { paginate } = this.props;
    return (
      <Pagination
        count={paginate.totalPage}
        page={paginate._page}
        onChange={this.onChangePaginate}
        variant="outlined"
        shape="rounded"
        style={styles.paginationStyle}
      />
    );
  }

  private onChangePaginate = async (event: any, page: number) => {
    const { paginate, onPageChange } = this.props;
    try {
      paginate.setPage(page);
      await onPageChange();
    } catch (e) {
      console.log(e);
    }
  };
}

const styles: any = {
  paginationStyle: {
    //
  }
};
export default TableFooter;
