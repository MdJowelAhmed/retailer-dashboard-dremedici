import {Checkbox, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import { useLoginMutation } from "../../redux/apiSlices/authSlice";


const Login = () => {
  const navigate = useNavigate();
   const [login, { isLoading, isError, error }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const response = await login(values).unwrap();

      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken);

        navigate("/");

        message.success("Login successful!");
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error?.data) {
        message.error(error?.data?.message || "Something went wrong.");
      } else {
        message.error("Server error, Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <FormItem name={"email"} label={"Email"} />

        <Form.Item
          name="password"
          label={<p>Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <a
            className="login-form-forgot  px-4 py-1 text-black rounded-md font-semibold"
            href="/auth/create-account"
          >
             Create Account
          </a>

          <a
            className="login-form-forgot bg-gradient-to-r from-primary  to-secondary px-4 py-1 text-white rounded-md font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 45,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",

              marginTop: 20,
            }}
            className="flex items-center justify-center bg-gradient-to-r from-primary  to-secondary rounded-lg"
          >
            Sign in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
