import React, { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";
import { useMyOrderQuery } from "../../redux/apiSlices/myOrderApi";
import OrderDetailsModal from "./OrderDetailsModal";

const MyOrderTable = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [queryParams, setQueryParams] = useState([]);

  // Update query parameters whenever search, filter, or pagination changes
  useEffect(() => {
    const params = [];

    if (searchText) {
      params.push({ name: "searchTerm", value: searchText });
    }

    if (selectedStatus) {
      params.push({ name: "orderStatus", value: selectedStatus });
    }

    // Add pagination params
    params.push({ name: "page", value: currentPage });
    params.push({ name: "limit", value: pageSize });

    setQueryParams(params);
  }, [searchText, selectedStatus, currentPage, pageSize]);

  // Use the updated queryParams for API call
  const { data: orderData, isLoading } = useMyOrderQuery(
    queryParams.length > 0 ? queryParams : null
  );

  // Function to handle search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    setCurrentPage(1);
  };

  // Function to handle status filter change
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
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

  // Handle pagination change
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
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
      render: (text) => {
        if (!text) return "";
        const firstPart = text.split(" ")[0];
        return firstPart;
      },
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
        <div className="flex space-x-2 justify-center">
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
            onChange={handleStatusChange}
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
            current: currentPage,
            pageSize: pageSize,
            total: orderData?.pagination?.total || 0,
            onChange: handlePaginationChange,
          }}
          bordered={false}
          size="small"
          rowClassName="custom-table"
          loading={isLoading}
          rowKey="orderId"
        />
      </div>

      {/* Use the OrderDetailsModal component */}
      <OrderDetailsModal
        orderId={selectedOrderId}
        visible={modalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default MyOrderTable;
