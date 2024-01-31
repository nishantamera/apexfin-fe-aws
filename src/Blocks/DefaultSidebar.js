import React from 'react'
import { Link } from 'react-router-dom';

 
const DefaultSidebar = () => {

  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <></>
  )
}

export default DefaultSidebar