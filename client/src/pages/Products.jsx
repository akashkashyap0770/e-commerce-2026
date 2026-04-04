import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto w-full flex flex-col p-4">
      <h1 className="text-2xl mb-4 p-4">All Products</h1>

      {/* ✅ Loading */}
      {loading && (
        <div className="text-center text-lg">Loading products...</div>
      )}

      {/* ❌ Error */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* ⚠️ Empty */}
      {!loading && products.length === 0 && (
        <div className="text-center text-gray-400">No products found 😕</div>
      )}

      {/* ✅ Products Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
