import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { products } from "./Products";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

// Sample data for products



function ProductInfo() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Add to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Show Details Modal
  const showDetails = (product) => {
    setSelectedProduct(product);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Pagination Logic
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className=" ">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">
          Product Store({products.length}){" "}
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products"
            className="p-2 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to='/mycart' className="relative">
            <IoCartOutline className="text-4xl text-secondary" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
        {currentProducts.map((product) => (
          <div key={product.key} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="text-gray-700 mt-2">Price: ${product.amount}</p>
            <p className="text-gray-600">In stock: {product.orderQuantity}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => showDetails(product)}
                className="bg-[#6FBAC2] text-white p-2 rounded-md"
              >
                Details
              </button>
              <button
                onClick={() => addToCart(product)}
                className="bg-primary text-white p-2 rounded-md"
              >
                Add to Cart
              </button>
              <button className="bg-secondary text-white p-2 rounded-md">
                Buy Now
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
          }`}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft className="text-3xl"/>
        </button>

        {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === index + 1
                  ? "bg-secondary text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredProducts.length / productsPerPage)
              )
            )
          }
          className={`px-3 py-1 border rounded-md ${
            currentPage === Math.ceil(filteredProducts.length / productsPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-100 "
          }`}
          disabled={
            currentPage === Math.ceil(filteredProducts.length / productsPerPage)
          }
        >
          <MdOutlineKeyboardArrowRight className="text-3xl "/>
        </button>
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {selectedProduct.productName}
            </h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.productName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p>Price: ${selectedProduct.amount}</p>
            <p>In stock: {selectedProduct.orderQuantity}</p>
            <p>Status: {selectedProduct.status}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
