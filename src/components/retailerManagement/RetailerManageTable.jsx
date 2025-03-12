import React, { useState } from "react";
import { Table, Input, Button, Select, Modal } from "antd";
import GradientButton from "../common/GradiantButton";

// Sample data
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
    image:
      "https://i.ibb.co.com/5WRNH1d3/fresh-healthy-fruits-straw-basket-generative-ai-188544-11999.jpg",
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
    image:
      "https://i.ibb.co.com/5WRNH1d3/fresh-healthy-fruits-straw-basket-generative-ai-188544-11999.jpg",
  },
  // Add other rows as needed
];

const MyOrderTable = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  // Filter data based on search text and selected status
  const filteredData = data.filter((item) => {
    return (
      (item.orderId.toLowerCase().includes(searchText) ||
        item.productName.toLowerCase().includes(searchText)) &&
      (selectedStatus ? item.status === selectedStatus : true)
    );
  });

  // Show details modal
  const showDetails = (record) => {
    setSelectedProduct(record);
    setModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false);
  };

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
      render: (_, record) => (
        <div className="flex space-x-2 justify-center">
          <GradientButton onClick={() => showDetails(record)} type="primary">
            Details
          </GradientButton>
          <Button type="default">Complete</Button>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Orders</h2>
        <div className="flex space-x-4">
          <Input
            placeholder="Search by Order ID or Product Name"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-64 py-2"
          />
          <Select
            placeholder="Filter by Status"
            onChange={(value) => setSelectedStatus(value)}
            className="w-64"
            allowClear
            style={{ height: "40px" }}
          >
            <Select.Option value="Shipped">Shipped</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Delivered">Delivered</Select.Option>
          </Select>
        </div>
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

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Modal
          title={`Details for ${selectedProduct.productName}`}
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <div className="">
            <div className="flex gap-5">
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.productName}
                  className="mb-4 rounded-full"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Product Information</h2>
                <h3 className="">
                  Product Name: <span className="font-bold">{selectedProduct.productName}</span>
                </h3>
                <p>
                  <strong>Order ID:</strong> {selectedProduct.orderId}
                </p>
                <p>
                  <strong>Sales Rep:</strong> {selectedProduct.salesRep}
                </p>
                <p>
                  <strong>Order Quantity:</strong>{" "}
                  {selectedProduct.orderQuantity}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Payment Information</h2>
            <p>
              <strong>Amount:</strong> ${selectedProduct.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedProduct.status}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyOrderTable;
