import React, { useState } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';

function AddClass({ handleChild }) {
  function defaultFunc() {
    const please = 1;
    return please;
  }
  AddClass.defaultProps = {
    handleChild: defaultFunc,
  };
  AddClass.propTypes = {
    handleChild: PropTypes.func,
  };
  const baseURL = 'http://localhost:8000';
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [days, setDays] = useState(new Array(5).fill(false));
  const submitClass = () => {
    const addNewClass = async () => {
      const promises = [];
      for (let i = 0; i < 5; i += 1) {
        if (days[i]) {
          try {
            // axios.get(`${baseURL}/classes/${i}`).then((prev) => {
            //   const prevObj = prev.data;
            //   prevObj.classes.push({
            //     name: title,
            //     location,
            //     start,
            //     end,
            //   });
            //   axios.put(`${baseURL}/classes/${i}`, prevObj);
            // });
            promises.push(new Promise((resolve) => {
              fetch(`${baseURL}/classes/${i}`)
                .then((res) => res.json()).then((resp) => {
                  const prevObj = resp;
                  prevObj.classes.push({
                    name: title,
                    location,
                    start,
                    end,
                  });

                  fetch(`${baseURL}/classes/${i}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(prevObj),
                  }).then(() => resolve('Added'));

                // axios.put(`${baseURL}/classes/${i}`, prevObj);
                });
            }));
          } catch (error) {
            throw new Error(error);
          }
        }
      }
      Promise.all(promises).then(() => { handleChild(); });
    };
    addNewClass();
  };
  const handleDay = (e, i) => {
    const newDays = days;
    newDays[i] = (e.target.checked);
    setDays(newDays);
  };
  const handleTime = (e, i) => {
    const splitTime = e.target.value.split(':');
    const newTime = Number(splitTime[0]) * 60 + Number(splitTime[1]);
    if (i === 0) {
      setStart(newTime);
    } else {
      setEnd(newTime);
    }
  };
  return (
    <>
      <form>
        <button type="button" title="close" aria-label="close" id="close" className="w-screen h-screen absolute bg-white top-0 opacity-50 m-0 p-0" onClick={handleChild} />
      </form>
      <div className="flex justify-center align-middle items-center absolute top-0 w-screen h-screen m-0 p-0 pointer-events-none">

        <div className="absolute bg-slate-200 p-8 flex flex-col justify-center items-center rounded-2xl pointer-events-auto">
          <form className="m-8 flex justify-between flex-col text-xl">
            <div className="text-3xl align-middle text-center mb-16">Add Class</div>
            <input placeholder="Course Title" value={title} className="rounded-md p-2" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Course Location" className="m-4 p-2 rounded-md" onChange={(e) => setLocation(e.target.value)} />
            <label htmlFor="start">
              Start
              <input title="start" id="start" type="time" className="m-8 p-2 rounded-md" onChange={(e) => handleTime(e, 0)} />
            </label>
            <label htmlFor="end">
              End
              <input title="end" type="time" className="m-8 p-2 rounded-md" onChange={(e) => handleTime(e, 1)} />
            </label>
            <div className="flex items-center justify-between mb-8">

              <label htmlFor="m">
                <input type="checkbox" id="m" onChange={(e) => handleDay(e, 0)} />
                M
              </label>

              <label htmlFor="t">
                <input type="checkbox" id="t" onChange={(e) => handleDay(e, 1)} />
                T
              </label>

              <label htmlFor="w">
                <input type="checkbox" id="w" onChange={(e) => handleDay(e, 2)} />
                W
              </label>

              <label htmlFor="th">
                <input type="checkbox" id="th" onChange={(e) => handleDay(e, 3)} />
                T
              </label>

              <label htmlFor="f">
                <input type="checkbox" id="f" onChange={(e) => handleDay(e, 4)} />
                F
              </label>
            </div>

          </form>
          <button type="button" title="submit" className="bg-white p-2 rounded-md" onClick={(e) => submitClass(e)}>Add Class</button>

        </div>
      </div>

    </>
  );
}

export default AddClass;
