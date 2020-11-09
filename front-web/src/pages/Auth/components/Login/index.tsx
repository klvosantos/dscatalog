import ButtonIcon from 'core/components/ButtonIcon';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/Utils/request';
import { saveSessionData } from 'core/Utils/auth';

type FormData = {    // tipo de dados que serao enviados para a api
    username: string;
    password: string;
}

type LocalState = {
   from: string;
}

const Login = () => {
   const { register, handleSubmit, errors } = useForm<FormData>(); // tipo o useForm com o FormData(fazendo isso o react hook form integra com o typescript) e quando o formulario for submetido ele seguira o modelo de dados estabelecido no FormData
   const [hasError, setHasError] = useState(false );
   const history = useHistory();
   const location = useLocation<LocalState>();

   const { from } = location.state || { from: { pathname: "/admin" } }; // location.state vale a rota que o usuario gostaria de ir, caso não exista ele redireciona para /admin

   const onSubmit = (data: FormData) => {
      makeLogin(data)
      .then(response => {
         setHasError(false);
         saveSessionData(response.data);
         history.replace(from); // limpa um item da pilha de navegação. // Quando o login é autenticado com sucesso, se o usuario escolher voltar uma pagina, ele é direcionado para a pagina anterior a tentativa de login(pois agora o usuario esta logado, assim nao havendo necessidade de ser direcionado para a tela de login novamente).   
      })
      .catch(() => {
         setHasError(true);
      })
   }    

   return (
    <AuthCard title="login">
      {hasError &&  
       <div className="alert alert-danger mt-5">
          usuario ou senha inválidos!
       </div>}
       <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="margin-bottom-30">
               <input 
                  type="email"
                  className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  name="username"
                  ref={register({
                     required: "Campo obrigatório",
                     pattern: {
                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                       message: "Email inválido"
                     }
                  })}
               />
              {errors.username && (
              <div className="invalid-feedback d-block">
                  {errors.username.message}
               </div>
               )}
           </div>      
            <div className="margin-bottom-30">
               <input 
                  type="password"
                  className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Senha" 
                  name="password"
                  ref={register({ required: "Campo obrigatório" })}    
               />
               {errors.password && (
              <div className="invalid-feedback d-block">
                  {errors.password.message}
               </div>
               )}
            </div>
           <Link to="/admin/auth/recover" className="login-link-recover">
              Esqueci a senha?
           </Link>
           <div className="login-submit">
               <ButtonIcon text="Logar" /> {/*Como o botao esta dentro do formulario, quando for acionado ele submetera o formulario, e uma vez feito isso o react-hook-form (handleSubmit) ira capturar e tratar essa submissão*/}
           </div>
           <div className="text-center">
              <span className="not-registered">
                 Não tem Cadastro?
              </span>
              <Link to="/admin/auth/register" className="login-link-register">
                CADASTRAR  
              </Link>
           </div>
       </form>
    </AuthCard>
  )
}

export default Login;