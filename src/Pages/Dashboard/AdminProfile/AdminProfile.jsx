import { Tabs } from "antd";
import React, { useEffect } from "react";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import Payment from "../../../components/Payment";

const AdminProfile = () => {
  const items = [
    {
      key: "1",
      label: "Edit Profile",
      children: <UserProfile />,
    },
    {
      key: "2",
      label: "Change Password",
      children: <ChangePassword />,
    },
      //  {
      //   key: "3",
      //   label: "Payment Method",
      //   children: <Payment />,
      // },
    
  ];

  // Apply custom styles when the component mounts
  useEffect(() => {
    // Add custom styles to ensure tab text is white
    const style = document.createElement("style");
    style.innerHTML = `
      /* Ensure tab label is white */
      .ant-tabs-tab .ant-tabs-tab-btn {
        color: white !important;
      }
      /* Active tab color */
      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: white !important;
        font-weight: bold;
      }
      /* Hover tab label color */
      .ant-tabs-tab:hover .ant-tabs-tab-btn {
        color: white !important;
      }
      /* Ink bar color (the line under the active tab) */
      .ant-tabs-ink-bar {
        background-color: white !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <div className="w-full max-w-4xl p-6 mx-auto text-white bg-primary rounded-xl">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default AdminProfile;