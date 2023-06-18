import React from 'react';
import PropTypes from 'prop-types';

function ClassBlock({
  start, end, name, color,
}) {
  ClassBlock.defaultProps = {
    start: 0,
    end: 0,
    name: 'error',
    color: 'blue',
  };
  ClassBlock.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
  };
  return (
    <div
      style={{
        gridRowStart: start, gridRowEnd: end, backgroundColor: color, color: 'black', width: '100%', maxWidth: '100%'
      }}
      className="text-lg font-normal border-l-4 border-t-transparent border-slate-300 flex items-center rounded-lg"
    >
      <div className="ml-4">{name}</div>
    </div>
  );
}

export default ClassBlock;
