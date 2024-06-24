import React, { useState } from "react";
// import Header from "../components/Layout/Header";
// import styles from "../styles/styles";
import styles from "../styles/styles";
// import Loader from "../components/Layout/Loader";
// import ProfileSideBar from "../components/Profile/ProfileSidebar";
// import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div>
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
    
    </div>
  );
};

export default ProfilePage;