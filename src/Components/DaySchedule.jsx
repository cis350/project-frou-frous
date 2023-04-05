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
  const colors = ['#397367', '#904c77', '#9ebd6e', '#d4b74c'];
  return (
    <div className="text-2xl font-bold" style={{ backgroundColor: '#0D1B1E', color: 'white' }}>
      {day}
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(1440, 1fr)', maxHeight: '100vh' }}>
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
