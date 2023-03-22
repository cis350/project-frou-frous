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
  const colors = ['#cac2ff', '#a3d9fe', '#f9bbad', '#ffd599'];
  return (
    <div className="text-2xl font-bold">
      {day}
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(1440, 1fr)', height: '100vh' }}>
        {classes.map((course, index) => (
          <ClassBlock
            key={course.name}
            name={course.name}
            start={course.start}
            end={course.end}
            color={colors[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default DaySchedule;
