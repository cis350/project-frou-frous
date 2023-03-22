import React from 'react';
import PropTypes from 'prop-types';
import ClassBlock from './ClassBlock';

function DaySchedule({ day, classes }) {
  DaySchedule.defaultProps = {
    day: 'Unknownday',
    classes: [],
  };
  DaySchedule.propTypes = {
    day: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    )),
  };
  return (
    <div>
      {day}
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(1440, 1fr)', height: '100vh' }}>
        {classes.map((course) => (
          <ClassBlock name={course.name} start={course.start} end={course.end} />
        ))}
      </div>
    </div>
  );
}

export default DaySchedule;
