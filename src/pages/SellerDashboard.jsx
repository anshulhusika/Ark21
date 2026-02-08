import { useState, useEffect } from "react";
import api from "../api";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/products/my");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("image", image);

    await api.post("/products", data);

    setSuccess("Product added successfully!");

    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
    });

    setImage(null);

    loadProducts();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Seller Dashboard
        </h2>

        {/* ADD PRODUCT CARD */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h3 className="text-xl font-bold mb-4">
            Add New Product
          </h3>

          {success && (
            <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
              {success}
            </div>
          )}

          <form onSubmit={addProduct}>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="name"
                placeholder="Product Name"
                className="input"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="price"
                placeholder="Price"
                className="input"
                value={form.price}
                onChange={handleChange}
                required
              />

              <input
                name="category"
                placeholder="Category"
                className="input"
                value={form.category}
                onChange={handleChange}
                required
              />

              <input
                type="file"
                className="input"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

            </div>

            <textarea
              name="description"
              placeholder="Description"
              className="input mt-4"
              value={form.description}
              onChange={handleChange}
            />

            <button className="btn-primary mt-4">
              Add Product
            </button>

          </form>
        </div>

        {/* PRODUCT LIST */}
        <h3 className="text-xl font-bold mb-4">
          My Products
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h4 className="font-bold text-lg">{p.name}</h4>

              <p className="text-gray-600">{p.price}</p>

              <p className="text-sm text-gray-500">
                {p.category}
              </p>

              <p className="text-sm mt-2">
                {p.description}
              </p>
            </div>
          ))}

          {products.length === 0 && (
            <p>No products added yet</p>
          )}

        </div>

      </div>
    </div>
  );
};

export default SellerDashboard;
