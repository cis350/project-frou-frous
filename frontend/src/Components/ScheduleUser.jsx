import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import DaySchedule from './DaySchedule';

function Schedule({ user }) {
  const [classes, setClasses] = useState([]);
  Schedule.propTypes = {
    user: PropTypes.string.isRequired,
  };
  const fetchData = async () => {
    try {
      fetch(`/schedule/${user}`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json()).then((resp) => {
          setClasses(resp.data);
        }).catch((err) => {
          throw new Error(err);
        });

      // axios.get(`${baseURL}/classes`).then((response) => {
      //   setClasses(response.data);
      // });
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {classes.map((day) => (
        <DaySchedule day={day.day} classes={day.classes} />

      ))}
    </div>
  );
}

export default Schedule;
