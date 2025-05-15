import React, { useState, useEffect } from "react";
import { Card, Checkbox, Modal, Button, message } from "antd";
import { StarFilled } from "@ant-design/icons";
import { FaRegEdit } from "react-icons/fa";
import GradientButton from "../common/GradiantButton";
import PaymentModal from "./PaymentForm";
import { useBuySubcriptionPackageMutation, useGetSubscriptionsQuery } from "../../redux/apiSlices/subscriptionPackage";

const LoyaltyProgramTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [agreements, setAgreements] = useState({});
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const { data } = useGetSubscriptionsQuery();
  const packages = data?.data;
  const [buySubcriptionPackage]=useBuySubcriptionPackageMutation()

  useEffect(() => {
    if (packages && packages.length > 0) {
      const mappedPlans = packages.map((pkg) => {
        // Map the button color based on subscription tier
        let buttonColor = "#4E9DAB"; // Default (Silver)
        if (pkg.subscription.includes("Gold")) {
          buttonColor = "#379683";
        } else if (pkg.subscription.includes("Platinum")) {
          buttonColor = "#379754";
        }

        // Create benefits array from API data
        const benefits = [
          `Free Shipping – ${pkg.freeShipping}`,
          `No Credit Card Fee – ${pkg.noCreditCardFee}`,
          `Exclusive Products – ${pkg.exclusiveProducts}`,
          `Flash Discounts – Special exclusive offers`,
          `Limited Releases – ${pkg.limitedReleases}`,
        ];

        return {
          id: pkg._id,
          tier: pkg.subscription,
          facilities: pkg.tier,
          buttonColor,
          benefits,
        };
      });

      setSubscriptionPlans(mappedPlans);
    }
  }, [packages]);
  
  const selectedPlan = subscriptionPlans.find(
    (plan) => plan.id === selectedPlanId
  );

  useEffect(() => {
    const savedPlanId = localStorage.getItem("selectedPlanId");
    if (savedPlanId) {
      setSelectedPlanId(savedPlanId);
    }
  }, []);

  const handlePlanSelect = (plan) => {
    if (!agreements[plan.id]) {
      message.warning("Please agree to the terms & conditions first");
      return;
    }
    setSelectedPlanId(plan.id);
    localStorage.setItem("selectedPlanId", plan.id.toString());
    setIsModalVisible(true); // Open payment modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitPayment = async (values) => {
    try {
      // Get the selected plan details
      const plan = subscriptionPlans.find(p => p.id === selectedPlanId);
      
      // Extract benefits data from plan
      const freeShipping = plan.benefits[0].split('–')[1].trim();
      const noCreditCardFee = plan.benefits[1].split('–')[1].trim();
      const exclusiveProducts = plan.benefits[2].split('–')[1].trim();
      const limitedReleases = plan.benefits[4].split('–')[1].trim();
      
      // Format the data according to the required structure
      const paymentData = {
        tier: plan.tier,
        subscription: plan.tier,
        freeShipping: freeShipping,
        noCreditCardFee: noCreditCardFee,
        exclusiveProducts: exclusiveProducts,
        limitedReleases: limitedReleases,
        termsAndConditionsAccepted: agreements[plan.id] || false,
        termsAndConditions: "By subscribing, you agree to our terms and conditions...",
        card: {
          cardHolderName: values.cardHolderName,
          cardNumber: values.cardNumber,
          expiryDate: values.expiryDate,
          cvv: values.cvv,
          zipCode: values.zipCode
        }
      };
      
      console.log("Payment payload:", paymentData);
      
      // Call the mutation
      const response = await buySubcriptionPackage(paymentData).unwrap();
      
      if (response?.success) {
        // Handle success
        message.success("Subscription payment confirmed successfully!");
        localStorage.removeItem("selectedPlanId");
        setSelectedPlanId(null);
        setAgreements({});
        handleCancel();
      } else {
        message.error(response?.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      message.error(error?.data?.message || "Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  };

  const startEditing = (plan) => {
    setEditingPlanId(plan.id);
    setEditedText(plan.facilities);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const saveChanges = (planId) => {
    setSubscriptionPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              facilities: editedText,
            }
          : plan
      )
    );
    setEditingPlanId(null);
  };

  const cancelEditing = () => {
    setEditingPlanId(null);
  };

  const handleTermsChange = (planId, checked) => {
    setAgreements((prev) => ({
      ...prev,
      [planId]: checked,
    }));
  };

  const showTermsModal = () => {
    setIsTermsModalVisible(true);
  };

  const handleTermsModalCancel = () => {
    setIsTermsModalVisible(false);
  };

  const termsAndConditions = `
  # Terms and Conditions
  
  ## Subscription Agreement
  
  1. **Billing Cycle**: Your subscription will be billed automatically on a monthly basis.
  
  2. **Cancellation Policy**: You may cancel your subscription at any time. Cancellations will take effect at the end of your current billing cycle.
  
  3. **Delivery**: We aim to deliver your boxes within 3-5 business days of your billing date.
  
  4. **Box Contents**: The contents of each box are curated by our team and may vary. All items are final sale.
  
  5. **Free Boxes**: Free boxes for Gold and Platinum tiers will be delivered with your regular subscription in the final month of each quarter.
  
  6. **Shipping Policy**: Free shipping applies to all subscription orders. Additional purchases outside of your subscription may incur shipping fees.
  
  7. **Credit Card Fees**: Subscription orders are exempt from the standard 3% credit card processing fee.
  
  8. **Exclusive Access**: Subscription members will receive early access to limited releases and exclusive products.
  
  9. **Flash Discounts**: Special offers will be communicated via email to all active subscribers.
  
  10. **Changes to Terms**: We reserve the right to modify these terms and conditions at any time with notice to subscribers.
  `;

  const renderPlanIcon = (tier) => {
    return (
      <StarFilled className="text-white text-3xl bg-primary p-2 rounded-full mr-2" />
    );
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-10">Choose Your Subscription</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-10">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`transition-all rounded-xl font-semibold shadow-xl ${
              selectedPlanId === plan.id
                ? "border-2 border-[#379683] shadow-lg"
                : ""
            }`}
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "400px", 
              position: "relative", 
            }}
          >
            <div className="flex flex-col justify-center items-center mb-4">
              <p>{renderPlanIcon(plan.tier)}</p>
              <h3 className="text-3xl font-bold mt-3">{plan.tier}</h3>
            </div>

            {/* Conditional rendering for edit icon */}
            {editingPlanId !== plan.id && (
              <div className="absolute right-5 top-34">
                <FaRegEdit
                  size={20}
                  onClick={() => startEditing(plan)}
                  className="cursor-pointer hover:text-blue-500"
                />
              </div>
            )}

            <div className="flex-grow">
              <ul className="list-disc pl-5 text-gray-600 space-y-3 mb-6">
                <li>
                  {editingPlanId === plan.id ? (
                    <div>
                      <textarea
                        value={editedText}
                        onChange={handleTextChange}
                        autoFocus
                        className="w-full p-2 border rounded mb-2"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <GradientButton
                          type="primary"
                          onClick={() => saveChanges(plan.id)}
                        >
                          Save
                        </GradientButton>
                        <Button onClick={cancelEditing} className="h-10">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    plan.facilities
                  )}
                </li>
              </ul>
              <ul className="list-disc pl-5 text-gray-600 space-y-3 mb-6">
                {plan.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <div className="mb-4">
                <Checkbox
                  checked={agreements[plan.id] || false}
                  onChange={(e) => handleTermsChange(plan.id, e.target.checked)}
                >
                  I Agree to the{" "}
                  <span
                    onClick={showTermsModal}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    terms & conditions
                  </span>
                </Checkbox>
              </div>
            </div>

            <div className="mt-auto mb-4">
              <button
                block
                style={{ backgroundColor: plan.buttonColor }}
                className="h-10 font-semibold text-white px-4 p-2 rounded-md w-full"
                onClick={() => handlePlanSelect(plan)}
              >
                {selectedPlanId === plan.id
                  ? "Selected Plan"
                  : "Choose Your Best Plan"}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isVisible={isModalVisible}
        onCancel={handleCancel}
        selectedPlan={selectedPlan}
        onSubmit={handleSubmitPayment}
      />

      {/* Terms Modal */}
      <Modal
        title="Terms and Conditions"
        visible={isTermsModalVisible}
        onCancel={handleTermsModalCancel}
        footer={[
          <Button key="back" onClick={handleTermsModalCancel}>
            Close
          </Button>,
        ]}
        width={700}
      >
        <div className="p-4 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {termsAndConditions}
          </pre>
        </div>
      </Modal>
    </div>
  );
};

export default LoyaltyProgramTable;
