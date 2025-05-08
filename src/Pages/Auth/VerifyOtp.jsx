import { Button, Form, Typography, message } from "antd";
import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResentOtpMutation,
} from "../../redux/apiSlices/authSlice"; // Import the resendOtp mutation

const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();

  // Get email and source from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const source = searchParams.get("source"); // 'register' or 'forgot'

  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const [resentOtp, { isLoading: isResending }] = useResentOtpMutation(); 

  useEffect(() => {
    // Redirect to home if no email is provided
    if (!email) {
      message.error("Email is required for verification");
      navigate("/auth/login");
    }
  }, [email, navigate]);

  const onFinish = async () => {
    if (!otp || otp.length !== 4) {
      message.error("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      const response = await otpVerify({
        email,
        oneTimeCode: parseInt(otp),
      }).unwrap();
console.log(response)
      if (response.success) {
        message.success("OTP verified successfully!");


        // Navigate based on source
        if (source === "register") {
          navigate("/auth/login");
        } else {
          localStorage.setItem("verifyToken", response.data.verifyToken);
          navigate(`/auth/reset-password?email=${email}`); 
        }
      } else {
        message.error(response.message || "OTP verification failed");
      }
    } catch (err) {
      message.error(
        err?.data?.message || "Failed to verify OTP. Please try again."
      );
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await resentOtp({ email }).unwrap(); 
      if (response.success) {
        message.success("OTP resent successfully. Please check your inbox.");
      } else {
        message.error(response.message || "Failed to resend OTP.");
      }
    } catch (err) {
      message.error(
        err?.data?.message || "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto">
          We've sent a verification code to your email. Check your inbox and
          enter the code here.
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "1px solid #007BA5",
              color: "#2B2A2A",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Text>Didn't receive code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot"
            style={{ color: "#007BA5", cursor: "pointer" }}
          >
            {isResending ? "Resending..." : "Resend"}
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            loading={isLoading}
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              color: "white",
            }}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
