import React from 'react'
import Header from './Header'

import { useDispatch } from 'react-redux'


const Browse = () => {
  const dispatch = useDispatch();
  return (
    <div className='flex'>
      <Header></Header>
      
    </div>
  )
}

export default Browse