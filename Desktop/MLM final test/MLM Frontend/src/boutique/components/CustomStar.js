import React from 'react'

const CustomStar = () => {
  return (
    <div><ReactStars
    count={5}
    size={24}
    value={4}
    edit={false}
    activeColor="#ffd700"
  />
  </div>
  )
}

export default CustomStar