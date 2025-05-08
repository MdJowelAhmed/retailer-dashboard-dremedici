import React, { useState, useEffect } from "react";
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
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/apiSlices/authSlice";

const { Option } = Select;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const { data, isSuccess } = useProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log("Setting form values with:", data.data);
      // Populate form with user data
      form.setFieldsValue({
        username: data.data.name,
        email: data.data.email,
        address: data.data.address || "",
        language: data.data.language || "english",
        notifications: data.data.notifications || true,
      });

      // Set profile image if exists
      if (data.data.image) {
        setImageUrl(data.data.image);
      }
    }
  }, [isSuccess, data, form]);

  const handleUpdate = async (values) => {
    console.log("Handle update triggered with values:", values);
    try {
      // Create user data object
      const userData = {
        name: values.username,
        email: values.email,
        address: values.address,
        language: values.language,
        notifications: values.notifications,
      };

      console.log("User data:", userData);

      // Create FormData only if there's an image
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj);

        // Add all user data as individual form fields (not as stringified JSON)
        Object.keys(userData).forEach((key) => {
          formData.append(key, userData[key]);
        });

        console.log("Calling updateProfile mutation with FormData");
        const response = await updateProfile(formData).unwrap();
        console.log("Update response:", response);
      } else {
        // If no image, just send the JSON data
        console.log("Calling updateProfile mutation with JSON");
        const response = await updateProfile(userData).unwrap();
        console.log("Update response:", response);
      }

      notification.success({
        message: "Profile Updated Successfully!",
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      notification.error({
        message: "Update Failed",
        description:
          error.message || "Failed to update profile. Please try again.",
      });
    }
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

  // For debugging purposes
  const logFormStatus = () => {
    console.log("Form is valid:", form.isFieldsValidating());
    console.log("Form values:", form.getFieldsValue());
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center">
        <Form
          form={form}
          layout="vertical"
          style={{ width: "80%" }}
          onFinish={handleUpdate}
          onFinishFailed={(errorInfo) => {
            console.log("Form validation failed:", errorInfo);
          }}
        >
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-16 gap-y-7">
            {/* Profile Image */}
            <div className="flex justify-center col-span-2">
              <Form.Item label="Profile Image" style={{ marginBottom: 0 }}>
                <Upload
                  name="avatar"
                  showUploadList={false}
                  customRequest={({ onSuccess }) =>
                    setTimeout(() => onSuccess("ok"), 0)
                  }
                  onChange={handleImageChange}
                  beforeUpload={beforeUpload}
                  fileList={fileList}
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
                  height: "45px",
                  backgroundColor: "#f7f7f7",
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
                  height: "45px",
                  backgroundColor: "#f7f7f7",
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
                  height: "45px",
                  backgroundColor: "#f7f7f7",
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
                  height: "45px",
                  backgroundColor: "#f7f7f7",
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
              <Switch defaultChecked className="custom-switch" />
            </Form.Item>

            {/* Update Profile Button */}
            <div className="mt-6 text-end col-span-2">
              <Form.Item>
                <GradientButton
                  htmlType="submit"
                  block
                  loading={isLoading}
                  onClick={logFormStatus}
                >
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
