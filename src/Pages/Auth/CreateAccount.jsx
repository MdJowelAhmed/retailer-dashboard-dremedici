import React, { useState } from "react";
import { Form, Input, Button, Radio, Card, Typography, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useCreateAccountMutation } from "../../redux/apiSlices/authSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

export default function CreateAccount() {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState("retailer");
  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { name, email, password } = values;

    const accountData = {
      name,
      email,
      password,
      role: userType === "retailer" ? "RETAILER" : "SALES",
    };

    try {
      const response = await createAccount(accountData).unwrap();
      console.log(response);
      if (response.success) {
        message.success("Account created successfully!");
        form.resetFields();

        navigate(`/auth/verify-otp?email=${email}&source=register`);
      } else {
        message.error("Account creation failed. Please try again.");
      }
    } catch (err) {
      message.error(
        err?.data?.message || "An error occurred, please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md rounded-lg shadow-md border-slate-200">
        <Title level={2} className="text-center mb-6">
          Create an account
        </Title>

        <Form
          form={form}
          layout="vertical"
          name="register"
          onFinish={handleSubmit}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={
              <span className="font-medium">
                Name<span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              placeholder="Enter your name"
              className="rounded py-2 px-3"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span className="font-medium">
                Email<span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="rounded py-2 px-3"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span className="font-medium">
                Password<span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
            extra={
              <Text className="text-gray-500">
                Must be at least 8 characters.
              </Text>
            }
          >
            <Input.Password
              placeholder="Create a password"
              className="rounded py-2 px-3"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={
              <span className="font-medium">
                Confirm Password<span className="text-red-500">*</span>
              </span>
            }
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
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
            extra={
              <Text className="text-gray-500">
                Must be at least 8 characters.
              </Text>
            }
          >
            <Input.Password
              placeholder="Confirm password"
              className="rounded py-2 px-3"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item name="userType">
            <Radio.Group
              onChange={(e) => setUserType(e.target.value)}
              value={userType}
            >
              <Radio value="sales">Sales Rep.</Radio>
              <Radio value="retailer">Retailer</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 border-cyan-600 text-lg h-12 rounded"
              loading={isLoading}
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <Text>Already have an account? </Text>
            <Link
              href="/auth/login"
              className="text-cyan-600 hover:text-cyan-700"
            >
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
