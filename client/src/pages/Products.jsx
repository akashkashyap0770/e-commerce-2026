import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
import API from "../utils/axios";
import ProductCard from "../components/ProductCard";

function Products() {
  // const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col p-4">
      <h1 className="text-2xl mb-4 p-4">All Products</h1>

      <div className="p-4 grid grid-cols-3 gap-8 mt-4">
        {/* <h1 className="text-3xl">🎉 Welcome {user?.user_name?.toUpperCase()}</h1> */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
