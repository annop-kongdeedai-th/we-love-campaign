import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { DropdownMenu, Grid } from 'components/common';
import { Typography } from '@material-ui/core';
import { IPaginateModel } from 'modules/masterdata/PaginateModel';

interface ITableHeaderWithFilter {
  title?: string;
  titleIcon?: any;
  dataCount?: number;
  paginate: IPaginateModel;
  sortedBy: sortByType;
  onSelectedSortBy: (sortBy: sortByType) => void;
  onGetData: () => void;
}

export type sortByType = 'ตัวอักษร' | 'ใหม่ล่าสุด';
const limitPageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@observer
class TableHeaderWithFilter extends Component<ITableHeaderWithFilter> {
  public render() {
    const { title, titleIcon, dataCount, sortedBy, paginate } = this.props;
    return (
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        style={styles.tableHeader}>
        {title ? (
          <Grid
            container
            item
            alignItems={'center'}
            computer={6}
            tablet={6}
            mobile={12}>
            {titleIcon
              ? React.cloneElement(titleIcon, { style: styles.titleIconStyle })
              : null}
            <Typography style={styles.titleStyle}>
              {`${title} ${dataCount ? `(${dataCount})` : ''}`}
            </Typography>
          </Grid>
        ) : null}
        <Grid
          container
          item
          computer={6}
          tablet={6}
          mobile={12}
          justify={'flex-end'}
          alignItems={'flex-end'}>
          <Grid item>
            <DropdownMenu
              label={'ดู:ผู้ใช้งานทั้งหมด'}
              menuItems={[
                { label: 'ทั้งหมด', onClick: () => console.log('all') }
              ]}
            />
          </Grid>
          <Grid item>
            <DropdownMenu
              label={`เรียงตาม: ${sortedBy}`}
              menuItems={[
                {
                  label: 'ตัวอักษร',
                  onClick: () => this.onSelectedSortBy('ตัวอักษร')
                },
                {
                  label: 'ใหม่ล่าสุด',
                  onClick: () => this.onSelectedSortBy('ใหม่ล่าสุด')
                }
              ]}
            />
          </Grid>
          <Grid item>
            <DropdownMenu
              label={`แสดงผล/หน้า: ${paginate._limit}`}
              menuItems={limitPageArray.map(
                (_limit: number, index: number) => ({
                  label: `${_limit}`,
                  onClick: () => this.onSelectedPerPage(_limit)
                })
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private onSelectedSortBy = async (sortBy: sortByType) => {
    const { onSelectedSortBy, onGetData } = this.props;
    try {
      onSelectedSortBy(sortBy);
      await onGetData();
    } catch (e) {
      console.log(e);
    }
  };

  private onSelectedPerPage = async (_limit: number) => {
    const { paginate, onGetData } = this.props;
    try {
      await paginate.setLimit(_limit);
      await onGetData();
    } catch (e) {
      console.log(e);
    }
  };
}

const styles: any = {
  titleIconStyle: {
    width: 30,
    height: 30,
    paddingRight: 8,
    display: 'inline',
    verticalAlign: 'middle'
  },
  titleStyle: {
    fontWeight: 'bold'
  },
  tableHeader: {
    paddingTop: 14,
    paddingBottom: 14
  }
};
export default TableHeaderWithFilter;
