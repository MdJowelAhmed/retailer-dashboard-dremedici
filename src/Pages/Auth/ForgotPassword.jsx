import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); // Use isLoading from the hook

  const onFinish = async (values) => {
    
    try {
      const response = await forgotPassword({email:values.email}).unwrap();
      console.log(response);
      message.success("OTP sent to your email");

      navigate(`/auth/verify-otp?email=${values.email}&source=forgot`);
    } catch (err) {
      message.error(
        err?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
        <p className="w-[90%] mx-auto text-base">
          Enter your email below to reset your password
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={<p>Email</p>}
          name="email"
          id="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email address"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading} 
            style={{
              width: "100%",
              height: 45,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",
              marginTop: 20,
            }}
            className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-lg"
          >
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
