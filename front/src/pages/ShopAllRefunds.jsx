import React from 'react'
import DashboardHeader from '../components/Layout/DashboardHeader'
import DashboardSideBar from '../components/Layout/DashboardSideBar'
import AllRefundOrders from '../components/shop/AllRefundOrders'

const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div>
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
      </div>
</div>
  )
}

export default ShopAllRefunds