import React from 'react';
import Comments from '../Components/Comments';

function PostView() {
  return (
    <div>
      <Comments reportId={1} userId="weh" />
    </div>
  );
}

export default PostView;
