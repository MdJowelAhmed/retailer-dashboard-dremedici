import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  useGetProductsQuery,
  useOrderProductMutation,
} from "../../redux/apiSlices/homeSlice";

const OrderTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [queryParams, setQueryParams] = useState([]);
  const { data, isLoading: productsLoading } = useGetProductsQuery(
    queryParams.length > 0 ? queryParams : null
  );
  const [orderProduct, { isLoading }] = useOrderProductMutation();
  console.log(data)

  // Update query parameters whenever pagination changes
  useEffect(() => {
    const params = [];
    params.push({ name: "page", value: currentPage });
    params.push({ name: "limit", value: pageSize });
    setQueryParams(params);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (data?.data) {
      const formattedProducts = data.data.map((product, index) => ({
        key: product._id || Math.random().toString(),
        sl: index + 1,
        productId: product._id,
        name: product.name || `Product-${index + 1}`,
        category: product.category || "Cigar",
        inStockCount: product.quantity || 0,
        availableStock: product.quantity || 0,
        productPrice: product.price || 200,
        productSize: product.size || "",
        quantity: 0,
      }));
      setProducts(formattedProducts);
    }
  }, [data]);

  const updateQuantity = (index, delta) => {
    const newProducts = [...products];
    const currentProduct = newProducts[index];
    const newQty = currentProduct.quantity + delta;

    if (delta > 0) {
      if (currentProduct.availableStock <= 0) {
        message.warning(`No more stock available for ${currentProduct.name}`);
        return;
      }
    }

    if (newQty < 0) {
      currentProduct.quantity = 0;
    } else if (newQty > currentProduct.inStockCount) {
      message.warning(
        `Cannot order more than available stock (${currentProduct.inStockCount})`
      );
      return;
    } else {
      currentProduct.quantity = newQty;
      currentProduct.availableStock = currentProduct.inStockCount - newQty;
    }

    setProducts(newProducts);
  };

  const totalAmount = products.reduce(
    (sum, item) => sum + item.quantity * item.productPrice,
    0
  );

  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const totalBox = products.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const productsToOrder = products
        .filter((item) => item.quantity > 0)
        .map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          totalAmount: item.quantity * item.productPrice,
          price: item.productPrice,
        }));

      if (productsToOrder.length === 0) {
        message.error("Please select at least one product");
        return;
      }

      // Removed address validation and modal

      const orderData = {
        products: productsToOrder,
        source: "Retailer",
        orderBoxs: totalBox,
        totalAmount,
        // No shippingAddress field here
      };

      console.log("Sending order data:", orderData);
      await orderProduct(orderData).unwrap();
      message.success("Order placed successfully");

      // Reset quantities after order
      const resetProducts = products.map((product) => ({
        ...product,
        quantity: 0,
        availableStock: product.inStockCount,
      }));
      setProducts(resetProducts);
    } catch (error) {
      message.error(
        `Failed to place order: ${error.message || "Unknown error"}`
      );
      console.error("Order error:", error);
    }
  };

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
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Available Stock",
      dataIndex: "availableStock",
      key: "availableStock",
      align: "center",
      render: (_, record) => (
        <span
          className={`font-medium ${
            record.availableStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.availableStock > 0 ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
      align: "center",
      render: (price) => `$${price}`,
    },
    {
      title: "Product Size",
      dataIndex: "productSize",
      key: "productSize",
      align: "center",
      // render: (size) => `${size}`,
    },
    {
      title: "Box Count",
      key: "quantity",
      align: "center",
      render: (_, record, index) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            icon={<MinusCircleOutlined />}
            onClick={() => updateQuantity(index, -1)}
            size="small"
            disabled={products[index].quantity <= 0}
          />
          <span className="font-medium">{record.quantity}</span>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => updateQuantity(index, 1)}
            size="small"
            disabled={record.availableStock <= 0}
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
    <div>
      <div className="p-4 overflow-hidden bg-gradient-to-r from-primary to-secondary rounded-xl">
        <Table
          columns={columns}
          dataSource={products}
          bordered
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.data?.pagination?.total || 0,
            onChange: handlePaginationChange,
          }}
          rowClassName="bg-white rounded-lg"
          loading={productsLoading}
        />
      </div>

      <div className="w-full p-6 mt-8 ml-auto shadow-lg md:w-96 bg-primary rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">Shopping Cart</h2>
        <div className="space-y-1 text-gray-700">
          <p className="text-white">Total Box: {totalBox}</p>
          <p className="text-white">Total amount: ${totalAmount}</p>
        </div>
        <div className="mt-4">
          <Button
            type="primary"
            className="bg-third w-full"
            onClick={handlePlaceOrder}
            loading={isLoading}
            disabled={totalBox === 0}
            style={{ color: totalBox === 0 ? "white" : "white" }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
