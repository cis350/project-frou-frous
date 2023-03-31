import React, { useEffect, useState } from 'react';
import { getReportComments, sendComment } from '../api/reportAPI'
import PropTypes from 'prop-types';

function Comments(props) {
  const [commentString, setCommentString] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  let commstring = '';
  const { reportId } = props;

  function loadComments() {
      console.log(commentsList.length);
      for (let i = 0; i < commentsList.length; i += 1) {
          commstring = commstring.concat(
                `<div class="commentBox">
                    <div class="commentHeader">
                        <p>${commentsList[i].userId}</p>
                    </div>
                    <div class="commentBody">
                        <p>${commentsList[i].commentString}</p>
                    </div>
                </div>`
            );
        }
      document.getElementById('retrievedComments').innerHTML = commstring;
      console.log(commstring);
      commstring = '';
  }

  const handleInputChange = (event) => {
    setCommentString(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent page refresh

    // make an API call to upload the data to the database
    try {
        await sendComment(commentString);
        console.log('comment sent');
        console.log(commentString);
        // clear input box after upload
        setCommentString('');
    } catch (err) {
        alert(err.message);
    }
  };

  useEffect(() => {
      console.log('USING EFFECT');

      const getComments = async () => {
          try {
              const res = await getReportComments(reportId);
              //console.log(res.comments);
              setCommentsList([res.comments]);
              console.log('comments list');
              console.log(commentsList);
              console.log('end comments');
              loadComments(res.comments);
          } catch (err) {
              console.error('error', err.message);
          }
      };

      getComments();
  }, [reportId]);

  return (
    <div className="commentsBox">
        <div id="retrievedComments" />
        <br />
        <form className="addComment" onSubmit={handleSubmit}>
            <label htmlFor="comment">
                <input className="commentInput" type="text" value={commentString} onChange={handleInputChange} />
            </label>
            <button className="commentButton" type="submit">Comment</button>
        </form>
    </div>
  );
}

Comments.propTypes = {
    reportId: PropTypes.number.isRequired,
}

export default Comments;