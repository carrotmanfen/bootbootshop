import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react";

type itemData = {
    id:number;
    name: string;
    description: string;
    quantity:number;
    cost:number;
    size:number;
    color:string;
    picture:string;
 }

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const searchParams = useSearchParams()
  const router = useRouter()
  const { id } = router.query
  
  console.log("id is"+String(id))

  const fetchProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await response.json();
    console.log("data is"+data)
    setProduct(data);
  };

  useEffect(() => {
    if(id) {
      fetchProducts();
    }
  }, [id]);

  if(product==null){
    return(
        <div>
            <h1>loading</h1>
        </div>
    )
  }else{
      return (
        <div>
          <h1>Product {id}</h1>
          {product.map((p: itemData) => {
          return (
              <div key={p.id} style={{ paddingTop: "20px" }}>
                <h2>{p.name}</h2>
                <p>{p.description}</p>
                <p>{p.quantity}</p>
                <p>{p.cost}</p>
                <p>{p.size}</p>
                <p>{p.color}</p>
                <p>{p.picture}</p>
                <button>Buy</button>
              </div>
            );
          })}
        </div>
      )
  }
}

export default ProductPage