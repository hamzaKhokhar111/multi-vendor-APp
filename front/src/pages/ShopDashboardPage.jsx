import React from 'react'
import DashboardHeader from '../components/Layout/DashboardHeader'
import DashboardSideBar from '../components/Layout/DashboardSideBar'
import DashboardHero from './DashboardHero'

function ShopDashboardPage() {
  return (
    <div>
        <div>
          <DashboardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[180px] 800px:w-[330px]">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
        </div>
    </div>
  )
}

export default ShopDashboardPage