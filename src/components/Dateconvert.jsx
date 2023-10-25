import React from 'react'

const Dateconvert = ({currentDate,brk}) => {
  
    const weekend = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wendsday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let sept=currentDate?.split('T')
      let t=[...sept[0].split('-'),...sept[1].split(':')].map(time=>parseInt(time))
      let curr_date=new Date(t[0],t[1]-1,t[2],t[3],t[4],t[5])
      let hour =
      curr_date.getHours() < 10
          ? `0${curr_date.getHours()}`
          : curr_date.getHours();
      let mins =
      curr_date.getMinutes() < 10
          ? `0${curr_date.getMinutes()}`
          : curr_date.getMinutes();
      let day = curr_date.getDay();
      
  return (
    <>
    { day === new Date().getDay() ? "Today" : weekend[day]} {brk}
    {`${hour > 12 ? `${hour - 12}` : hour}:${mins}${
      curr_date.getHours() < 12 ? "am" : "pm"
    }`}
    </>
  )
}

export default Dateconvert