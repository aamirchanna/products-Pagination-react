import { useEffect, useState } from 'react';

import { Pagination } from "antd"
;
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then((res) => {
        setProducts(res.products);
        setTotal(res.total);
        setLoading(false);
      });
  }, [limit , skip]);

  console.log("products==>", products);
  console.log("totals==>", total);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading) {
  //       console.log("skip=>", skip);
  //       console.log("total=>", total);
  //       if (products.length < total) {
  //         setLimit(skip + limit);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [skip, loading, products.length, total]);

  return (
    <div>
      <h2 className='text-center text-2xl '>Pagination of Products</h2>
      {loading ? (
        <p className='text-center text-2xl'>Loading...</p>
      ) : (
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 m-3 items-center '>
          {products.map((data) => (
            <div key={data.id} className='items-center border rounded-lg m-3 p-2 shadow-md'>
              <img src={data.thumbnail} alt={data.title} className='items-center object-cover h-200' />
              <div className='p-2 flex justify-between'>
                <h2 className='font-bold'>{data.title}</h2>
                <h3 className='font-semibold'>${data.price}</h3>
              </div>
            </div>
          ))}
        </div>
    )}
    <Pagination 
   onChange={(num) => setSkip((num - 1) * limit)}
   onShowSizeChange={(page, pageSize) => setLimit(pageSize)}
   defaultCurrent={1}
   total={total}
   pageSize={limit} 
   />
  </div>
  );
}

export default App;
