import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Typography,
  TextField,
  InputAdornment,
  TextareaAutosize
} from '@material-ui/core';
import {
  FormDisplayChildren,
  Grid,
  TextButton,
  DateInput,
  GoogleMapModal
} from 'components/common';
import { ICampaignModel, campaignStatusValueEnum } from '../CampaignModel';
import { CampaignStatusDropdown } from '.';
import { FaChevronRight } from 'react-icons/fa';

interface IAdminCampaignBodyEditMode {
  campaign: ICampaignModel;
  onClickCancel: () => void;
  onEditCampaignDetail: (edittingCampaign: ICampaignModel) => void;
}

@inject('appStore')
@observer
class AdminCampaignBodyEditMode extends Component<IAdminCampaignBodyEditMode> {
  public render() {
    const { campaign, onClickCancel, onEditCampaignDetail } = this.props;
    return (
      <Grid container style={styles.container}>
        <Grid item width={12}>
          <TextField
            id="standard-number"
            fullWidth
            label="ชื่อแคมเปญ"
            placeholder="กรุณากรอกชื่อแคมเปญ"
            value={campaign.campaignName}
            onChange={(e: any) => this.onChangeText(e, 'campaignName')}
            InputLabelProps={{
              shrink: true
            }}
            style={styles.textFieldStyle}
          />
          <FormDisplayChildren
            title={'รูปแคมเปญ'}
            component={this.renderImagePickerSection()}
            showUnderline
            style={styles.textFieldStyle}
          />
          <TextField
            id="standard-number"
            fullWidth
            label="เจ้าของแคมเปญ"
            placeholder="กรุณากรอกเจ้าของแคมเปญ"
            value={campaign.brand}
            onChange={(e: any) => this.onChangeText(e, 'brand')}
            InputLabelProps={{
              shrink: true
            }}
            style={styles.textFieldStyle}
          />
          <FormDisplayChildren
            title={'สถานะ'}
            component={
              <CampaignStatusDropdown
                campaignStatus={campaign.status}
                onSelected={(status: campaignStatusValueEnum) =>
                  campaign.setField({ fieldName: 'status', value: status })
                }
              />
            }
            style={styles.textFieldStyle}
          />
          <FormDisplayChildren
            title={'รายละเอียดแบบย่อ'}
            component={
              <TextareaAutosize
                value={campaign.shortDescription}
                onChange={(e: any) => this.onChangeText(e, 'shortDescription')}
                style={styles.textareaAutosizeStyle}
              />
            }
            style={styles.textFieldStyle}
          />
          <FormDisplayChildren
            title={'รายละเอียด'}
            component={
              <TextareaAutosize
                value={campaign.description}
                onChange={(e: any) => this.onChangeText(e, 'description')}
                style={styles.textareaAutosizeStyle}
              />
            }
            style={styles.textFieldStyle}
          />
          <DateInput
            id={'campaignStartDate'}
            value={campaign.startDate}
            label={'วันเริ่มต้น'}
            onChange={value =>
              campaign.setField({ fieldName: 'startDate', value })
            }
            fluid
            style={styles.textFieldStyle}
          />

          <DateInput
            id={'campaignEndDate'}
            value={campaign.endDate}
            label={'วันสิ้นสุด'}
            onChange={value =>
              campaign.setField({ fieldName: 'endDate', value })
            }
            fluid
            style={styles.textFieldStyle}
          />
          <GoogleMapModal
            address={campaign.address}
            trigger={
              <TextField
                id="standard-number"
                fullWidth
                label="สถานที่จัดแคมเปญ"
                placeholder="กรุณาเลือกสถานที่จัดแคมเปญ"
                value={campaign.address.fullAdress}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <FaChevronRight />
                    </InputAdornment>
                  )
                }}
                onClick={() => console.log('')}
                style={styles.textFieldStyle}
              />
            }
          />
        </Grid>

        <Grid
          item
          container
          justify={'space-around'}
          spacing={2}
          style={styles.footerButtonRow}>
          <Grid item computer={6} tablet={6} mobile={12}>
            <TextButton fluid variant="contained" onClick={onClickCancel}>
              ยกเลิก
            </TextButton>
          </Grid>
          <Grid item computer={6} tablet={6} mobile={12}>
            <TextButton
              shade={'admin'}
              fluid
              variant="contained"
              onClick={() => onEditCampaignDetail(campaign)}>
              บันทึก
            </TextButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  private renderImagePickerSection = () => {
    const { campaign } = this.props;
    return (
      <Grid container spacing={2}>
        <Grid item container>
          <img src={campaign.image.file} style={styles.campaignImageStyle} />
        </Grid>
        <Grid item container spacing={3}>
          {campaign.image.file ? (
            <Grid item width={6}>
              <Typography style={styles.imageFileName}>
                {campaign.image.fileName}
              </Typography>
            </Grid>
          ) : null}
          <Grid
            item
            style={{
              textAlign: campaign.image.file ? 'end' : 'start',
              ...styles.imagePickerRow
            }}
            width={6}>
            <TextButton
              autoShade
              variant="contained"
              onClick={this.onClickSelectFile}>
              แก้ไขไฟล์
            </TextButton>
            <input
              type="file"
              id="file"
              ref="fileUploader"
              onChange={(e: any) => this.onChangeImage(e, 'image')}
              style={styles.inputFileStyle}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  private onClickSelectFile = (e: any) => {
    const fileUploader: any = this.refs.fileUploader;
    fileUploader.click();
  };

  private onChangeImage = (e: any, fieldName: string) => {
    const { campaign } = this.props;
    const file = e.target.files[0];
    campaign.image.setFile(file);
  };

  private onChangeText = (e: any, fieldName: string) => {
    const { campaign } = this.props;
    campaign.setField({ fieldName: fieldName, value: e.target.value });
  };
}
const styles: any = {
  container: {
    marginTop: 40
  },
  textFieldStyle: {
    width: '100%',
    marginTop: 14,
    marginBottom: 14
  },
  textareaAutosizeStyle: {
    height: 150,
    width: '100%',
    padding: 8
  },
  imageFileName: {
    overflowWrap: 'break-word'
  },
  campaignImageStyle: {
    maxWidth: '100%'
  },
  inputFileStyle: {
    display: 'none'
  },
  imagePickerRow: {
    // textAlign: 'end'
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
export default AdminCampaignBodyEditMode;
