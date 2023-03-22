import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function AddClass({ handleChild }) {
  function defaultFunc() {
    const please = 1;
    return please;
  }
  AddClass.defaultProps = {
    handleChild: defaultFunc(),
  };
  AddClass.propTypes = {
    handleChild: PropTypes.func,
  };
  const baseURL = 'http://localhost:3000';
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [days, setDays] = useState(new Array(5).fill(false));
  const submitClass = () => {
    const addNewClass = async () => {
      for (let i = 0; i <= 5; i += 1) {
        if (days[i]) {
          try {
            axios.get(`${baseURL}/classes/${i}`).then((prev) => {
              const prevObj = prev.data;
              prevObj.classes.push({
                name: title,
                location,
                start,
                end,
              });
              axios.put(`${baseURL}/classes/${i}`, prevObj);
            });
          } catch (error) {
            throw new Error(error);
          }
        }
      }
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
    <div className="flex justify-center align-middle items-center absolute top-0 w-screen h-screen z-10 m-0 p-0">
      <form>
        <button type="button" aria-label="close" id="close" className="w-screen h-screen absolute bg-white top-0 opacity-50 m-0 p-0" onClick={handleChild} />
      </form>

      <div className="absolute bg-slate-500 p-8 flex flex-col justify-center items-center ">
        <form className="m-8 flex justify-between flex-col">
          <input placeholder="Course Title" value={title} className="" onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Course Location" className="m-4" onChange={(e) => setLocation(e.target.value)} />
          <input type="time" className="m-8" onChange={(e) => handleTime(e, 0)} />
          <input type="time" className="m-8" onChange={(e) => handleTime(e, 1)} />

          <div className="flex items-center justify-center mb-8">

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
              <input type="checkbox" id="th" onChange={(e) => handleDay(e, 4)} />
              T
            </label>

            <label htmlFor="f">
              <input type="checkbox" id="f" onChange={(e) => handleDay(e, 5)} />
              F
            </label>
          </div>

        </form>
        <button type="button" className="bg-white" onClick={(e) => submitClass(e)}>Add Class</button>

      </div>
    </div>
  );
}

export default AddClass;
