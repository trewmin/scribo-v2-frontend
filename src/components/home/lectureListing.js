import React from 'react';

import { Link } from 'react-router-dom';

const lectureListing = ({ lecture: {id, title, date_time} }) => {

  const path = `/lecture/${id}`

  return (
    <div>
      <Link to={path}>{title}</Link>
    </div>
  )
}
export default lectureListing
