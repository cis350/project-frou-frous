import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddClass from './AddClass';
import DaySchedule from './DaySchedule';

function Schedule({ user }) {
  Schedule.propTypes = {
    user: PropTypes.string.isRequired,
  };
  const [classes, setClasses] = useState([]);
  const fetchData = async () => {
    fetch(`http://localhost:5000/schedule/${user}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json()).then((resp) => {
        setClasses(resp.data);
      }).catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [modal, setModal] = useState(false);

  const handleClose = () => {
    fetchData();
    setModal(false);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {classes.map((day) => (
        <DaySchedule day={day.day} classes={day.classes} />

      ))}
      {modal
        ? <AddClass handleChild={handleClose} />
        : (
          <button style={{ backgroundColor: 'white' }} title="open" type="button" className="fixed text-5xl border-4 w-16 h-16 align-center justify-center text-center bottom-16 left-1/2" onClick={() => setModal(true)}>
            +
          </button>
        )}
    </div>
  );
}

export default Schedule;
