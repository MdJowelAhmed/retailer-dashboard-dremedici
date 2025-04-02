import React, { useState } from "react";
import {
  IoCartOutline,
  IoHeartOutline,
  IoHeart,
  IoStar,
  IoStarHalf,
} from "react-icons/io5";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { products } from "./Products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientButton from "../common/GradiantButton";

function ProductInfo() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const productsPerPage = 6;

  // Add to Cart with animation
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Toggle Wishlist with animation
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
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

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalf key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<IoStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <div className="text-2xl font-bold text-gray-800">
          Our Products{" "}
          <span className="text-secondary">({products.length})</span>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <motion.input
            type="text"
            placeholder="Search products..."
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-secondary w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/mycart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <IoCartOutline className="text-2xl text-secondary" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <motion.div
            key={product.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredProduct(product.key)}
            onMouseLeave={() => setHoveredProduct(null)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Product Image with Wishlist Button */}
            <div className="relative overflow-hidden">
              <motion.img
                src={product.image}
                alt={product.productName}
                className="w-full h-60 object-cover"
                initial={{ scale: 1 }}
                animate={{
                  scale: hoveredProduct === product.key ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                onClick={() => toggleWishlist(product.key)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {wishlist.includes(product.key) ? (
                  <IoHeart className="text-red-500 text-xl" />
                ) : (
                  <IoHeartOutline className="text-gray-600 text-xl" />
                )}
              </motion.button>
              {product.status === "sale" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md"
                >
                  SALE
                </motion.div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.productName}
                </h3>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-lg font-bold text-secondary"
                >
                  ${product.amount}
                </motion.span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {renderRating(product.rating || 4.5)}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviews || 24})
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span
                  className={`w-3 h-3 rounded-full mr-1 ${
                    product.orderQuantity > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                {product.orderQuantity > 0 ? "In Stock" : "Out of Stock"}
              </div>

              <div className="flex justify-between gap-3 mt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GradientButton
                    onClick={() => showDetails(product)}
                    className="w-full py-2 text-sm"
                  >
                    View Details
                  </GradientButton>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GradientButton
                    onClick={() => addToCart(product)}
                    className="w-full py-2 text-sm"
                    disabled={product.orderQuantity <= 0}
                  >
                    Add to Cart
                  </GradientButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-10 gap-1"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-secondary text-white hover:bg-secondary-dark"
            }`}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft className="text-2xl" />
          </motion.button>

          {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map(
            (_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </motion.button>
            )
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredProducts.length / productsPerPage)
                )
              )
            }
            className={`p-2 rounded-md ${
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-secondary text-white hover:bg-secondary-dark"
            }`}
            disabled={
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
            }
          >
            <MdOutlineKeyboardArrowRight className="text-2xl" />
          </motion.button>
        </motion.div>
      )}

      {/* Details Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-8 rounded-xl w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProduct.productName}
              </h2>
              <motion.button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                whileHover={{ rotate: 90, scale: 1.1 }}
              >
                ✕
              </motion.button>
            </div>

            <motion.img
              src={selectedProduct.image}
              alt={selectedProduct.productName}
              className="w-full h-64 object-contain rounded-lg mb-6"
              whileHover={{ scale: 1.05 }}
            />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-bold text-secondary">
                  ${selectedProduct.amount}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-600">Rating:</span>
                <div className="flex">
                  {renderRating(selectedProduct.rating || 4.5)}
                </div>
                <span className="text-sm text-gray-500">
                  ({selectedProduct.reviews || 24} reviews)
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <span
                  className={`font-medium ${
                    selectedProduct.orderQuantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedProduct.orderQuantity > 0
                    ? `${selectedProduct.orderQuantity} in stock`
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">
                  {selectedProduct.status}
                </span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <GradientButton
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeModal();
                  }}
                  className="w-full py-3"
                  disabled={selectedProduct.orderQuantity <= 0}
                >
                  Add to Cart
                </GradientButton>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <GradientButton className="w-full py-3">Buy Now</GradientButton>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ProductInfo;
