import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RestaurantCard } from '../restaurant/RestaurantCard'

const Favorites = () => {
  const { auth } = useSelector((store) => store);
  return (
    <div>
        <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
        <div className='flex flex-wrap gap-3 justify-center'>
            {auth.favorites.map((item)=><RestaurantCard item={item}/>)}
        </div>
    </div>
  )
}

export default Favorites