import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  notification,
  Upload,
  Avatar,
} from "antd";
import GradientButton from "../../../components/common/GradiantButton";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]); // State to handle file list

  const handleUpdate = async (values) => {
    console.log("Updated Values: ", values);
    console.log("Profile Image: ", imageUrl);
    // Here, you can add the logic to update the user data to the server
    // If it's successful, show a success notification
    notification.success({
      message: "Profile Updated Successfully!",
      description: "Your profile information has been updated.",
    });
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update the file list when a new file is selected
    if (newFileList.length > 0) {
      setImageUrl(URL.createObjectURL(newFileList[0].originFileObj)); // Show preview of the image
    } else {
      setImageUrl(null); // Clear image if no file selected
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      notification.error({
        message: "Invalid File Type",
        description: "Please upload an image file.",
      });
    }
    return isImage;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center">
        <Form
          form={form}
          layout="vertical"
          style={{ width: "80%" }}
          onFinish={handleUpdate}
        >
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-16 gap-y-7">
            {/* Profile Image */}
            <div className="flex justify-center col-span-2">
              <Form.Item label="Profile Image" style={{ marginBottom: 0 }}>
                <Upload
                  name="avatar"
                  showUploadList={false}
                  action="/upload" // Adjust this to your server's upload endpoint
                  onChange={handleImageChange}
                  beforeUpload={beforeUpload} // Validate file before upload
                  fileList={fileList} // Bind file list to the Upload component
                  listType="picture-card"
                >
                  {imageUrl ? (
                    <Avatar size={100} src={imageUrl} />
                  ) : (
                    <Avatar size={100} icon={<UploadOutlined />} />
                  )}
                </Upload>
              </Form.Item>
            </div>

            {/* Username */}
            <Form.Item
              name="username"
              label="Username"
              style={{ marginBottom: 0 }}
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                placeholder="Enter your Username"
                style={{
                  height: "45px", // Increased height
                  backgroundColor: "#f7f7f7", // Light grey background color
                  borderRadius: "8px",
                  border: "1px solid #E0E4EC",
                  outline: "none",
                }}
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              style={{ marginBottom: 0 }}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="Enter your Email"
                style={{
                  height: "45px", // Increased height
                  backgroundColor: "#f7f7f7", // Light grey background color
                  borderRadius: "8px",
                  border: "1px solid #E0E4EC",
                  outline: "none",
                }}
              />
            </Form.Item>

            {/* Address */}
            <Form.Item
              name="address"
              label="Address"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                placeholder="Enter your Address"
                style={{
                  height: "45px", // Increased height
                  backgroundColor: "#f7f7f7", // Light grey background color
                  borderRadius: "8px",
                  border: "1px solid #E0E4EC",
                  outline: "none",
                }}
              />
            </Form.Item>

            {/* Language */}
            <Form.Item
              name="language"
              label="Language"
              style={{ marginBottom: 0 }}
              rules={[
                { required: true, message: "Please select your language" },
              ]}
            >
              <Select
                placeholder="Select your Language"
                style={{
                  height: "45px", // Increased height
                  backgroundColor: "#f7f7f7", // Light grey background color
                  borderRadius: "8px",
                  border: "1px solid #E0E4EC",
                }}
              >
                <Option value="english">English</Option>
                <Option value="french">French</Option>
                <Option value="spanish">Spanish</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="notifications"
              label="Enable Notifications"
              valuePropName="checked"
              style={{ marginBottom: 0, background: "white" }}
            >
              <Switch
                defaultChecked
                className="custom-switch" // Add your custom class here
              />
            </Form.Item>

            {/* Update Profile Button */}
            <div className="mt-6 text-end">
              <Form.Item>
                <GradientButton htmlType="submit" block>
                  Update Profile
                </GradientButton>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
