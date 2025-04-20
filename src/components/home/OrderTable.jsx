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
        <div className="flex items-center justify-center gap-2">
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
    <div className="">
      {/* Product Table */}
      <div className="p-4 overflow-hidden bg-gradient-to-r from-primary to-secondary rounded-xl">
        <Table
          columns={columns}
          dataSource={products}
          bordered
          rowClassName="bg-white rounded-lg"
        />
      </div>

      {/* Shopping Cart */}
      <div className="w-full p-6 mt-8 ml-auto shadow-lg md:w-96 bg-primary rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">Shopping Cart</h2>
        <div className="space-y-1 text-gray-700">
          <p className="text-white">Total Box: {totalBox}</p>
          {/* <p>Free Box: 0</p> */}
          <p className="text-white">Total amount: ${totalAmount}</p>
        </div>
        <div className="flex justify-between mt-4">
          {/* <Button danger>Remove All</Button> */}
          <Button type="primary" className="bg-third">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
