import React, { useState, useEffect } from "react";
import {
  Card,
  Checkbox,
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
} from "antd";
import { StarFilled } from "@ant-design/icons";
import GradientButton from "../common/GradiantButton";
import { FaRegEdit } from "react-icons/fa";

const LoyalityProgramTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [agreements, setAgreements] = useState({}); // Track agreements per plan
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

  useEffect(() => {
    // Load selected plan from localStorage if exists
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(JSON.parse(savedPlan));
    }
  }, []);

  const handlePlanSelect = (plan) => {
    if (!agreements[plan.id]) {
      message.warning("Please agree to the terms & conditions first");
      return;
    }
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitPayment = (values) => {
    console.log("Payment details: ", values);
    message.success("Payment confirmed successfully!");
    localStorage.removeItem("selectedPlan");
    setSelectedPlan(null);
    setAgreements({}); // Clear all agreements
    handleCancel();
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Subscription</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`transition-all rounded-xl font-semibold ${
              selectedPlan?.id === plan.id
                ? "border-2 border-blue-500 shadow-lg"
                : ""
            }`}
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
                  <div>
                    <textarea
                      value={editedText}
                      onChange={handleTextChange}
                      autoFocus
                      className="w-full p-2 border rounded mb-2"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button
                        type="primary"
                        onClick={() => saveChanges(plan.id)}
                        className="bg-blue-500"
                      >
                        Save
                      </Button>
                      <Button onClick={cancelEditing}>Cancel</Button>
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
            <Checkbox
              checked={agreements[plan.id] || false}
              onChange={(e) => handleTermsChange(plan.id, e.target.checked)}
              className="mb-4"
            >
              I Agree to the terms & conditions
            </Checkbox>
            <br />
            <GradientButton
              block
              className={`h-10 font-semibold ${
                selectedPlan?.id === plan.id
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {selectedPlan?.id === plan.id
                ? "Selected Plan"
                : "Choose Your Best Plan"}
            </GradientButton>
          </Card>
        ))}
      </div>

      <Modal
        title="Confirm Payment"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmitPayment}>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please input your card number!" },
            ]}
          >
            <Input placeholder="1234 5678 9012 3456" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[
                  { required: true, message: "Please input expiry date!" },
                ]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[{ required: true, message: "Please input CVV!" }]}
              >
                <Input placeholder="123" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-500"
            >
              Confirm Payment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoyalityProgramTable;
