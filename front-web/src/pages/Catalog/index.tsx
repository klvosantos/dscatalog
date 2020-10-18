import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import Pagination from 'core/components/Pagination';
import { makerequest } from 'core/Utils/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';

const Catalog = () =>  {

   const [productsResponse, setProductResponse] = useState<ProductsResponse>();
   const [isLoading, setIsLoading] = useState(false);
   const [activePage, setActivePage] = useState(0);

   console.log(productsResponse);
   
   useEffect(() => {
      const params = {
         page: activePage,
         linesPerPage: 12
      }
      
      setIsLoading(true)
      makerequest({ url: '/products', params })
      .then(response => setProductResponse(response.data))
      .finally(() => {
      setIsLoading(false);
      })
   }, [activePage]);
      
   return (
      <div className="catalog-container">
         <h1 className="catalog-title">
            Catálogo de produtos
         </h1>
         <div className="catalog-products">
            {isLoading ? <ProductCardLoader /> : (
               productsResponse?.content.map(product => ( 
                  <Link to={`/products/${product.id}`} key={product.id}>
                     <ProductCard product={product} />
                  </Link>
               ))
            )}              
         </div>
        {productsResponse && (
        <Pagination 
        totalPages={productsResponse.totalPages}
        activePage={activePage}
        onChange={page => setActivePage(page)}
        />
        )}
      </div>
   );
}

export default Catalog;
