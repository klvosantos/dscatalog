import BaseForm from 'pages/Admin/components/BaseForm';
import React from 'react';
import { useForm } from 'react-hook-form';
import { makePrivateRequest} from 'core/Utils/request';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    description:string;
    ImageUrl: string;
}

const Form = () => {
    const {} = useForm<FormState>();
    const { register, handleSubmit } = useForm<FormState>();

    const onSubmit = (data: FormState ) => {  
        makePrivateRequest({ url: '/products', method: 'POST', data});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="cadastrar um produto">

                <div className="row">
                    <div className="col-6">
                        <input
                            ref={register({ required: "Campo obrigatório" })}  
                            name="name"
                            type="text"
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Nome do produto"
                        />                        
                        <input
                            ref={register({ required: "Campo obrigatório" })}  
                            name="price"
                            type="number"
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Preço"
                        />
                        <input
                            ref={register({ required: "Campo obrigatório" })}  
                            name="imageUrl"
                            type="text"
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Imagem do produto"
                        />    
                    </div>
                    <div className="col-6">
                        <textarea
                            ref={register({ required: "Campo obrigatório" })}  
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;