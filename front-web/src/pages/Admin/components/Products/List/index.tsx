import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makerequest } from 'core/Utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';

const List = () => {
  const [productsResponse, setProductResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();

  console.log(productsResponse);
  
  useEffect(() => {
     const params = {
        page: activePage,
        linesPerPage: 4
     }
     
     setIsLoading(true)
     makerequest({ url: '/products', params })
     .then(response => setProductResponse(response.data))
     .finally(() => {
     setIsLoading(false);
     })
  }, [activePage]);

    

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
      <div className="admin-products-list">
          <button className="btn btn-primary btn-lg" onClick={handleCreate}>
            ADICIONAR
          </button>
          <div className="admin-list-container">
            {productsResponse?.content.map(product => (
              <Card product={product} key={product.id} />
            ))}
            {productsResponse && (
              <Pagination 
                totalPages={productsResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
              />
            )}
          </div>
      </div>
    )
}

export default List;