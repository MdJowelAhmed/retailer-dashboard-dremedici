import React, { useState } from "react";
import {
  Gift,
  Package,
  Percent,
  CreditCard,
  ShoppingBag,
  Trophy,
  Star,
  Award,
  CheckCircle,
  Clock,
  Lock,
  Loader2,
} from "lucide-react";
import {
  useLoyaltiProgramQuery,
  useGetReedemButtonMutation,
} from "../../redux/apiSlices/loyaltiProgramApi";
import Spinner from "../../components/common/Spinner";

const LoyaltyProgram = () => {
  const { data, isLoading, refetch } = useLoyaltiProgramQuery();
  const [getReedemButton, { isLoading: isRedeeming }] =
    useGetReedemButtonMutation();
  const [redeemingId, setRedeemingId] = useState(null);

  console.log(data);

  // Use a generic icon mapping function
  const getRewardIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (
      lowerTitle.includes("free delivery") ||
      lowerTitle.includes("shipping")
    ) {
      return <Package size={24} />;
    } else if (lowerTitle.includes("off") || lowerTitle.includes("discount")) {
      return <Percent size={24} />;
    } else if (lowerTitle.includes("gift")) {
      return <Gift size={24} />;
    } else if (lowerTitle.includes("card")) {
      return <CreditCard size={24} />;
    } else if (lowerTitle.includes("premium") || lowerTitle.includes("item")) {
      return <ShoppingBag size={24} />;
    } else {
      return <Award size={24} />;
    }
  };

  // Function to handle reward redemption
  const handleRedeemReward = async (rewardId) => {
    try {
      setRedeemingId(rewardId);
      const result = await getReedemButton(rewardId).unwrap();

      // Show success message or handle success
      console.log("Reward redeemed successfully:", result);

      // Refetch the loyalty data to update the UI
      refetch();
    } catch (error) {
      console.error("Failed to redeem reward:", error);
      // Handle error - show toast notification, etc.
    } finally {
      setRedeemingId(null);
    }
  };

  // Function to determine reward status
  const getRewardStatus = (reward, currentSpend, redeemedRewards) => {
    // Check if reward is redeemed (either from API response or isRedeemed flag)
    const isRedeemed =
      reward.isRedeemed ||
      redeemedRewards.some(
        (redeemedReward) => redeemedReward._id === reward._id
      );

    if (isRedeemed) {
      return { status: "completed", label: "Completed", color: "bg-green-500" };
    }

    if (currentSpend >= reward.target) {
      return { status: "available", label: "Available", color: "bg-[#6200EE]" };
    }

    // Find if this is the current running target
    const sortedRewards = [...availableRewards].sort(
      (a, b) => a.target - b.target
    );
    const currentRunningReward = sortedRewards.find(
      (r) =>
        currentSpend < r.target &&
        !r.isRedeemed &&
        !redeemedRewards.some((red) => red._id === r._id)
    );

    if (currentRunningReward && currentRunningReward._id === reward._id) {
      return { status: "running", label: "Running", color: "bg-orange-500" };
    }

    return { status: "locked", label: "Locked", color: "bg-gray-400" };
  };

  // Function to get progress percentage for a specific reward
  const getProgressPercentage = (reward, currentSpend) => {
    const percentage = (currentSpend / reward.target) * 100;
    return Math.min(percentage, 100);
  };

  // Function to get the current running reward
  const getCurrentRunningReward = (rewards, currentSpend, redeemedRewards) => {
    const sortedRewards = [...rewards].sort((a, b) => a.target - b.target);
    return sortedRewards.find(
      (reward) =>
        currentSpend < reward.target &&
        !reward.isRedeemed &&
        !redeemedRewards.some((red) => red._id === reward._id)
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div className="p-6 text-center">No loyalty data available</div>;
  }

  // Extract data from API response
  const { loyalty, availableRewards } = data?.data;
  const currentSpend = loyalty?.totalSpent || 0;
  const memberSince = new Date(loyalty?.memberSince)?.toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long" }
  );
  const memberId = loyalty?.memberId;
  const redeemedRewards = loyalty?.rewardsRedeemed || [];

  // Get current running reward
  const currentRunningReward = getCurrentRunningReward(
    availableRewards,
    currentSpend,
    redeemedRewards
  );

  // Sort rewards by target amount
  const sortedRewards = [...availableRewards].sort(
    (a, b) => a.target - b.target
  );

  return (
    <div className="px-10 mx-auto space-y-8">
      {/* Hero Section */}
      <div className="p-6 text-white shadow-lg bg-primary rounded-xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy size={28} />
              <h1 className="text-3xl font-bold">Loyalty Program</h1>
            </div>
            <p>
              Welcome back! Join the Loyalty Program and enjoy exclusive rewards
              based on your spending. <br /> As a member, you will unlock
              amazing benefits by reaching spending targets. <br /> Keep
              shopping to unlock more rewards and enjoy special discounts!
            </p>
          </div>

          {/* Loyalty Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl w-full md:w-96 h-64 shadow-xl flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full bg-primary opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-10 -ml-10 rounded-full bg-primary opacity-10"></div>

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Spent</p>
                <h3 className="text-2xl font-bold text-white">
                  ${currentSpend.toLocaleString()}
                </h3>
              </div>
              <Star fill="#FFD700" color="#FFD700" size={32} />
            </div>

            {/* Current Running Reward Progress */}
            {currentRunningReward && (
              <div className="mt-4">
                <div className="flex justify-between mb-1 text-xs text-gray-400">
                  <span>Current Target: {currentRunningReward.title}</span>
                  <span>
                    ${currentSpend.toLocaleString()} / $
                    {currentRunningReward.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-[#6200EE] h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${getProgressPercentage(
                        currentRunningReward,
                        currentSpend
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Spend $
                  {(
                    currentRunningReward.target - currentSpend
                  ).toLocaleString()}{" "}
                  more to unlock this reward
                </p>
              </div>
            )}

            {!currentRunningReward && (
              <div className="mt-4">
                <p className="text-sm text-green-400">
                  🎉 All available rewards unlocked! Keep shopping for future
                  rewards.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Member Since</p>
              <p className="text-white">{memberSince}</p>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-sm text-gray-400">{memberId}</div>
              <div className="text-xs text-gray-400">
                {redeemedRewards.length} rewards redeemed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-xl font-bold">Rewards Overview</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRewards?.map((reward) => {
            const rewardStatus = getRewardStatus(
              reward,
              currentSpend,
              redeemedRewards
            );
            const progressPercentage = getProgressPercentage(
              reward,
              currentSpend
            );
            const isRunning = rewardStatus.status === "running";
            const isCompleted = rewardStatus.status === "completed";
            const isAvailable = rewardStatus.status === "available";

            return (
              <div
                key={reward?._id}
                className={`rounded-xl p-5 transition-all duration-300 border-2 ${
                  isCompleted
                    ? "border-green-500 bg-green-50"
                    : isAvailable
                    ? "border-[#6200EE] bg-[#6200EE]/10"
                    : isRunning
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 bg-gray-50"
                } ${isRunning ? "shadow-lg scale-105" : "hover:shadow-md"}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isCompleted
                        ? "bg-green-100"
                        : isAvailable
                        ? "bg-[#6200EE]/20"
                        : isRunning
                        ? "bg-orange-100"
                        : "bg-gray-200"
                    }`}
                  >
                    {getRewardIcon(reward?.title)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {reward?.title}
                      </h3>
                      {isCompleted && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                      {isRunning && (
                        <Clock size={16} className="text-orange-500" />
                      )}
                      {rewardStatus.status === "locked" && (
                        <Lock size={16} className="text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {reward?.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-xs text-gray-500">
                        <span>Target: ${reward.target.toLocaleString()}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isCompleted
                              ? "bg-green-500"
                              : isAvailable
                              ? "bg-[#6200EE]"
                              : isRunning
                              ? "bg-orange-500"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          isCompleted
                            ? "bg-green-100 text-green-800"
                            : isAvailable
                            ? "bg-[#6200EE]/20 text-[#6200EE]"
                            : isRunning
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {rewardStatus.label}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg text-white font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                          isAvailable && !isRedeeming
                            ? "bg-[#6200EE] hover:bg-[#5200CC] transform hover:scale-105"
                            : isCompleted
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isAvailable || isRedeeming}
                        onClick={() =>
                          isAvailable && handleRedeemReward(reward._id)
                        }
                      >
                        {redeemingId === reward._id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Redeeming...
                          </>
                        ) : (
                          <>
                            {isCompleted
                              ? "Completed"
                              : isAvailable
                              ? "Redeem Now"
                              : isRunning
                              ? `${(
                                  reward.target - currentSpend
                                ).toLocaleString()} more`
                              : "Locked"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
