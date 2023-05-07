import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getReportData, sendComment } from '../../frontend/src/api/reportAPI';
import '../comments.css';

function Comments(props) {
  const [commentString, setCommentString] = useState('');
  // add timestamp

  let commstring = '';
  const { reportId, userId } = props;

  const loadComments = async () => {
    try {
      const res = await getReportData(reportId);
      const commentsList = res.comments;
      for (let i = 0; i < commentsList.length; i += 1) {
        commstring = commstring.concat(
          `<div class="commentBox">
            <div class="commentHeader">
                <p>${commentsList[i].commenterid}</p>
            </div>
            <div class="commentBody">
                <p>${commentsList[i].content}</p>
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
            <label htmlFor="comment">
              <input className="commentInput" type="text" value={commentString} onChange={handleInputChange} placeholder="Add a comment" />
            </label>
            <button className="commentButton" type="submit">
              <img src="../assets/send2.png" alt="Submit" height="35" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Comments.propTypes = {
  reportId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Comments;
