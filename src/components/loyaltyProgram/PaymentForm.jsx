import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Divider,
  InputNumber,
} from "antd";
import { CreditCardOutlined, CheckCircleOutlined } from "@ant-design/icons";

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmit = (values) => {
    console.log("Payment Information Submitted:", values);
  };

  return (
    <div className=" mx-auto mt-10 border border-primary p-8 rounded-xl shadow-md mb-10">
      <h2 className="text-3xl font-bold mb-6">Payment Information</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-6"
      >
        <Form.Item
          name="cardName"
          label="Name On Card"
          rules={[
            { required: true, message: "Please enter the name on the card" },
          ]}
        >
          <Input placeholder="Name On Card" className="w-full" />
        </Form.Item>

        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[{ required: true, message: "Please enter your card number" }]}
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
              label="mm/yy"
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

        <Form.Item name="saveCard" valuePropName="checked">
          <Checkbox
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="text-sm"
          >
            Save this card
          </Checkbox>
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full  hover:bg-green-600 text-white py-2 rounded-md"
          >
            Confirm Payment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentForm;
