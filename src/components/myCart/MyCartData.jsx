import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import GradientButton from "../common/GradiantButton";

const MyCartData = () => {
  // Dummy Data for Testing
  const dummyCartData = [
    {
      key: "1",
      productName: "Product A",
      price: 50,
      quantity: 1,
      image:
        "https://i.ibb.co/5WRNH1d3/fresh-healthy-fruits-straw-basket-generative-ai-188544-11999.jpg",
    },
    {
      key: "2",
      productName: "Product B",
      price: 30,
      quantity: 2,
      image:
        "https://i.ibb.co/5WRNH1d3/fresh-healthy-fruits-straw-basket-generative-ai-188544-11999.jpg",
    },
  ];

  // Cart State
  const [cart, setCart] = useState(dummyCartData);

  // Increase quantity
  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.key === product.key ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.key === product.key && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Remove product from cart
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.key !== product.key);
    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.length
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="min-h-screen p-6 w-[1000px] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div
              key={product.key}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="w-24 h-16 object-cover rounded-md"
              />
              <div className="flex gap-5 items-center ml-4">
                <h3 className=" ">{product.productName}</h3>
                <p className="">Price: ${product.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => decreaseQuantity(product)}
                  className="bg-gray-300 px-2 py-1 rounded-md"
                >
                  -
                </button>
                <span className="px-4">{product.quantity}</span>
                <button
                  onClick={() => increaseQuantity(product)}
                  className="bg-gray-300 px-2 py-1 rounded-md"
                >
                  +
                </button>
              </div>

              <div>
                <p className="">
                  Total:{" "}
                  <span className="text-xl font-semibold text-secondary">
                    ${product.price * product.quantity}
                  </span>
                </p>
              </div>

              <button
                onClick={() => removeFromCart(product)}
                className="text-red-500 text-xl ml-4"
              >
                <IoTrashOutline />
              </button>
            </div>
          ))}
          <div className="text-lg flex justify-end px-6 font-semibold mt-4 shadow-lg rounded-lg py-5 pr-36 bg-white mb-10">
            Grand Total:
            <span className="text-xl font-semibold text-secondary ml-2">
              ${totalPrice}
            </span>
          </div>
          <div className="flex justify-end">
            <GradientButton >Buy Now</GradientButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCartData;
