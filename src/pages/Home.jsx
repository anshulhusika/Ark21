import TermsPopup from "../components/TermsPopup";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from '../api'
const Home = () => {
    const location = useLocation();
  const [mode, setMode] = useState("buyer");
  const [search, setSearch] = useState("");
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const params = new URLSearchParams(location.search);
  const q = params.get("q");

  if (q) {
    setSearch(q);
  }
}, [location.search]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log('products',res.data)
      setProducts(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Components", icon: "⚙️" },
    { name: "Home Appliances", icon: "🏠" },
    { name: "Fashion", icon: "👕" },
    { name: "Furniture", icon: "🪑" },
    { name: "Industrial", icon: "🏭" },
  ];

  const featuredProducts = [
    { id: 1, name: "iPhone 14", price: "₹65000" },
    { id: 2, name: "Dell Laptop", price: "₹52000" },
    { id: 3, name: "Smart TV", price: "₹32000" },
    { id: 4, name: "Bluetooth Speaker", price: "₹2500" },
    { id: 5, name: "CCTV Camera", price: "₹1800" },
  ];

//   const products = [
//     { id: 1, name: "Mobile Phones", price: "₹12000", category: "Electronics" },
//     { id: 2, name: "Laptop Bags", price: "₹800", category: "Fashion" },
//     { id: 3, name: "Bluetooth Headphones", price: "₹1500", category: "Electronics" },
//     { id: 4, name: "Smart Watches", price: "₹2500", category: "Electronics" },
//     { id: 5, name: "LED Bulbs", price: "₹120", category: "Home Appliances" },
//     { id: 6, name: "Office Chairs", price: "₹4500", category: "Furniture" },
//   ];
const filteredProducts = Array.isArray(products)
  ? products.filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  return (
    <div className="bg-gray-50 min-h-screen">
     <TermsPopup />

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            India’s Modern B2B Marketplace
          </h1>

          <p className="mt-3 text-blue-100">
            Buy and Sell Products Easily Across India
          </p>

          <div className="mt-6 flex justify-center">
            <div className="bg-white p-1 rounded-lg inline-flex text-black shadow-lg">

              <button
                onClick={() => setMode("buyer")}
                className={`px-6 py-2 rounded ${
                  mode === "buyer"
                    ? "bg-blue-700 text-white"
                    : "bg-transparent"
                }`}
              >
                Buyer Mode
              </button>

              <button
                onClick={() => setMode("seller")}
                className={`px-6 py-2 rounded ${
                  mode === "seller"
                    ? "bg-blue-700 text-white"
                    : "bg-transparent"
                }`}
              >
                Seller Mode
              </button>

            </div>
          </div>

          <div className="mt-6 max-w-2xl mx-auto">
            <input
              className="w-full p-4 rounded-lg text-black focus:outline-none shadow"
              placeholder={
                mode === "buyer"
                  ? "Search for products..."
                  : "Search your listings..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-4">Browse Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center cursor-pointer"
            >
              <div className="text-3xl">{cat.icon}</div>
              <p className="mt-2 font-semibold">{cat.name}</p>
            </div>
          ))}

        </div>
      </div>

      {/* FEATURED SLIDER */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>

        <div className="flex gap-4 overflow-x-auto pb-4">

          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="min-w-[230px] bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600 mt-1">{item.price}</p>

              <button className="mt-3 bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                View
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

         {loading ? (
  <p className="text-center col-span-3 text-gray-500">
    Loading products...
  </p>
) : filteredProducts.length > 0 ? (
  filteredProducts.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
    >
      {item.image && (
        <img
          src={`${api}/uploads/${item.image}`}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="font-bold text-lg">{item.name}</h3>

      <p className="text-sm text-gray-500">
        {item.category}
      </p>

      <p className="text-gray-700 mt-2 font-semibold">
        {item.price}
      </p>

      {mode === "buyer" ? (
        <a
  href={`/product/${item._id}`}
  className="block mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg w-full text-center"
>
  Buy
</a>

      ) : (
        <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg w-full">
          Manage Product
        </button>
      )}
    </div>
  ))
) : (
  <p className="text-center col-span-3 text-gray-500">
    No products found
  </p>
)}


        </div>
      </div>

    </div>
  );
};

export default Home;
