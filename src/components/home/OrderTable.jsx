import React, { useState } from "react";
import { Table, Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const initialProducts = Array.from({ length: 5 }, (_, index) => ({
  key: Math.random().toString(),
  sl: index + 1,
  productName: `Product-${index + 1}`,
  category: "Cigar",
  inStock: "Yes",
  productPrice: 200,
  quantity: 50,
}));


const OrderTable = () => {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (index, delta) => {
    const newProducts = [...products];
    const newQty = newProducts[index].quantity + delta;
    newProducts[index].quantity = newQty < 0 ? 0 : newQty;
    setProducts(newProducts);
  };

  const totalAmount = products.reduce(
    (sum, item) => sum + item.quantity * item.productPrice,
    0
  );

  const totalBox = products.reduce((sum, item) => sum + item.quantity, 0);

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      align: "center",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
      align: "center",
      render: (price) => `$${price}`,
    },
    {
      title: "Quantity",
      key: "quantity",
      align: "center",
      render: (_, __, index) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            icon={<MinusCircleOutlined />}
            onClick={() => updateQuantity(index, -1)}
            size="small"
          />
          <span className="font-medium">{products[index].quantity}</span>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => updateQuantity(index, 1)}
            size="small"
          />
        </div>
      ),
    },
    {
      title: "Total Amount",
      key: "total",
      align: "center",
      render: (_, item) => `$${item.quantity * item.productPrice}`,
    },
  ];

  return (
    <div className="bg-[#f8f3e9]">
      {/* Product Table */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-xl overflow-hidden">
        <Table
          columns={columns}
          dataSource={products}
          bordered
          rowClassName="bg-white rounded-lg"
        />
      </div>

      {/* Shopping Cart */}
      <div className="w-full md:w-96 mt-8 ml-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-teal-700 font-semibold text-lg mb-4">
          Shopping Cart
        </h2>
        <div className="space-y-1 text-gray-700">
          <p>Total Box: {totalBox}</p>
          {/* <p>Free Box: 0</p> */}
          <p>Total amount: ${totalAmount}</p>
        </div>
        <div className="mt-4 flex justify-between">
          {/* <Button danger>Remove All</Button> */}
          <Button type="primary">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
