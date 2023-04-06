import React from 'react';
import Comments from '../Components/Comments';
import Report from '../Components/Report';
import '../App.css';

function PostView() {
  return (
    <div className="appBackground">
      <div>
        <Report postId={1} />
        <Comments reportId={1} userId="yourUserId" />
      </div>
    </div>
  );
}

export default PostView;
