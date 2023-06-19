import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getComments, sendComment } from '../api/reportAPI';
import '../comments.css';

function Comments(props) {
  const [commentString, setCommentString] = useState('');

  let commstring = '';
  const { reportId } = props;
  const userId = sessionStorage.getItem('username');

  const loadComments = async () => {
    try {
      const res = await getComments(reportId);
      const commentsList = res.reportComments;
      for (let i = 0; i < commentsList.length; i += 1) {
        commstring = commstring.concat(
          `<div class="commentBox">
            <div class="commentHeader"> 
              ${commentsList[i].commenterid}
              <p class="commentDate"> ${new Date(commentsList[i].timestamp).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div class="commentBody">
                <p class="commentContent">${commentsList[i].content}</p>
            </div>
        </div>`,
        );
      }
      document.getElementById('retrievedComments').innerHTML = commstring;
      commstring = '';
    } catch (err) {
      toast.error(err);
    }
  };

  const handleInputChange = (event) => {
    setCommentString(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent page refresh
    if (commentString === '') {
      toast.error('Please enter a message!');
    } else {
      try {
        // make an API call to upload the data to the database
        await sendComment(reportId, {
          commenterid: userId,
          content: commentString,
        });
        // refresh comments
        await loadComments();
        // clear input box after upload
        setCommentString('');
      } catch (err) {
        toast.error('error', err.message);
      }
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="background">
      <div className="commentsBox">
        <div id="retrievedComments" />
        <br />
        <form className="addComment" onSubmit={handleSubmit}>
          <div className="wrapper">
            <input className="commentInput" type="text" value={commentString} onChange={handleInputChange} placeholder="Add a comment" />
            <button className="commentButton" type="submit"> 
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Comments.propTypes = {
  reportId: PropTypes.string.isRequired,
};

export default Comments;
