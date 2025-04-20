import React, { useState } from "react";
import GradientButton from "./common/GradiantButton";
import { Form, Input, message } from "antd";

const Payment = () => {
  // Static data to simulate pre-filled form values
  const staticData = {
    cardholderName: "John Doe",
    cardNumber: "1234 5678 9876 5432",
    expirationDate: "12/24",
    cvv: "123",
  };

  // State for storing the input fields
  const [cardNumber, setCardNumber] = useState(staticData.cardNumber);
  const [expirationDate, setExpirationDate] = useState(
    staticData.expirationDate
  );
  const [cvv, setCvv] = useState(staticData.cvv);
  const [cardholderName, setCardholderName] = useState(
    staticData.cardholderName
  );

  // Handle input changes for each field
  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpirationDateChange = (e) => setExpirationDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);
  const handleCardholderNameChange = (e) => setCardholderName(e.target.value);

  const handleSubmit = () => {
    // Here, you can implement the logic to send the data to your backend or API
    console.log("Updated credit card info submitted:", {
      cardNumber,
      expirationDate,
      cvv,
      cardholderName,
    });

    // Display success message after updating the payment method
    message.success("Payment method updated successfully!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="w-1/2 mx-auto mt-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-[15px]">
          Update Payment Method
        </h2>

        {/* Credit Card Form */}
        <div className="w-full mt-5">
         

          {/* Cardholder's Name Input */}
          <Form.Item
            name="cardholder_name"
            label="Cardholder's Name"
            rules={[
              {
                required: true,
                message: "Please enter the cardholder's name!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              type="text"
              value={cardholderName}
              onChange={handleCardholderNameChange}
              placeholder="Enter cardholder's name"
              style={{
                border: "1px solid #E0E4EC",
                height: "40px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          {/* Card Number Input */}
          <Form.Item
            name="credit_card_number"
            label="Credit Card Number"
            rules={[
              {
                required: true,
                message: "Please enter your credit card number!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Enter your credit card number"
              style={{
                border: "1px solid #E0E4EC",
                height: "40px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          {/* Expiration Date Input */}
          <Form.Item
            name="expiration_date"
            label="Expiration Date"
            rules={[
              {
                required: true,
                message: "Please enter the expiration date!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              type="text"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              placeholder="MM/YY"
              style={{
                border: "1px solid #E0E4EC",
                height: "40px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          {/* CVV Input */}
          <Form.Item
            name="cvv"
            label="CVV"
            rules={[
              {
                required: true,
                message: "Please enter the CVV!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="Enter CVV"
              style={{
                border: "1px solid #E0E4EC",
                height: "40px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-between">
            {/* Submit Button */}
            <div className="flex justify-center">
              <GradientButton
                type="primary"
                htmlType="submit"
                block
                onClick={handleSubmit}
                style={{ width: "50%" }}
              >
                Update Payment Method
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
