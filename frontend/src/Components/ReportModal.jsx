import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { rootURL } from "../utils/utils";

function ReportModal({ userId }) {
  ReportModal.defaultProps = {
    userId: 'friend',
  };
  ReportModal.propTypes = {
    userId: PropTypes.string,
  };
  const reporter = sessionStorage.getItem('username');

  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [reportee, setReportee] = useState('');
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleSubmit = async () => {
    const date = new Date();
    const dateAsInt = date.getTime();

    try {
      const imageBase = await toBase64(selectedImage);
      const form = new FormData();
      form.append('image', selectedImage, selectedImage.name);
      await fetch(`${rootURL}/report`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reporterid: reporter,
          reporteeid: reportee,
          caption,
          date: dateAsInt,
          comments: [],
          likes: [],
          img: imageBase,
        }),
      });
      toast.success('Reported!');
      document.getElementById('reportForm').reset();
      setSelectedImage(null);
      setCaption('');
      setReportee('');
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
            <input type="text" aria-label="reportee" placeholder="Reportee" onChange={(e) => setReportee(e.target.value)} className="mb-8 p-2 rounded-md" />
            <input
              type="file"
              name="addphoto"
              aria-label="add-photo"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
              accept="image/*"
            />
            <textarea
              className="h-32 mt-8 w-full break-words p-2 rounded-md"
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
