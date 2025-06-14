import React from "react";
import { FaUsers } from "react-icons/fa6"; // Static icon import
import { useSummaryQuery } from "../../redux/apiSlices/homeSlice";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";

const HomeCard = () => {
  const { data } = useSummaryQuery();
  const cardData = data?.data;

  // Format number to currency string like $14,396.90
  const formatCurrency = (num) => {
    if (typeof num !== "number") return "-";
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 h-[120px] mb-9">
      <SalesRepsCard
        icon={FaDollarSign}
        value={formatCurrency(cardData?.totalPurchaseAmount)}
        label="Total Purchased"
      />
      <SalesRepsCard
        icon={FaShoppingCart}
        value={cardData?.totalOrderCompleate ?? 0}
        label="Total Orders Placed"
      />
    </div>
  );
};

const SalesRepsCard = ({ icon: Icon, value, label }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary shadow-lg rounded-lg p-2 lg:p-6 flex items-center justify-between gap-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-center gap-4">
        <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-[#EFEFEF] flex items-center justify-center">
          <Icon color="#007BA5" size={40} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm lg:text-[32px] font-semibold">
            {value}
          </h3>
          <h2 className="text-white text-sm lg:text-center lg:text-base">
            {label}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
