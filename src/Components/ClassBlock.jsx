import React from 'react';
import PropTypes from 'prop-types';

function ClassBlock({ start, end, name }) {
  ClassBlock.defaultProps = {
    start: 0,
    end: 0,
    name: 'error',
  };
  ClassBlock.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    name: PropTypes.string,
  };
  return (
    <div style={{
      gridRowStart: start, gridRowEnd: end, backgroundColor: 'blue', color: 'white',
    }}
    >
      {name}
    </div>
  );
}

export default ClassBlock;
