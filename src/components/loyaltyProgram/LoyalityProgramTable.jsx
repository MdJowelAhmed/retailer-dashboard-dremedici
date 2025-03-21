import React, { useState } from "react";
import { Card, Checkbox, Modal, Form, Input, Button, Row, Col } from "antd";
import { StarFilled } from "@ant-design/icons";
import GradientButton from "../common/GradiantButton";
import { FaRegEdit } from "react-icons/fa";

const LoyalityProgramTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // For the edit modal
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [updatedFacilities, setUpdatedFacilities] = useState(""); // State to hold updated facilities

  const subscriptionPlans = [
    {
      id: 1,
      tier: "Silver Tier",
      icon: (
        <StarFilled className="text-white text-3xl bg-primary p-2 rounded-full  mr-2" />
      ),
      facilities: "Subscription : 3 boxes per month",
      benefits: [
        "Free Shipping – Included with subscription orders",
        "No Credit Card Fee – No 3% fee on any order",
        "Exclusive Products – Access to subscription-only items",
        "Flash Discounts – Special exclusive offers",
        "Limited Releases – Priority access with a larger allocation",
      ],
    },
    {
      id: 2,
      tier: "Gold Tier",
      icon: (
        <StarFilled className="text-white text-3xl bg-primary p-2 rounded-full  mr-2" />
      ),
      facilities: "Gold Tier : 4 boxes per month + 1 free box per quarter",
      benefits: [
        "Free Shipping – Included with subscription orders",
        "No Credit Card Fee – No 3% fee on any order",
        "Exclusive Products – Access to subscription-only items",
        "Flash Discounts – Special exclusive offers",
        "Limited Releases – Priority access with a larger allocation",
      ],
    },
    {
      id: 3,
      tier: "Platinum Tier",
      icon: (
        <StarFilled className="text-white text-3xl bg-primary p-2 rounded-full  mr-2" />
      ),
      facilities:
        "Platinum Tier : 5 boxes per month + 2 free boxes per quarter",
      benefits: [
        "Free Shipping – Included with subscription orders",
        "No Credit Card Fee – No 3% fee on any order",
        "Exclusive Products – Access to subscription-only items",
        "Flash Discounts – Special exclusive offers",
        "Limited Releases – Priority access with a larger allocation",
      ],
    },
  ];

  const showModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalVisible(true);
  };

  const showEditModal = (plan) => {
    setSelectedPlan(plan);
    setUpdatedFacilities(plan.facilities); // Populate the form with the current facilities
    setIsEditModalVisible(true); // Open the edit modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setSelectedPlan(null);
  };

  const handleSubmitPayment = (values) => {
    console.log("Payment details: ", values);
    handleCancel(); // Close the modal after submission
  };

  const handleUpdateFacilities = () => {
    // Update the facilities of the selected plan
    const updatedPlans = subscriptionPlans.map((plan) =>
      plan.id === selectedPlan.id
        ? { ...plan, facilities: updatedFacilities }
        : plan
    );
    console.log("Updated Plan:", updatedPlans);
    setIsEditModalVisible(false); // Close the edit modal
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Loyalty Program Tier: Gold</h1>
        <div>
          <h2 className="font-bold mb-2">Loyalty Progress</h2>
          <div className="w-1/2 h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#336C79] rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <div>
            <p className="font-medium">60% to the next reward.</p>
            <p>
              You have placed 15 non-subscription orders. Spend $500 more to
              reach the next reward tier.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-16">
        Choose Your Subscription
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`transition-all rounded-xl font-semibold`}
          >
            <div className="flex flex-col justify-center items-center mb-4 ">
              <p className="">{plan.icon}</p>
              <h3 className="text-3xl font-bold mt-3">{plan.tier}</h3>
            </div>
            <div className="absolute right-10 top-10">
              <FaRegEdit size={32} onClick={() => showEditModal(plan)} />
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-3 mb-6">
              <li>{plan.facilities}</li>
            </ul>
            <ul className="list-disc pl-5 text-gray-600 space-y-3 mb-6">
              {plan.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <Checkbox className="mb-4">
              I Agree to the terms & conditions
            </Checkbox>
            <br />
            <GradientButton
              block
              className="bg-blue-500 text-white h-10 font-semibold"
              onClick={() => showModal(plan)}
            >
              Choose Your Best Plan
            </GradientButton>
          </Card>
        ))}
      </div>

      {/* Payment Form Modal */}
      <Modal
        title={`Payment for ${selectedPlan?.tier}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmitPayment}>
          <Form.Item
            name="nameOnCard"
            label="Name On Card"
            rules={[
              { required: true, message: "Please enter the name on the card" },
            ]}
          >
            <Input placeholder="Name On Card" />
          </Form.Item>

          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              { required: true, message: "Please enter your card number" },
            ]}
          >
            <Input placeholder="Card Number" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="expiry"
                label="MM/YY"
                rules={[
                  { required: true, message: "Please enter the expiry date" },
                ]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cvc"
                label="CVC"
                rules={[{ required: true, message: "Please enter the CVC" }]}
              >
                <Input placeholder="CVC" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="zipCode"
            label="Zip Code"
            rules={[{ required: true, message: "Please enter your zip code" }]}
          >
            <Input placeholder="Zip Code" />
          </Form.Item>

          <Form.Item>
            <GradientButton
              type="primary"
              htmlType="submit"
              block
              className="bg-green-500 text-white h-10 font-semibold"
            >
              Confirm Payment
            </GradientButton>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Facilities Modal */}
      <Modal
        title="Edit Facilities"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item
            name="facilities"
            label="Facilities"
            initialValue={selectedPlan?.facilities}
            rules={[{ required: true, message: "Please enter the facilities" }]}
          >
            <Input.TextArea
              rows={4}
              value={updatedFacilities}
              onChange={(e) => setUpdatedFacilities(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <GradientButton
              type="primary"
              onClick={handleUpdateFacilities}
              // className="bg-green-500 text-white"
            >
              Update Facilities
            </GradientButton>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoyalityProgramTable;
