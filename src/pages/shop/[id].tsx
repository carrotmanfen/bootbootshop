import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react";
import Image from 'next/image';
import axios from 'axios';

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
  const [productId, setProductId] = useState('');
  const [address, setAddress] = useState('KMUTT THAILAND');
  const searchParams = useSearchParams()
  const router = useRouter()
  const { id } = router.query
  
  
  console.log("id is"+String(id))

  const fetchProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await response.json();
    console.log("data is"+data)
    setProduct(data);
    setProductId(String(id));
  };

  useEffect(() => {
    if(id) {
      fetchProducts();
    }
  }, [id]);

  const handleBuyProduct = async () => {
    try {
      const response = await axios.put('http://localhost:3000/api/products/updateProduct', {productId});
      console.log(response.data);
      // Handle success or display a success message
    } catch (error) {
      console.error(error);
      // Handle error or display an error message
    }

    try {
        const response = await axios.post('http://localhost:3000/api/history/createHistory', {productId,address});
        console.log(response.data);
        // Handle success or display a success message
      } catch (error) {
        console.error(error);
        // Handle error or display an error message
      }

    // window.location.reload();
    router.push('/shop');
  };

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
                
                <Image
                className=""
                src={`${p.picture}`}
                width={400}
                height={400}
                alt={`${p.id}`}
              />
              
                <button onClick={handleBuyProduct}>Buy</button>
              </div>
            );
          })}
        </div>
      )
  }
}

export default ProductPage