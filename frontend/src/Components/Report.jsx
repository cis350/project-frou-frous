import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Grid, Avatar, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { getPfp, getUserData } from '../api/userPageAPI';
import { getReportData, updateLikes, getReportLikes } from '../api/reportAPI';

function Report(props) {
  const [reporterid, setReporterId] = useState('');
  const [reporteeid, setReporteeId] = useState('');
  const [caption, setCaption] = useState('');
  const [postimg, setImg] = useState('');
  const [likeCount, setLikeCount] = useState('');
  const [pfp, setPfp] = useState('');
  const [date, setDate] = useState('');
  const { postId } = props;
  const userId = sessionStorage.getItem('username');
  const [isLiked, setIsLiked] = useState([]);
  const colors = ['#c5de9e', '#e0adcd', '#9edbcf', '#eddb98'];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  async function fetchData() {
    try {
      const reportResponse = await getReportData(postId);
      const rr = await reportResponse.reportData;
      setReporterId(rr.reporterid);
      setReporteeId(rr.reporteeid);
      setCaption(rr.caption);
      setImg(rr.img);
      setLikeCount(rr.likes.length);
      setDate(new Date(rr.date));
      const pfpResponse = await getUserData(rr.reporterid);
      setPfp(pfpResponse.pfp);
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
  <Card variant="outlined" sx={{ width: '100%', height: '100%', borderRadius: '10px', backgroundColor: randomColor, maxWidth: '800px', borderWidth: '1px', borderColor: '#E5E5E5' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item style={{ marginRight: 0 }}>
            <a href={`${reporterid}`}>
              <Avatar src={pfp} alt={userId} sx={{ width: 50, height: 50, marginRight: 0, paddingRight: 0, outline: '2px solid black' }} />
            </a>
          </Grid>
          <Grid item style={{ paddingLeft: '8px' }}>
            <div style={{ color: 'black', fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>
              <b>
                {reporterid}
              </b>
              {' '}
              reported
              {' '}
              <b>
                {reporteeid}
              </b>
              !
            </div>
            <div style={{ color: 'black', fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>
              {date.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </Grid>
        </Grid>
        <img src={postimg} alt="" style={{ width: '100%', height: '100%', marginTop: 15, borderRadius: '10px' }} />
        <center style={{ color: 'black' }}>
          <p>
            {' '}
            {caption}
            {' '}
          </p>
        </center>
      </CardContent>
      <CardActions>
        <Button id="comments" size="small" sx={{ backgroundColor: 'white', color: 'black', margin: '4px' }} href={`/app/report/${postId}`}>
          Comments 💬
        </Button>
        <Button data-testid="like-button" className={`like-button ${isLiked && 'liked'}`} id="like" size="small" sx={{ backgroundColor: isLiked ? 'red' : 'white', color: 'black', margin: '4px' }} onClick={controlLike}>
          <span className="likes-counter">{`👍 | ${likeCount}`}</span>
        </Button>
      </CardActions>
    </Card>
  );
}

Report.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default Report;
