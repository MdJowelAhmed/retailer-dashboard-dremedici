import React, { useState } from "react";
import { Modal, Form, Input, Button, Row, Col, Card } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

const PaymentModal = ({ isVisible, onCancel, selectedPlan, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmitPayment = async (values) => {
    try {
      setLoading(true);

      // Extract benefit values from the selected plan
      const extractBenefitValue = (keyPhrase) => {
        const benefit = selectedPlan?.benefits?.find((b) =>
          b.includes(keyPhrase)
        );
        if (benefit) {
          const parts = benefit.split("–");
          return parts.length > 1 ? parts[1].trim() : "Yes";
        }
        return "Yes"; // Default value
      };

      // Extract all benefit values dynamically
      const freeShipping = extractBenefitValue("Free Shipping");
      const noCreditCardFee = extractBenefitValue("No Credit Card Fee");
      const exclusiveProducts = extractBenefitValue("Exclusive Products");
      const limitedReleases = extractBenefitValue("Limited Releases");

      // FIXED: Card fields directly at root level, not nested under 'card'
      const paymentData = {
        tier: selectedPlan?.tier,
        subscription: selectedPlan?.facilities,
        freeShipping: freeShipping,
        noCreditCardFee: noCreditCardFee,
        exclusiveProducts: exclusiveProducts,
        limitedReleases: limitedReleases,
        termsAndConditionsAccepted: true,
        termsAndConditions:
          "By subscribing, you agree to our terms and conditions...",
        // Card details at root level
        cardHolderName: values.cardHolderName,
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        cvv: values.cvv,
        zipCode: values.zipCode,
      };

      console.log(
        "Submitting payment data with correct structure:",
        paymentData
      );

      // Call the submit handler with properly formatted data
      await onSubmit(paymentData);
      form.resetFields();
    } catch (error) {
      console.error("Payment submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Complete Your ${selectedPlan?.tier} Subscription`}
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">
          Payment for {selectedPlan?.facilities}
        </h3>

        {/* Display selected plan details */}
        <Card className="mb-6 bg-gray-50">
          <div className="font-medium">
            <h4 className="text-lg font-bold mb-2">Plan Details</h4>
            <p>
              <span className="font-semibold">Tier:</span> {selectedPlan?.tier}
            </p>
            <p>
              <span className="font-semibold">Features:</span>{" "}
              {selectedPlan?.facilities}
            </p>
            <ul className="list-disc pl-5 mt-2">
              {selectedPlan?.benefits?.map((benefit, index) => (
                <li key={index} className="text-sm">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Form
          form={form}
          onFinish={handleSubmitPayment}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="cardHolderName"
            label="Name On Card"
            rules={[
              {
                required: true,
                message: "Please enter the name on the card",
              },
            ]}
          >
            <Input placeholder="Name On Card" className="w-full py-3" />
          </Form.Item>

          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              { required: true, message: "Please enter your card number" },
            ]}
          >
            <Input
              placeholder="Card Number"
              prefix={<CreditCardOutlined />}
              className="w-full py-3"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="expiryDate"
                label="Expiry (MM/YY)"
                rules={[
                  { required: true, message: "Please enter the expiry date" },
                ]}
              >
                <Input placeholder="MM/YY" className="w-full py-3" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cvv"
                label="CVC"
                rules={[{ required: true, message: "Please enter the CVC" }]}
              >
                <Input placeholder="CVC" className="w-full py-3" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="zipCode"
            label="Zip Code"
            rules={[{ required: true, message: "Please enter your zip code" }]}
          >
            <Input placeholder="Zip Code" className="w-full py-3" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                height: "48px",
              }}
              className="bg-primary"
            >
              Confirm Payment
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default PaymentModal;
