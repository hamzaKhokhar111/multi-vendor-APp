import React from 'react'
import DashboardHeader from '../components/Layout/DashboardHeader'
import DashboardSideBar from '../components/Layout/DashboardSideBar'
import AllEvents from '../components/shop/AllEvents'

const ShopAllEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div >
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default ShopAllEvents