import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Grid, Avatar, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { getPfp } from '../api/userPageAPI';
import { getReportData, updateLikes, getReportLikes } from '../api/reportAPI';
// , updateLikes, getReportLikes getReport, ,

function Report(props) {
  const [reporterid, setReporterId] = useState('');
  const [reporteeid, setReporteeId] = useState('');
  const [caption, setCaption] = useState('');
  const [postimg, setImg] = useState('');
  // const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState('');
  // const [date, setDate] = useState('');
  const [pfp, setPfp] = useState('');
  const { postId } = props;
  const userId = sessionStorage.getItem('username');
  const [isLiked, setIsLiked] = useState([]);

  async function fetchData() {
    try {
      // getReport(handleReport, postId); // Need to add this to swaggerHub API
      const reportResponse = await getReportData(postId);
      const rr = await reportResponse.reportData;
      setReporterId(rr.reporterid);
      setReporteeId(rr.reporteeid);
      setCaption(rr.caption);
      setImg(rr.img);
      setLikeCount(rr.likes.length);
      // setDate(reportResponse.date);
      const profphoto = await getPfp(reporterid);
      setPfp(profphoto.pfp);
      if (rr.likes.indexOf(userId) > -1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const controlLike = async () => {
    await updateLikes(postId, userId, isLiked);
    const newLikes = await getReportLikes(postId);
    if (newLikes.reportLikes.indexOf(userId) > -1) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    setLikeCount(newLikes.reportLikes.length);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%', border: '3px solid #E5E5E5', borderRadius: '10px', backgroundColor: '#0D1B1E', maxWidth: '800px' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={pfp} alt={userId} sx={{ width: 50, height: 50 }} />
          </Grid>
          <Grid item>
            <div style={{ color: 'white', fontFamily: 'Open Sans, sans-serif' }}>
              <b>
                {reporterid}
              </b>
              {' '}
              reported
              {' '}
              <b>
                {reporteeid}
              </b>
              {' '}
              for skipping!
            </div>
          </Grid>
        </Grid>
        <img src={postimg} alt="" style={{ width: '100%', height: '100%', marginTop: 15, borderRadius: '10px' }} />
        <center style={{ color: 'white' }}>
          <p>
            {' '}
            {caption}
            {' '}
          </p>
        </center>
      </CardContent>
      <CardActions>
        <Button id="comments" size="small" sx={{ backgroundColor: 'white', color: 'black' }} href={`/app/report/${postId}`}>
          Comments
        </Button>
        <Button data-testid="like-button" className={`like-button ${isLiked && 'liked'}`} id="like" size="small" sx={{ backgroundColor: isLiked ? 'red' : 'white', color: 'black' }} onClick={controlLike}>
          <span className="likes-counter">{ `Like | ${likeCount}` }</span>
        </Button>
      </CardActions>
    </Card>
  );
}

Report.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default Report;
