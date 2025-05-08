import React, { useState, useEffect } from "react";
import { Table, Button, message, Input, Modal } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useGetProductsQuery, useOrderProductMutation } from "../../redux/apiSlices/homeSlice";

const OrderTable = () => {
  const [products, setProducts] = useState([]);
  const { data, isLoading: productsLoading } = useGetProductsQuery();
  const [orderProduct, { isLoading }] = useOrderProductMutation();
  const [shippingAddress, setShippingAddress] = useState("");
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  
  useEffect(() => {
    if (data?.data) {
      console.log("API Product Data:", data.data);
      const formattedProducts = data.data.map((product, index) => ({
        key: product._id || Math.random().toString(),
        sl: index + 1,
        productId: product._id,
        productName: product.name || `Product-${index + 1}`,
        category: product.category || "Cigar",
        inStock: product.inStock ? "Yes" : "No",
        productPrice: product.price || 200,
        quantity: 0,
      }));
      setProducts(formattedProducts);
    }
  }, [data]);

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

  const handlePlaceOrder = async () => {
    try {
      const productsToOrder = products
        .filter(item => item.quantity > 0)
        .map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          totalamout: item.quantity * item.productPrice,
          price: item.productPrice
        }));
      
      if (productsToOrder.length === 0) {
        message.error("Please select at least one product");
        return;
      }

      if (!shippingAddress.trim()) {
        setIsAddressModalVisible(true);
        return;
      }

      const orderData = {
        products: productsToOrder,
        source: "Retailer",
        orderBoxs: totalBox,
        totalAmount,
        shippingAddress
      };

      console.log("Sending order data:", orderData);
      await orderProduct(orderData).unwrap();
      message.success("Order placed successfully");
      
      // Reset quantities after order
      const resetProducts = products.map(product => ({
        ...product,
        quantity: 0
      }));
      setProducts(resetProducts);
      setShippingAddress("");
    } catch (error) {
      message.error(`Failed to place order: ${error.message || "Unknown error"}`);
      console.error("Order error:", error);
    }
  };

  const handleAddressSubmit = () => {
    if (!shippingAddress.trim()) {
      message.error("Please enter a shipping address");
      return;
    }
    setIsAddressModalVisible(false);
    handlePlaceOrder();
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
            disabled={products[index].quantity <= 0}
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
          loading={productsLoading}
        />
      </div>

      {/* Shopping Cart */}
      <div className="w-full p-6 mt-8 ml-auto shadow-lg md:w-96 bg-primary rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-white">Shopping Cart</h2>
        <div className="space-y-1 text-gray-700">
          <p className="text-white">Total Box: {totalBox}</p>
          <p className="text-white">Total amount: ${totalAmount}</p>
        </div>
        <div className="mt-4">
          <Input.TextArea
            placeholder="Enter shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mb-4"
            rows={2}
          />
          <Button
            type="primary"
            className="bg-third w-full"
            onClick={handlePlaceOrder}
            loading={isLoading}
            disabled={totalBox === 0}
            style={{ color: totalBox === 0 ? "white" : "inherit" }}
          >
            Place Order
          </Button>
        </div>
      </div>

      {/* Address Modal */}
      <Modal
        title="Shipping Address Required"
        open={isAddressModalVisible}
        onOk={handleAddressSubmit}
        onCancel={() => setIsAddressModalVisible(false)}
      >
        <p>Please enter your shipping address:</p>
        <Input.TextArea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your complete shipping address"
          rows={3}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;
