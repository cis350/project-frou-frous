import React from 'react';
import { useParams } from 'react-router';

import Comments from '../Components/Comments';
import Report from '../Components/Report';
import '../App.css';

function PostView() {
  const { reportId } = useParams(); //eslint-disable-line 
  return (
    <div className="appBackground">
      <div>
        <Report postId={1} />
        <Comments reportId={reportId} userId="yourUserId" />
      </div>
    </div>
  );
}

export default PostView;
