import { getAccessTokenDecoded, logout } from 'core/Utils/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

const Navbar = () => {
   const [currentUser, setCurrentUser] = useState('');
   const location = useLocation(); // É acionado quando há interação nas rotas

   useEffect(() => {
      const currentUserData = getAccessTokenDecoded();
      setCurrentUser(currentUserData.user_name);
   }, [location]);  // Se o array de depêndencias for vazio, é executado somente quando o componente inicializa
                    // useEffect depende do location, toda vez que location mudar acionara o useEffect executando o que estiver dentro da função  
   const handLogout  = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault(); // interrompe o comportamento padrão do link que seria adicionar a #logout na rota do navegador 
      logout();
   }

   return (
      <nav className="row bg-primary main-nav">
         <div className="col-3">
            <Link to="/" className="nav-logo-text">
               <h4>DS Catalog</h4>
            </Link>
         </div>
         <div className="col-6">
            <ul className="main-menu">
               <li>
                  <NavLink to="/" exact className="nav-link">
                     HOME
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/products" className="nav-link">
                     CATÁLOGO
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/admin" className="nav-link">
                     ADMIN
                  </NavLink>
               </li>
            </ul>
         </div>
         <div className="col-3 text-right">
            { currentUser && ( // Adicionado fragment <> </>, faz divisão logica, para evitar conflitos com o retorno de mais de uma tag root
            <>
              {currentUser}
              <a 
              href="#logout"   // href nao tem nenuma ção aqui, apenas pela semantica
              className="nav-link active d-inline"
              onClick={handLogout}
              >
                LOGOUT
              </a> 
            </>
            )}
            {!currentUser && (
              <Link to="/auth/login" className="nav-link active">
                LOGIN
              </Link>
            )} 
         </div>
      </nav>
   )
};

export default Navbar;



