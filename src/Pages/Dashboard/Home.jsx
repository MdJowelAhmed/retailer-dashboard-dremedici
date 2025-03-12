import React from "react";
import { FaCalendarDay, FaDollarSign } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { MdArrowUpward, MdOutlineHome } from "react-icons/md";
import { PiHouseLine } from "react-icons/pi";
import { Bar } from "react-chartjs-2";
import LineChart from "./LineChart"; 

import OrderTable from "../../components/home/OrderTable";
import SalesLeaderBoard from "../../components/home/SalesLeaderBoard";
import HomeCard from "../../components/home/HomeCard";



const Home = () => {
  

  return (
    <div className="">
     <HomeCard />

      <div className=" mt-12">

        <OrderTable />
        {/* <SalesLeaderBoard /> */}
      </div>
    </div>
  );
};

export default Home;
