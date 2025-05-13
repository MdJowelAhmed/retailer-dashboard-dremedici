import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select, Modal } from "antd";
import GradientButton from "../common/GradiantButton";
import { useMyOrderQuery, useOrderDetailsQuery } from "../../redux/apiSlices/myOrderApi";

const MyOrderTable = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [queryParams, setQueryParams] = useState([]);

  // Update query parameters whenever search or filter changes
  useEffect(() => {
    const params = [];
    
    if (searchText) {
      params.push({ name: "searchTerm", value: searchText });
    }
    
    if (selectedStatus) {
      params.push({ name: "orderStatus", value: selectedStatus });
    }
    
    setQueryParams(params);
  }, [searchText, selectedStatus]);
  
  // Use the updated queryParams for API call
  const { data: orderData, isLoading } = useMyOrderQuery(queryParams.length > 0 ? queryParams : null);
  console.log(orderData)
  
  // Only fetch order details when an ID is selected
  const { data: orderDetails, isLoading: detailsLoading } = useOrderDetailsQuery(
    selectedOrderId ? selectedOrderId : null,
    { skip: !selectedOrderId }
  );
  
  console.log(orderDetails)
  // Function to handle search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  // Show details modal
  const showDetails = (id) => {
    setSelectedOrderId(id);
    setModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedOrderId(null);
  };

  const columns = [
    {
      title: "Invoice#",
      dataIndex: "orderId",
      key: "orderId",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      align: "center",
    },
    {
      title: "Order date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
      align: "center",
    },
    {
      title: "Order Quantity",
      dataIndex: "orderBoxs",
      key: "orderBoxs",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "amount",
      render: (amount) => `$${amount}`,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2 justify-center ">
          <button
            className="px-5 py-2 rounded-md border cursor-pointer border-primary"
            onClick={() => showDetails(record._id)}
            type="primary"
          >
            View Details
          </button>
        </div>
      ),
      align: "center",
    },
  ];

  // Products table columns for the modal
  const productColumns = [
    {
      title: "Product ID",
      dataIndex: ["productId", "name"],
      key: "productId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Price (per unit)",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
      align: "center",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamout",
      key: "totalamout",
      render: (amount) => `$${amount}`,
      align: "center",
    }
  ];

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Orders</h2>
        <div className="flex space-x-4">
          <Input
            placeholder="Search by Invoice ID or Product Name"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-64 py-2"
            allowClear
          />
          <Select
            placeholder="Filter by Status"
            onChange={(value) => setSelectedStatus(value)}
            className="w-64"
            allowClear
            style={{ height: "40px" }}
          >
            <Select.Option value="">All Orders</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="processing">Processing</Select.Option>
            <Select.Option value="shipped">Shipped</Select.Option>
            <Select.Option value="delivered">Delivered</Select.Option>
          </Select>
        </div>
      </div>
      <div className="px-6 pt-6 rounded-xl bg-gradient-to-r from-primary to-secondary">
        <Table
          dataSource={orderData?.data || []}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: orderData?.totalCount,
            onChange: (page, pageSize) => {
              setQueryParams([
                ...queryParams.filter(
                  (p) => p.name !== "page" && p.name !== "limit"
                ),
                { name: "page", value: page },
                { name: "limit", value: pageSize },
              ]);
            },
          }}
          bordered={false}
          size="small"
          rowClassName="custom-table"
          loading={isLoading}
          rowKey="orderId"
        />
      </div>

      {/* Modal for Order Details */}
      <Modal
        centered
        title="Order Overview"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {orderDetails && !detailsLoading ? (
          <div className="flex flex-col gap-6">
            <div className="order-info bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Order Information</h3>
              <p>
                <strong>Total Amount:</strong> $
                {orderDetails?.data?.totalAmount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {orderDetails?.data?.orderStatus || orderDetails.orderStatus}
              </p>

              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(
                  orderDetails?.data?.createdAt || orderDetails.createdAt
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Shipping Address:</strong>{" "}
                {orderDetails?.data?.shippingAddress}
              </p>
            </div>

            <div className="products">
              <h3 className="text-lg font-semibold mb-2">Ordered Products</h3>
              <Table
                dataSource={orderDetails?.data?.products || []}
                columns={productColumns}
                pagination={false}
                rowKey="_id"
                bordered
                size="small"
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">Loading order details...</div>
        )}
      </Modal>
    </div>
  );
};

export default MyOrderTable;
