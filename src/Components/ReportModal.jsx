import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function ReportModal({ userId }) {
  ReportModal.defaultProps = {
    userId: 'friend',
  };
  ReportModal.propTypes = {
    userId: PropTypes.string,
  };
  const reporter = '1234';

  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = async () => {
    const date = new Date();
    const dateAsInt = date.getTime();
    try {
      await fetch('http://localhost:8000/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reporterid: reporter,
          reporteeid: userId,
          caption,
          date: dateAsInt,
          comments: [],
          likes: [],
          img: 'https://media.istockphoto.com/id/1207224564/photo/happy-cute-boy-having-picnic-in-the-park.jpg?s=1024x1024&w=is&k=20&c=JKrcNb7iTO4oHyci_IWsGrZCFbdtmdJR7cW3ZI_ilPo=',
        }),
      });
      toast.success('Reported!');
      document.getElementById('reportForm').reset();
      setSelectedImage(null);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <div className="fixed w-screen h-screen t-0 r-0 flex items-center justify-center">
        <article className="flex flex-col bg-[#9EBD6E] px-8 pb-8 rounded-lg text-center text-2xl font-bold">
          <input type="button" value="✕" onClick={() => window.history.back()} className="self-end pt-4" />
          {`Reporting ${userId}`}
          {selectedImage && (
            <div className="flex justify-center flex-col items-center mt-8 text-base font-normal">
              <img
                alt="not found"
                width="250px"
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button
                className="bg-[#397367] p-2 rounded-md text-white"
                type="button"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </button>
            </div>
          )}
          <form
            className="flex flex-col pt-8 text-base font-normal"
            id="reportForm"
          >
            <button
              type="button"
              name="skippedclass"
              aria-label="skipped-class"
            />
            <input
              type="file"
              name="addphoto"
              aria-label="add-photo"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
            <textarea
              className="h-32 mt-8 w-full break-words"
              placeholder="Caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <button
              type="button"
              name="post"
              aria-label="post"
              className="bg-[#397367] p-2 mt-8 rounded-md text-white"
              onClick={handleSubmit}
            >
              Report
            </button>
          </form>
        </article>
      </div>
    </div>
  );
}

export default ReportModal;
