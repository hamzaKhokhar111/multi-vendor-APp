import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
import CreateProduct from './shop/CreateProduct'
// import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
// import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
// import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div >
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
          </div>
    </div>
  )
}

export default ShopCreateProduct