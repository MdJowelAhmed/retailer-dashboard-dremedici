import React from 'react'
import LoyalityProgramTable from '../../components/loyaltyProgram/LoyalityProgramTable'
import LoyalityCard from '../../components/loyaltyProgram/LoyalityCard'
import PaymentForm from '../../components/loyaltyProgram/PaymentForm'

const rewards = [
  {
    title: "Free Shipping",
    pointsNeeded: 0,
    userPoints: 1000,
  },
  {
    title: "10% Off Next Order",
    pointsNeeded: 1100,
    userPoints: 1000,
  },
  {
    title: "$100 Gift Card",
    pointsNeeded: 2000,
    userPoints: 1000,
  },
];

const LoyaltyProgram = () => {
  return (
    <div className=" space-y-8">
      {/* <LoyalityProgramTable /> */}
      {/* <PaymentForm /> */}
      <div className="flex justify-between items-center ">
        <div className="mb-8 w-full">
          <h1 className="text-2xl font-bold mb-4">Subscription: Gold</h1>
          <div>
            <h2 className="font-bold mb-2">Loyalty Progress</h2>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#336C79] rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* <LoyalityCard /> */}
      </div>

      <div className="bg-[#fcf5e9] p-6 rounded-lg  mx-auto">
        <h2 className="text-lg font-bold mb-4">Available Rewards</h2>
        <div className="space-y-3">
          {rewards.map((reward, index) => {
            const canRedeem = reward.userPoints >= reward.pointsNeeded;
            const pointsShort = reward.pointsNeeded - reward.userPoints;

            return (
              <div
                key={index}
                className="flex justify-between items-center border border-teal-500 rounded-md px-4 py-3 bg-white"
              >
                <div className=''>
                  <p className="font-medium">{reward.title}</p>
                  {!canRedeem && (
                    <p className="text-sm text-gray-600">
                      You Need More {pointsShort} Points For this Reward
                    </p>
                  )}
                </div>
                <button
                  className={`px-4 py-2 rounded text-white font-semibold ${
                    canRedeem
                      ? "bg-teal-600 hover:bg-teal-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!canRedeem}
                >
                  Redeem
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LoyaltyProgram
