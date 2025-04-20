import React from "react";
import {
  Gift,
  Package,
  Percent,
  CreditCard,
  ShoppingBag,
  Trophy,
  Star,
  Award,
} from "lucide-react";

const LoyaltyProgram = () => {
  const subscriptionTiers = [
    { name: "Silver", color: "#C0C0C0", rewardMultiplier: 1, minSpend: 0 },
    { name: "Gold", color: "#FFD700", rewardMultiplier: 1.5, minSpend: 2000 },
    { name: "Platinum", color: "#E5E4E2", rewardMultiplier: 2, minSpend: 5000 },
  ];

  const rewards = [
    {
      title: "Free Shipping",
      description: "Get free shipping on your next order",
      tierRequired: "Silver",
      icon: <Package size={24} />,
    },
    {
      title: "10% Off Next Order",
      description: "Save 10% on your next purchase",
      tierRequired: "Silver",
      icon: <Percent size={24} />,
      unlockSpend: 1000, // Unlock this reward after spending 1000
    },
    {
      title: "$10 Gift Card",
      description: "Receive a $25 gift card to use on any purchase",
      tierRequired: "Gold",
      icon: <Gift size={24} />,
    },
    {
      title: "$30 Gift Card",
      description: "Receive a $100 gift card to use on any purchase",
      tierRequired: "Gold",
      icon: <CreditCard size={24} />,
    },
    {
      title: "Free Premium Item",
      description: "Choose one premium item from our exclusive collection",
      tierRequired: "Platinum",
      icon: <ShoppingBag size={24} />,
    },
    {
      title: "VIP Event Access",
      description: "Exclusive invitation to our upcoming VIP events",
      tierRequired: "Platinum",
      icon: <Award size={24} />,
    },
  ];

  // User data
  const currentTier = "Silver";
  const currentSpend = 650; // Example: user has spent $650
  const currentTierData = subscriptionTiers.find(
    (tier) => tier.name === currentTier
  );
  const currentTierIndex = subscriptionTiers.findIndex(
    (tier) => tier.name === currentTier
  );
  const nextTier = subscriptionTiers[currentTierIndex + 1];

  // Calculate progress to next tier
  const progressToNextTier = nextTier
    ? Math.min(
        ((currentSpend - currentTierData.minSpend) /
          (nextTier.minSpend - currentTierData.minSpend)) *
          100,
        100
      )
    : 100;

  // Determine if a reward can be redeemed based on the current tier and spend
  const canUnlockReward = (reward) => {
    // If the reward has an unlockSpend condition, check if the user has spent enough
    if (reward.unlockSpend && currentSpend >= reward.unlockSpend) {
      return true; // Unlock reward based on spending amount
    }
    // Otherwise, check if the user's tier is equal to or above the required tier
    return (
      subscriptionTiers.findIndex((tier) => tier.name === currentTier) >=
      subscriptionTiers.findIndex((tier) => tier.name === reward.tierRequired)
    );
  };

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
              based on your tier. <br /> As a member, you will unlock amazing
              benefits, such as special discounts, <br /> early access to sales,
              personalized offers, and much more. The higher your tier, the
              greater the rewards!
            </p>
          </div>

          {/* Loyalty Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl w-full md:w-[500px] h-56 shadow-xl flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full bg-primary opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-10 -ml-10 rounded-full bg-primary opacity-10"></div>

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">Membership</p>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: currentTierData.color }}
                >
                  {currentTier}
                </h3>
              </div>
              <Star
                fill={currentTierData.color}
                color={currentTierData.color}
                size={32}
              />
            </div>

            {/* Progress Bar */}
            {nextTier && (
              <div className="mt-4">
                <div className="flex justify-between mb-1 text-xs text-gray-400">
                  <span>Progress to New Reward</span>
                  <span>
                    ${currentSpend} / ${nextTier.minSpend}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-[#6200EE] h-2.5 rounded-full"
                    style={{ width: `${progressToNextTier}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Spend ${nextTier.minSpend - currentSpend} more to reach{" "}
                  another reward
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Member Since</p>
              <p className="text-white">January 2025</p>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-sm text-gray-400">Member #12345678</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-lg font-bold">Available Rewards</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rewards.map((reward, index) => {
            const canRedeem = canUnlockReward(reward);
            return (
              <div
                key={index}
                className={`rounded-lg p-4 transition-all duration-300 border ${
                  canRedeem
                    ? "border-[#6200EE] bg-[#6200EE] hover:shadow-md"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      canRedeem ? "bg-white" : "bg-gray-200"
                    }`}
                  >
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        canRedeem ? "text-white" : "text-black"
                      }`}
                    >
                      {reward.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        canRedeem ? "text-white" : "text-black"
                      }`}
                    >
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-sm font-medium ${
                          canRedeem ? "text-white" : "text-black"
                        }`}
                      >
                        Tier: {reward.tierRequired}
                      </span>
                      <button
                        className={`px-4 py-2 rounded text-white font-medium text-sm transition-colors ${
                          canRedeem
                            ? "bg-third hover:bg-[#6250EE]"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={!canRedeem}
                      >
                        {canRedeem ? "Redeem" : "Unlock at this Tier"}
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
