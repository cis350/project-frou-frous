import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import AddClass from './AddClass';
import DaySchedule from './DaySchedule';

function Schedule() {
  const baseURL = 'http://localhost:8000';
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`${baseURL}/classes`)
          .then((res) => res.json()).then((resp) => {
            setClasses(resp);
          }).catch((err) => {
            console.log(err.message);
          });

        // axios.get(`${baseURL}/classes`).then((response) => {
        //   setClasses(response.data);
        // });
      } catch (error) {
        console.log();
      }
    };
    fetchData();
  }, []);

  const [modal, setModal] = useState(false);

  const handleClose = () => {
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
          <button title="open" type="button" className="fixed text-5xl border-4 w-16 h-16 align-center justify-center text-center bottom-16 left-1/2" onClick={() => setModal(true)}>
            +
          </button>
        )}
    </div>
  );
}

export default Schedule;
