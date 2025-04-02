import React, { useState } from "react";
import { Table, Input, Button, Select, Modal } from "antd";
import GradientButton from "../common/GradiantButton";

// Sample data
const data = [
  {
    key: "1",
    orderId: "001",
    productName: "Product A",
    date:"March 03 2025",
    quantity:"200 Boxes",
    amount:"$2000",
    free: 2,
    status: "Shipped",
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
      title: "Invoice#",
      dataIndex: "orderId",
      key: "orderId",
      align: "center",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Order Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
        <div className="flex space-x-2 justify-center ">
          <GradientButton onClick={() => showDetails(record)} type="primary">
           View Details
          </GradientButton>
          <Button className="px-8 py-[18px] cursor-auto" type="default">Complete</Button>
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
        centered
          title="Order Overview"
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Container */}
            <div className="flex items-start justify-center bg-[#f8fcfe] w-6/12 min-h-[300px]">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.productName}
                  className="object-contain w-full  h-auto rounded-md"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 16l4-4a3 3 0 014 0l4 4m0 0l4-4a3 3 0 014 0l4 4M3 8h.01M21 8h.01"
                    />
                  </svg>
                  No Image
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <p className="mb-2">
                <strong>Invoice:</strong> #{selectedProduct.orderId}
              </p>
              <p className="mb-2">
                <strong>Order Date:</strong> {selectedProduct.orderDate}
              </p>
              <p className="mb-2">
                <strong>Product Name:</strong> {selectedProduct.productName}
              </p>
              <p className="mb-2">
                <strong>Order Quantity:</strong> {selectedProduct.orderQuantity}{" "}
                Boxes
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${selectedProduct.amount}
              </p>
              <p className="mb-2">
                <strong>Shipping Address:</strong>{" "}
                {selectedProduct.shippingAddress}
              </p>
              <p className="mb-2">
                <strong>Order Status:</strong> {selectedProduct.status}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyOrderTable;
