import React, { useState } from "react";
import { Card, Checkbox, Modal, Form, Input, Button, Row, Col } from "antd";
import { StarFilled, HeartFilled } from "@ant-design/icons";
import GradientButton from "../common/GradiantButton";
import { FaRegEdit } from "react-icons/fa";

const LoyalityProgramTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [subscriptionPlans, setSubscriptionPlans] = useState([
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
  ]);

  const showModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPlan(null);
  };

  const handleSubmitPayment = (values) => {
    console.log("Payment details: ", values);
    handleCancel();
  };

  const startEditing = (plan) => {
    setEditingPlanId(plan.id);
    setEditedText(plan.facilities);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e, planId) => {
    if (e.key === "Enter") {
      saveChanges(planId);
    }
  };

  const saveChanges = (planId) => {
    setSubscriptionPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              facilities: (
                <span>
                  <HeartFilled className="text-red-500" /> {editedText}
                </span>
              ),
            }
          : plan
      )
    );
    setEditingPlanId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Subscription</h2>
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
              <FaRegEdit
                size={32}
                onClick={() => startEditing(plan)}
                className="cursor-pointer hover:text-blue-500"
              />
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-3 mb-6">
              <li>
                {editingPlanId === plan.id ? (
                  <textarea
                    value={editedText}
                    onChange={handleTextChange}
                    onKeyDown={(e) => handleKeyDown(e, plan.id)}
                    autoFocus
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
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
    </div>
  );
};

export default LoyalityProgramTable;
