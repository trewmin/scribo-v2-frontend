import React from 'react';

import { Link } from 'react-router-dom';

const userListing = ({ user: {id, user_name, first_name, last_name} }) => {

  return (
    <div>
      {first_name} {last_name}
    </div>
  )
}
export default userListing
