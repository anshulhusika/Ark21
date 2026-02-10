import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pinMsg, setPinMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);

      const all = await api.get("/products");
      const related = all.data.filter(
        (p) => p.category === res.data.category && p._id !== id
      );

      setSimilar(related.slice(0, 6));
    };

    fetchProduct();
  }, [id]);

  const increase = () => setQty(qty + 1);

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setPinMsg("Please enter a valid 6 digit pincode");
      return;
    }

    setPinMsg("Delivery available to your location ✔️");
  };

  const addToCart = () => {
    alert(`Added ${qty} items to cart`);
  };

  const buyNow = () => {
    alert(`Proceeding to buy ${qty} items`);
  };

  if (!product) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-6 p-4 md:p-6">

        {/* LEFT SIDE - STICKY IMAGE */}
        <div className="md:sticky md:top-24 self-start">

          <div className="bg-gray-50 p-4 rounded-xl">

            {product.image && (
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                className="w-full rounded-xl object-cover"
              />
            )}

            <div className="grid grid-cols-2 gap-3 mt-4">

              <button
                onClick={addToCart}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-xl font-semibold transition"
              >
                Add to Cart
              </button>

              <button
                onClick={buyNow}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE - SCROLLABLE DETAILS */}
        <div className="max-h-[80vh] overflow-y-auto pr-2">

          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>

            <p className="text-gray-500">
              Category: {product.category}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <p className="text-2xl font-bold text-blue-700">
              {product.price}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">

            <h4 className="font-bold mb-3">Select Quantity</h4>

            <div className="flex items-center gap-4">
              <button
                onClick={decrease}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                -
              </button>

              <span className="text-xl font-bold">{qty}</span>

              <button
                onClick={increase}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                +
              </button>
            </div>

          </div>

          {/* PINCODE CHECK */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">

            <h4 className="font-bold mb-2">
              Check Delivery Availability
            </h4>

            <div className="flex gap-2">
              <input
                className="border p-3 rounded-xl w-full focus:outline-none"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <button
                onClick={checkPincode}
                className="bg-green-700 text-white px-4 rounded-xl"
              >
                Check
              </button>
            </div>

            {pinMsg && (
              <p className="text-sm mt-2 text-gray-700">
                {pinMsg}
              </p>
            )}

          </div>

          {/* DESCRIPTION */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">

            <h4 className="font-bold mb-3">Product Details</h4>

            <p className="text-gray-700 leading-relaxed">
              {product.description || "No description available"}
            </p>

          </div>

        </div>

      </div>

      {/* SIMILAR PRODUCTS */}
      {similar.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">

          <h3 className="text-xl font-bold mb-4">
            Similar Products
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {similar.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition"
              >
                {item.image && (
                  <img
                    src={`${api}/uploads/${item.image}`}
                    className="w-full h-36 object-cover rounded-lg mb-2"
                  />
                )}

                <h4 className="font-bold">{item.name}</h4>

                <p className="text-gray-600">{item.price}</p>
              </Link>
            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default ProductDetail;
