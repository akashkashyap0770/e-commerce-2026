import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1 className="h-screen mt-6">Loading...</h1>;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-6">🛍️ Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
