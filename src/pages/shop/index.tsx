import Link from "next/link";
import { useState, useEffect } from "react";

type fetchData = {
    id:number;
    name: string;
    description: string;
    quantity:number;
    cost:number;
    size:number;
    color:string;
    picture:string;
 }

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const buyProduct = async (product: any) => {
    //web 3
  };

  return (
    <>
      <h1>Welcome to Shop</h1>

      {products.map((p: fetchData) => {
        return (
          <div key={p.id} style={{ paddingTop: "20px" }}>
            <h2>{p.name}</h2>
            <p>{p.cost}</p>
            <p>{p.picture}</p>
            <Link href={`shop/${p.id}`}>
                    <button>Buy</button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ShopPage;
