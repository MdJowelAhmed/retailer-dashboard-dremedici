import React from "react";
import { FaUsers } from "react-icons/fa6";

const HomeCard = () => {
  // Data for cards
  const cardData = [
    { icon: FaUsers, value: "$5000", label: "Total Buy" },
    { icon: FaUsers, value: "200", label: "Total Order Complete" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 h-[120px] mb-9">
      {cardData.map((data, index) => (
        <SalesRepsCard
          key={index}
          icon={data.icon}
          value={data.value}
          label={data.label}
        />
      ))}
    </div>
  );
};

// SalesRepsCard Component Inside the Same File
const SalesRepsCard = ({ icon: Icon, value, label }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary shadow-lg rounded-lg p-2 lg:p-6 flex items-center justify-between gap-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-center gap-4">
        <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-[#EFEFEF] flex items-center justify-center">
          <Icon color="#007BA5" size={40} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm  lg:text-[32px] font-semibold">
            {value}
          </h3>
          <h2 className="text-white text-sm lg:text-center lg:text-base">{label}</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
