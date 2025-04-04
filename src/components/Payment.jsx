import React from 'react';
import GradientButton from './common/GradiantButton';
import { Checkbox, Form, Input } from 'antd';

const Payment = () => {
    return (
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-[55px]">Payment Getway</h2>
        <div className="">
          <GradientButton>Connect with Stripe</GradientButton>
        </div>

        {/* Account Section */}
        <div className="w-full mt-5">
          <h2 className="text-2xl font-bold mb-[5px] mt-9">Account</h2>

          {/* Add Checkbox for remembering password or any condition */}
          <Checkbox className="mb-2">
            I Agree to the terms & conditions
          </Checkbox>

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

          {/* Submit Button */}
          <div className="text-end">
            <GradientButton type="primary" htmlType="submit" block>
              Deactive
            </GradientButton>
          </div>
        </div>
      </div>
    );
};

export default Payment;