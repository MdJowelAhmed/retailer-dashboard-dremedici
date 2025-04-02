import { Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import image4 from "../../assets/image4.png";
import Frame1 from "../../assets/Frame1.png";
import Frame3 from "../../assets/Frame3.png";
import Frame5 from "../../assets/Frame5.png";
import Frame6 from "../../assets/Frame6.png";
import Frame7 from "../../assets/Frame7.png";
import Frame8 from "../../assets/subcription.png";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const showLogoutConfirm = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    setIsLogoutModalOpen(false);
  };

  const handleCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const menuItems = [
    {
      key: "/",
      icon: (
        <img
          src={Frame1}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image text-white"
        />
      ),
      label: <Link to="/">Dashboard Overview</Link>,
    },
    {
      key: "/orders",
      icon: (
        <img
          src={Frame3}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image"
        />
      ),
      label: <Link to="/orders">My Orders</Link>,
    },
    {
      key: "/inventory",
      icon: (
        <img
          src={Frame5}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image"
        />
      ),
      label: <Link to="/inventory">Inventory</Link>,
    },
    {
      key: "/subscription",
      icon: (
        <img
          src={Frame8}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image"
        />
      ),
      label: <Link to="/subscription">Subscription</Link>,
    },
    {
      key: "/mycart",
      icon: (
        <img
          src={Frame5}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image"
        />
      ),
      label: <Link to="/mycart">My Cart</Link>,
    },
    {
      key: "/loyaltyProgram",
      icon: (
        <img
          src={Frame6}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image"
        />
      ),
      label: <Link to="/loyaltyProgram">Loyalty Program</Link>,
    },
    {
      key: "subMenuSetting",
      icon: (
        <img
          src={Frame7}
          alt="Retailer Icon"
          style={{
            width: "24px",
            height: "24px",
            filter: "invert(1) grayscale(1)",
            transition: "filter 0.3s ease",
          }}
          className="icon-image"
        />
      ),
      label: "Settings",
      children: [
        {
          key: "/profile",
          label: (
            <Link to="/profile" className="">
              Update Profile
            </Link>
          ),
        },
        {
          key: "/terms-and-conditions",
          label: (
            <Link
              to="/terms-and-conditions"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={showLogoutConfirm}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mb-20">
      <Link
        to={"/"}
        className="flex items-center justify-center py-4 border-b-2 border-primary"
      >
        <img src={image4} alt="logo" className="w-40 h-40" />
      </Link>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        className="font-poppins text-black"
        style={{
          borderRightColor: "transparent",
          background: "transparent",
          marginTop: "30px",
        }}
        items={menuItems.map((item) => ({
          ...item,
          label: <span className="">{item.label}</span>,
          children: item.children
            ? item.children.map((subItem) => ({
                ...subItem,
                label: <span className="">{subItem.label}</span>,
              }))
            : undefined,
        }))}
      />

      {/* Logout Confirmation Modal */}
      <Modal
        centered
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
