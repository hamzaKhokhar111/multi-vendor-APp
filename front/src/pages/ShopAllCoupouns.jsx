import React from 'react'
import DashboardHeader from '../components/Layout/DashboardHeader'
import DashboardSideBar from '../components/Layout/DashboardSideBar'
import AllCoupons from '../components/shop/AllCoupons'

const ShopAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div>
              <DashboardSideBar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default ShopAllCoupouns