import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/Utils/request';

type FormData = {    // tipo de dados que serao enviados para a api
    username: string;
    password: string;
}

const Login = () => {
   const { register, handleSubmit} = useForm<FormData>(); // tipo o useForm com o FormData(fazendo isso o react hook form integra com o typescript) e quando o formulario for submetido ele seguira o modelo de dados estabelecido no FormData
   const [hasError, setHasError] = useState(false );

   const onSubmit = (data: FormData) => {
      makeLogin(data)
      .then(response => {
         setHasError(false);
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
           <input 
             type="email"
             className="form-control input-base margin-bottom-30"
             placeholder="Email"
             name="username"
             ref={register({ required: true })}    
           />      
           <input 
             type="password"
             className="form-control input-base"
             placeholder="Senha" 
             name="password"
             ref={register({ required: true })}    
           />
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