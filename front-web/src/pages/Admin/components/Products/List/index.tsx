import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makerequest } from 'core/Utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoader';

const List = () => {
  const [productsResponse, setProductResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
  
  useEffect(() => {
     const params = {
        page: activePage,
        linesPerPage: 4,
        direction: 'DESC',
        orderBy: 'id'
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
            {isLoading ? <CardLoader /> : (
              productsResponse?.content.map(product => (
                <Card product={product} key={product.id} />
              ))
            )}
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