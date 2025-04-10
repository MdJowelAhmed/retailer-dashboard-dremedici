import React, { useState } from "react";
import { Modal, Form, Input, Button, Row, Col, Checkbox, Divider } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import GradientButton from "../common/GradiantButton";

const PaymentModal = ({ isVisible, onCancel, selectedPlan, onSubmit }) => {
  const [form] = Form.useForm();
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmitPayment = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={`Complete Your ${selectedPlan?.tier} Subscription`}
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">
          Payment for {selectedPlan?.facilities}
        </h3>
        <Form
          form={form}
          onFinish={handleSubmitPayment}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="cardName"
            label="Name On Card"
            rules={[
              {
                required: true,
                message: "Please enter the name on the card",
              },
            ]}
          >
            <Input placeholder="Name On Card" className="w-full" />
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
              className="w-full"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="expiry"
                label="Expiry (MM/YY)"
                rules={[
                  { required: true, message: "Please enter the expiry date" },
                ]}
              >
                <Input placeholder="MM/YY" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cvc"
                label="CVC"
                rules={[{ required: true, message: "Please enter the CVC" }]}
              >
                <Input placeholder="CVC" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="zipCode"
            label="Zip Code"
            rules={[{ required: true, message: "Please enter your zip code" }]}
          >
            <Input placeholder="Zip Code" className="w-full" />
          </Form.Item>

          {/* <Form.Item name="saveCard" valuePropName="checked">
            <Checkbox
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="text-sm"
            >
              Save this card for future payments
            </Checkbox>
          </Form.Item> */}

          <Divider />

          <Form.Item>
            <GradientButton
              type="primary"
              htmlType="submit"
              className={`w-full text-white py-2 rounded-md ${
                selectedPlan?.buttonColor || "bg-blue-500"
              }`}
            >
              Confirm Payment
            </GradientButton>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default PaymentModal;
