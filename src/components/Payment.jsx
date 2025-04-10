import React from "react";
import GradientButton from "./common/GradiantButton";
import { Checkbox, Form, Input } from "antd";

const Payment = () => {
  return (
    <div className="w-1/2 mx-auto mt-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-[15px]">
        Payment Gateway
      </h2>

      {/* Stripe Button */}
      <div className="flex justify-center mb-20">
        <GradientButton>Connect with Stripe</GradientButton>
      </div>

      {/* Account Section */}
      <div className="w-full mt-5">
        <h2 className="text-2xl font-bold text-center mb-[10px]">Account</h2>

        {/* Password Change Input */}
        <Form.Item
          name="account_password"
          label="Account Password"
          rules={[
            {
              required: true,
              message: "Please enter your account password!",
            },
          ]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              border: "1px solid #E0E4EC",
              height: "40px",
              background: "white",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </Form.Item>

        <div className="flex justify-between items-center">
          {/* Checkbox for terms & conditions */}
          <div className="text-center">
            <Checkbox>I Agree to the terms & conditions</Checkbox>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center ">
            <GradientButton
              type="primary"
              htmlType="submit"
              block
              style={{ width: "50%" }}
            >
              Deactivate
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
