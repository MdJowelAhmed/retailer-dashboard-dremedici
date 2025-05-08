import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/apiSlices/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!email) {
      message.error("Email is required for password reset");
      navigate("/auth/login");
    }
  }, [email, navigate]);

const onFinish = async (values) => {
  console.log(values);
  setLoading(true); 
  try {
    const response = await resetPassword({
      email,
      newPassword: values.password, 
      confirmPassword: values.confirmPassword,
    }).unwrap();

    
    if (response.success) {
      message.success("Password has been reset successfully!");
      navigate("/auth/login"); 
    } else {
      message.error(
        response.message || "Failed to reset password. Please try again."
      );
    }
  } catch (err) {
    message.error(
      err?.data?.message || "Failed to reset password. Please try again."
    );
  } finally {
    setLoading(false); 
  }
};


  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
        <p className="w-[90%] mx-auto text-base">
          Create a new password for your account
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          label={<p>New Password</p>}
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password
            placeholder="Enter your new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<p>Confirm New Password</p>}
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your new password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
            loading={loading}
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
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
