import React, { useState, useEffect } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
// import styles from "../../styles/styles";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { getAllOrdersOfUser } from "../redux/actions/order";
// import { getAllUsers } from "../redux/actions/user";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order) || {};
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, [dispatch, user._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <AiOutlineArrowRight size={20} />
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order) || {};
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, [dispatch, user._id]);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <AiOutlineArrowRight size={20} />
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order) || {};
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, [dispatch ]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <AiOutlineArrowRight size={20} />
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password not matched!");
    } else {
      dispatch(changeUserPassword(oldPassword, newPassword));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [dispatch, error, successMessage]);

  return (
    <div className="w-full px-5">
      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit} aria-required={true}>
          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const [selected, setSelected] = useState(false);
  const [addressTypeData, setAddressTypeData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
      setSelected(false);
    }
  }, [dispatch, error, successMessage]);

  return (
    <div className="w-full px-5">
      {open && (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#0000004b] z-[2000] flex items-center justify-center">
          <div className="w-[90%] 800px:w-[50%] h-[80vh] bg-white shadow rounded-[4px] p-8 overflow-y-scroll">
            <div className="w-full flex justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-[25px] text-center font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} aria-required={true}>
                <div className="w-full block pb-3">
                  <label className="block pb-2">Country</label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" className="block border pb-2">
                      Choose your country
                    </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full block pb-3">
                  <label className="block pb-2">City</label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="" className="block border pb-2">
                      Choose your City
                    </option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full block pb-3">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-full block pb-3">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                {/* <div className="w-full block pb-3">
                  <label className="block pb-2">Address Type</label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                  >
                    <option value="" className="block border pb-2">
                      Choose your Address Type
                    </option>
                    {addressTypeData &&
                      addressTypeData.map((item) => (
                        <option
                          className="block pb-2"
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div> */}

                <input
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Submit"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex justify-between items-center">
        <h1 className="text-[25px] font-[500] font-Poppins pb-2">My Addresses</h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className={`w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5`}
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{item.city}</h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{item.country}</h6>
            </div>
            <div
              className="min-w-[10%] flex items-center justify-between pl-8"
              onClick={() => handleDelete(item)}
            >
              <button
                className="cursor-pointer"
                style={{
                  background: "#fff",
                  border: "none",
                  outline: "none",
                  fontSize: "20px",
                }}
              >
                <RxCross1 size={25} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

// export default TrackOrder;

export default ProfileContent;
