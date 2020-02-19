import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import {
  FormDisplay,
  FormDisplayChildren,
  Grid,
  TextButton,
  GoogleMap
} from 'components/common';
import { ICampaignModel } from '../CampaignModel';

interface IAdminCampaignBodyViewMode {
  campaign: ICampaignModel;
  onClickEdit: () => void;
}

@inject('appStore')
@observer
class AdminCampaignBodyViewMode extends Component<IAdminCampaignBodyViewMode> {
  public render() {
    const { campaign, onClickEdit } = this.props;
    return (
      <Grid container style={styles.container}>
        <Grid item width={12}>
          <FormDisplay
            title={'ชื่อแคมเปญ'}
            value={campaign.campaignName}
            style={styles.formDisplayStyle}
          />
          <FormDisplayChildren
            title={'รูปแคมเปญ'}
            component={
              <div>
                <img src={campaign.image.file} style={styles.imageStyle} />
                <Typography variant="subtitle2">
                  {campaign.image.fileName}
                </Typography>
              </div>
            }
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'เจ้าของแคมเปญ'}
            value={campaign.brand}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'สถานะ'}
            value={campaign.status}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'รายละเอียดแบบย่อ'}
            value={campaign.shortDescription}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'รายละเอียด'}
            value={campaign.description}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'วันที่เริ่มต้น'}
            value={campaign.startDateAsThaiFormat}
            style={styles.formDisplayStyle}
          />
          <FormDisplay
            title={'วันที่สิ้นสุด'}
            value={campaign.endDateAsThaiFormat}
            style={styles.formDisplayStyle}
          />
          <FormDisplayChildren
            title={'สถานที่จัดแคมเปญ'}
            component={<GoogleMap mapHeight={300} address={campaign.address} />}
            style={styles.formDisplayStyle}
          />
        </Grid>
        <Grid item container style={styles.footerButtonRow}>
          <TextButton
            shade={'admin'}
            variant="contained"
            fluid
            onClick={onClickEdit}>
            แก้ไข
          </TextButton>
        </Grid>
      </Grid>
    );
  }
}
const styles: any = {
  container: {
    marginTop: 40
  },
  formDisplayStyle: {
    marginTop: 28,
    marginBottom: 28
  },
  imageStyle: {
    width: '100%',
    marginBottom: 14
  },
  footerButtonRow: {
    paddingTop: 24,
    paddingBottom: 24
  }
};
export default AdminCampaignBodyViewMode;
