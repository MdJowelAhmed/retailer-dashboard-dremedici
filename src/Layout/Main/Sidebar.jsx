import { Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import image4 from "../../assets/image4.png";
import {
  Dashboard,
  InventoryManagement,
  LoyaltyProgram,
  RetailersManagement,
  SalesManagement,
  SalesRepsManagement,
  Settings,
  SubscriptionManagement,
} from "../../components/common/svg";

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

  // Function to check if a menu item is active
  const isItemActive = (itemKey) => {
    return (
      selectedKey === itemKey ||
      (itemKey === "subMenuSetting" &&
        ["/profile", "/terms-and-conditions", "/privacy-policy"].includes(
          selectedKey
        ))
    );
  };

  // Modified renderIcon function to use className approach
  const renderIcon = (IconComponent, itemKey) => {
    const isActive = isItemActive(itemKey);
    return (
      <div
        style={{ width: 24, height: 24 }}
        className={isActive ? "svg-active" : ""}
      >
        <IconComponent
          className="menu-icon"
          fill={isActive ? "#ffffff" : "#1E1E1E"}
        />
      </div>
    );
  };

  const menuItems = [
    {
      key: "/",
      icon: renderIcon(Dashboard, "/"),
      label: <Link to="/">Dashboard Overview</Link>,
    },
    {
      key: "/orders",
      icon: renderIcon(SalesManagement, "/orders"),
      label: <Link to="/orders">My Orders</Link>,
    },
    {
      key: "/subscription",
      icon: renderIcon(SubscriptionManagement, "/subscription"),
      label: <Link to="/subscription">Subscription</Link>,
    },
    {
      key: "/loyaltyProgram",
      icon: renderIcon(LoyaltyProgram, "/loyaltyProgram"),
      label: <Link to="/loyaltyProgram">Loyalty Program</Link>,
    },
    {
      key: "subMenuSetting",
      icon: renderIcon(Settings, "subMenuSetting"),
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
      icon: (
        <IoIosLogOut
          size={24}
          className={`menu-icon ${
            isItemActive("/logout") ? "text-white" : "text-black"
          }`}
        />
      ),
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
        <img src={image4} alt="logo" className="w-40 h-32" />
      </Link>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        className="font-poppins text-black sidebar-menu"
        style={{
          borderRightColor: "transparent",
          background: "transparent",
          marginTop: "30px",
          // padding: "0px 30px"
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
        okButtonProps={{
          style: {
            backgroundColor: "#6200EE",
            color: "white",
          },
        }}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
