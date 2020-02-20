import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Divider
} from '@material-ui/core';
import { ICampaignModel } from '../CampaignModel';
import { FaRegClock } from 'react-icons/fa';
import { COLORS } from '../../../constants';
import moment from 'moment';
import { Grid, TextOverFlow, TextButton } from 'components/common';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface ICampaignCard extends RouteComponentProps<any> {
  campaign: ICampaignModel;
}

@inject('appStore')
@observer
class CampaignCard extends Component<ICampaignCard> {
  public render() {
    const { campaign, history } = this.props;
    return (
      <Card
        onClick={() => history.push(`/campaign/${campaign.id}`)}
        style={styles.cardStyle}>
        <CardActionArea disabled>
          <CardMedia
            component="img"
            height="140"
            image={campaign.image.file}
            title={campaign.campaignName}
          />
          {this.renderImageLabel()}
          <CardContent>
            <TextOverFlow gutterBottom variant="h6" numberOfLines={2}>
              {campaign.campaignName}
            </TextOverFlow>
            <TextOverFlow
              variant="body2"
              color="textSecondary"
              numberOfLines={2}>
              {campaign.description}
            </TextOverFlow>
          </CardContent>
        </CardActionArea>
        <CardActions style={styles.cardActions}>
          {this.renderCardActions()}
        </CardActions>
      </Card>
    );
  }

  private renderCardActions = () => {
    const { campaign, location } = this.props;
    return (
      <Grid container>
        <Grid width={12} item container justify={'space-between'}></Grid>
        <Grid item width={12}>
          <Divider style={styles.dividerStyle} />
        </Grid>
        <Grid item width={12} container justify={'center'}>
          <Link to={`/campaign/${campaign.id}`}>
            <TextButton>
              <Typography
                variant={'subtitle2'}
                onClick={() => console.log('2')}>
                {'ดูแคมเปญ'}
              </Typography>
            </TextButton>
          </Link>
        </Grid>
      </Grid>
    );
  };

  private renderImageLabel = () => {
    const { campaign } = this.props;
    let backgroundColor = COLORS.black;
    let timeLeft = campaign.timeLeft;
    if (moment(campaign.endDate).diff(moment.now()) < 0) {
      backgroundColor = COLORS.red;
      timeLeft = 'Ended';
    }

    return (
      <div
        style={{
          ...styles.rowStyle,
          ...styles.imageLabelStyle,
          backgroundColor: backgroundColor
        }}>
        <FaRegClock style={styles.imageLabelIconStyle} />
        <Typography
          variant={'caption'}
          style={styles.imageLabelTypographyStyle}>
          {timeLeft}
        </Typography>
      </div>
    );
  };
}
const styles: any = {
  cardStyle: {
    width: '100%',
    cursor: 'pointer'
  },
  cardActions: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0
  },
  imageLabelStyle: {
    position: 'absolute',
    top: 5,
    left: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 14
  },
  imageLabelIconStyle: {
    color: COLORS.white
  },
  imageLabelTypographyStyle: {
    color: COLORS.white,
    paddingLeft: 8
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    marginLeft: 8
  },
  dividerStyle: {
    marginTop: 8,
    marginBottom: 5,
    marginLeft: 8,
    marginRight: 8
  }
};
export default withRouter(CampaignCard);
