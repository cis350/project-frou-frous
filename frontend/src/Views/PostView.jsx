import React from 'react';
import { useParams } from 'react-router';

import Comments from '../Components/Comments';
import Report from '../Components/Report';
import '../App.css';

function PostView() {
  const { reportId } = useParams(); //eslint-disable-line 
  return (
    <div className="appBackground" style={{ maxHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ margin: '160px', marginRight: '0px', width: '50%' }}>
        <Report postId={reportId} />
      </div>
      <div style={{ margin: '160px', marginLeft: '0px',  width: '50%' }}>
        <Comments reportId={reportId} />
      </div>
    </div>
  );
}

export default PostView;
