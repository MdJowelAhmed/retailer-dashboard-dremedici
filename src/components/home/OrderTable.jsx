import React, { useState } from "react";
import { Table, Input } from "antd";

const data = [
  {
    key: "1",
    orderId: "001",
    productName: "Product A",
    salesRep: "John Doe",
    orderQuantity: 10,
    free: 2,
    amount: 200,
    status: "Shipped",
  },
  {
    key: "2",
    orderId: "002",
    productName: "Product B",
    salesRep: "Jane Smith",
    orderQuantity: 5,
    free: 0,
    amount: 150,
    status: "Pending",
  },
  {
    key: "3",
    orderId: "003",
    productName: "Product C",
    salesRep: "Sam Wilson",
    orderQuantity: 15,
    free: 1,
    amount: 300,
    status: "Delivered",
  },
  {
    key: "4",
    orderId: "004",
    productName: "Product D",
    salesRep: "Alice Cooper",
    orderQuantity: 8,
    free: 0,
    amount: 120,
    status: "Shipped",
  },
  {
    key: "5",
    orderId: "005",
    productName: "Product E",
    salesRep: "Tom Hardy",
    orderQuantity: 20,
    free: 3,
    amount: 400,
    status: "Pending",
  },
  {
    key: "6",
    orderId: "006",
    productName: "Product F",
    salesRep: "Emma Stone",
    orderQuantity: 10,
    free: 1,
    amount: 220,
    status: "Shipped",
  },
  {
    key: "7",
    orderId: "007",
    productName: "Product G",
    salesRep: "Chris Evans",
    orderQuantity: 30,
    free: 5,
    amount: 600,
    status: "Delivered",
  },
  {
    key: "8",
    orderId: "008",
    productName: "Product H",
    salesRep: "Natalie Portman",
    orderQuantity: 12,
    free: 1,
    amount: 250,
    status: "Pending",
  },
  {
    key: "9",
    orderId: "009",
    productName: "Product I",
    salesRep: "Matt Damon",
    orderQuantity: 5,
    free: 0,
    amount: 100,
    status: "Shipped",
  },
  {
    key: "10",
    orderId: "010",
    productName: "Product J",
    salesRep: "Scarlett Johansson",
    orderQuantity: 18,
    free: 2,
    amount: 360,
    status: "Delivered",
  },
  {
    key: "11",
    orderId: "011",
    productName: "Product K",
    salesRep: "Ryan Gosling",
    orderQuantity: 25,
    free: 4,
    amount: 500,
    status: "Pending",
  },
  {
    key: "12",
    orderId: "012",
    productName: "Product L",
    salesRep: "Jennifer Lawrence",
    orderQuantity: 7,
    free: 1,
    amount: 140,
    status: "Shipped",
  },
  {
    key: "13",
    orderId: "013",
    productName: "Product M",
    salesRep: "Hugh Jackman",
    orderQuantity: 9,
    free: 0,
    amount: 180,
    status: "Delivered",
  },
];


const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    align: "center",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    align: "center",
  },
  {
    title: "Sales Rep",
    dataIndex: "salesRep",
    key: "salesRep",
    align: "center",
  },
  {
    title: "Order Quantity",
    dataIndex: "orderQuantity",
    key: "orderQuantity",
    align: "center",
  },
  {
    title: "Free",
    dataIndex: "free",
    key: "free",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    align: "center",
  },
];

const OrderTable = () => {
  const [searchText, setSearchText] = useState(""); // State to store search text

  // Function to handle search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  // Filter data based on search text
  const filteredData = data.filter((item) => {
    return (
      item.orderId.toLowerCase().includes(searchText) ||
      item.productName.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Orders</h2>
        <Input
          placeholder="Search by Order ID or Product Name"
          onChange={(e) => handleSearch(e.target.value)}
          className="w-64 py-2"
        />
      </div>
      <div className="px-6 pt-6 rounded-xl bg-gradient-to-r from-primary to-secondary">
        <Table
          dataSource={filteredData} // Display filtered data
          columns={columns}
          pagination={{ pageSize: 12 }}
          bordered={false}
          size="small"
          rowClassName="custom-table"
        />
      </div>
    </div>
  );
};

export default OrderTable;
