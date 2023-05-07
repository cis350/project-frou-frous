import React from 'react';
import Schedule from '../Components/Schedule';

function ScheduleView() {
  return (
    <div>
      <Schedule user={sessionStorage.getItem('username')} />
    </div>
  );
}

export default ScheduleView;
