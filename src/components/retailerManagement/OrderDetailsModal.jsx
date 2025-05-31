import React from "react";
import { Modal, Spin, Table, Badge, Divider, Tag } from "antd";
import moment from "moment";
import {
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
  BoxPlotOutlined,
  DollarOutlined,
  TagOutlined,
  HomeOutlined,
  CalendarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useOrderDetailsQuery } from "../../redux/apiSlices/myOrderApi";
import { FaAddressCard } from "react-icons/fa6";

const OrderDetailsModal = ({ orderId, visible, onClose }) => {
  // Fetch order details when an ID is provided
  const { data: orderResponse, isLoading: detailsLoading } =
    useOrderDetailsQuery(orderId ? orderId : null, { skip: !orderId });

  // Extract the order data from the response
  const order = orderResponse?.data;
  console.log(order)

  // Status color mapping
  const statusColors = {
    completed: "success",
    processing: "processing",
    pending: "warning",
    cancelled: "error",
    delivered: "success",
    shipped: "cyan",
    failed: "error",
  };

  // Get status color (case insensitive)
  const getStatusColor = (status) => {
    const lowerStatus = status?.toLowerCase();
    return statusColors[lowerStatus] || "default";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return moment(dateString).format("MMMM D, YYYY");
  };

  // Products table columns for the modal
  const productColumns = [
    {
      title: "Product Name",
      dataIndex: ["productId", "name"],
      key: "name",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (quantity) => (
        <Tag color="blue" className="px-3 py-1 text-sm rounded-full">
          {quantity}
        </Tag>
      ),
    },
    {
      title: "Price (per unit)",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-medium">${price.toFixed(2)}</span>
      ),
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "totalamout",
      key: "totalamout",
      render: (amount, record) => {
        // Use totalamout or totalAmount, whichever is available
        const total = amount || record.totalAmount || 0;
        return (
          <span className="font-semibold text-green-600">
            ${total.toFixed(2)}
          </span>
        );
      },
      align: "center",
    },
  ];

  return (
    <Modal
      centered
      title={
        <div className="flex items-center text-2xl font-bold text-gray-800 py-2">
          <ShoppingCartOutlined className="mr-3 text-primary" />
          Order Details
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
      className="order-details-modal"
      bodyStyle={{ padding: "24px", maxHeight: "80vh", overflowY: "auto" }}
    >
      {detailsLoading || !order ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" tip="Loading order details..." />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Order Status Banner */}
          <div className="bg-primary text-white rounded-lg p-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg opacity-90">Order ID</h2>
                <p className="text-2xl font-bold">{order.orderId}</p>
              </div>
              <Badge
                status={getStatusColor(order.orderStatus)}
                text={
                  <span className="text-white text-lg font-medium bg-white bg-opacity-20 px-4 py-2 rounded-full">
                    {order.orderStatus || "Processing"}
                  </span>
                }
              />
            </div>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">
                  Customer Information
                </h3>
              </div>
              <div className="p-5">
                {order.shippingAddress && (
                  <>
                    <div className="flex items-center">
                      <FaAddressCard className="text-primary text-lg mr-3" />
                      <div>
                        <p className="text-gray-500 text-sm">Address</p>
                        <p className="text-gray-800 font-medium">
                          {order.shippingAddress}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Divider className="my-3" />
                <div className="flex items-center">
                  <CalendarOutlined className="text-primary text-lg mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Order Date</p>
                    <p className="text-gray-800 font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">
                  Order Summary
                </h3>
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <BoxPlotOutlined className="text-primary text-lg mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Total Boxes</p>
                    <p className="text-gray-800 font-medium">
                      {order.orderBoxs || 0}
                    </p>
                  </div>
                </div>

                <Divider className="my-3" />

                <div className="flex items-center">
                  <DollarOutlined className="text-primary text-lg mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Total Price</p>
                    <p className="text-green-600 font-semibold text-lg">
                      ${order.totalAmount?.toFixed(2) || "0.00"}
                    </p>
                    <small className="italic">
                      Shipping and/or processing fees to be added on the final
                      invoice
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {order.products && order.products.length > 0 && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 flex items-center">
                  <TagOutlined className="text-primary mr-2" />
                  Order Items
                </h3>
              </div>
              <div className="p-2">
                <Table
                  dataSource={order.products}
                  columns={productColumns}
                  pagination={false}
                  rowKey={(record, index) => index}
                  className="custom-table"
                  bordered={false}
                  size="small"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default OrderDetailsModal;
