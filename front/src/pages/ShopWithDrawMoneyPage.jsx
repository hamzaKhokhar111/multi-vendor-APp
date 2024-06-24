import React from 'react'
import DashboardHeader from '../components/Layout/DashboardHeader'
import DashboardSideBar from '../components/Layout/DashboardSideBar'
import WithdrawMoney from '../components/shop/WithdrawMoney'

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[180px] 800px:w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage