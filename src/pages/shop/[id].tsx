import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Navbar from '@/components/Nav';

type ItemData = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  cost: number;
  size: number;
  color: string;
  picture: string;
};

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<ItemData[]>([]);
  const [productId, setProductId] = useState<string>('');
  const [address, setAddress] = useState<string>('KMUTT THAILAND');
  const router = useRouter();
  const { id } = router.query;

  console.log('id is' + String(id));

  const fetchProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await response.json();
    console.log('data is' + data);
    setProduct(data);
    setProductId(String(id));
  };

  React.useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  interface ModalProps {
    message: string;
    
  }

  const [showModal, setShowModal] = useState(false);

  const showAlert = () => {

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const Modal: React.FC<ModalProps> = ({ message}) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p className='text-3xl text-white font-bold'>{message}</p>
          <div className='flex justify-between mx-6 mt-10 text-2xl font-semibold'>
            <button onClick={handleBuyProduct} className='border-2 px-12 pt-2 pb-3 rounded-xl bg-green-500 text-white'>Buy</button>
            <button onClick={closeModal} className='border-2 px-8 pt-2 pb-3 rounded-xl bg-red-500 text-white'>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const handleBuyProduct = async () => {
    // window.alert('Do you want to buy this product?');
    
    try {
      const response = await axios.put('http://localhost:3000/api/products/updateProduct', { productId });
      console.log(response.data);
      // Handle success or display a success message
    } catch (error) {
      console.error(error);
      // Handle error or display an error message
    }

    try {
      const response = await axios.post('http://localhost:3000/api/history/createHistory', { productId, address });
      console.log(response.data);
      // Handle success or display a success message
    } catch (error) {
      console.error(error);
      // Handle error or display an error message
    }

    // window.location.reload();
    router.push('/shop');
  };

  if (product == null) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  } else {
    return (
      <div className='relative'>
        <Navbar />
        {product.map((p: ItemData) => {
          return (
            <div key={p.id} className="pt-[20px] flex flex-row justify-center items-center">
              <Image className="" src={`${p.picture}`} width={600} height={600} alt={`${p.id}`} />
              <div className="p-8 border-2 flex flex-col w-[600px] h-[750px] justify-center text-6xl text-left">
                <h2 className="mb-4 font-bold">{p.name}</h2>
                <p className="text-2xl mb-12 text-gray-500 font-semibold">{p.description}</p>
                <p className="font-bold text-5xl mb-10">{p.cost} ETH</p>
                <p className="text-4xl font-semibold text-gray-500 mb-4">Size : {p.size}</p>
                <p className="text-4xl font-semibold text-gray-500 mb-4">Color : {p.color}</p>
                <p className="text-4xl font-semibold text-gray-500 mb-20">Quantity : {p.quantity}</p>
                <button
                  onClick={showAlert}
                  className="border-2 pt-4 pb-6 mx-20 rounded-3xl bg-blue-500 text-white font-bold"
                >
                  Buy
                </button>
              </div>
            </div>
          );
        })}
        <div className={`${showModal?"block":"hidden"} absolute flex items-center justify-center px-4 bottom-1/3 left-1/3 rounded-3xl w-[600px] h-[200px] bg-blue-500`}>
            <Modal message="Do you want to buy this product" />
        </div>
      </div>
    );
  }
};

export default ProductPage;