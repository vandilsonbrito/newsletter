import { useState } from "react";
import PropTypes from 'prop-types';
import { useEffect } from "react";

CustomForm.propTypes = {
    status: PropTypes.string,
    message: PropTypes.any,
    onValidated: PropTypes.func
};

export default function CustomForm({ status, message, onValidated}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [activeButton, setActiveButton] = useState(true);
    const [translatedMessage, setTranslatedMessage] = useState(message);

    const handleNameChange = (e) => {
        const value = e?.target.value || '';
        setName(value);

        if(value === '') {
            setNameErrorMessage('Por favor, informe um nome!')
        }
        else {
            setNameErrorMessage("")
        }
    }

    const handleEmailChange = (e) => {
        const value = e?.target.value || '';
        setEmail(value);

        if(value === '') {
            setEmailErrorMessage("Por favor, informe um e-mail.");
        }
        else {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if(value && (!emailRegex.test(value))) {
                setEmailErrorMessage("E-mail inválido.");
            }
            else {
                setEmailErrorMessage("")
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        name &&
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email,
            MERGE1: name
        });


    }

    const translateMessageFunction = (message) => {
        const translations = {
            'Thank you for subscribing!': 'Inscrição realizada!',
            "You're already subscribed, your profile has been updated. Thank you!": 'Você já está inscrito nessa newsletter!'
        };
        
        if(translations[message]) {
            return translations[message];
        }
        else {
            return message;
        }
    }
    useEffect(() => {
        setTranslatedMessage(translateMessageFunction(message))
        const timer = setTimeout(() => {
            setTranslatedMessage(' ')
        }, 3000);
        

        return () => {
            clearTimeout(timer)
        }
    }, [message])

    useEffect(() => {
        status === 'success' ? (setName(''), setEmail('')) : '';

    }, [status])
    
    useEffect(() => {       
        if(name && email) setActiveButton(false);
    }, [name, email])
        
    return (
        <form
        className='w-[300px] md:w-[380px] flex flex-col items-left gap-2'
        onSubmit={(e) => handleSubmit(e)}>

            <div className="h-5 mb-1">
                {status === "sending" && (
                <div className="flex items-center justify-center">
                    <span className="">Enviando</span>
                    <span className="text-xl animate-dot1">.</span>
                    <span className="text-xl animate-dot2 opacity-0">.</span>
                    <span className="text-xl animate-dot3 opacity-0">.</span>
                </div>)}

                <p className={`text-center font-medium ${message === 'Thank you for subscribing!' ? 'text-green-500' : 'text-red-500'}`}>{translatedMessage}</p>
            </div>
            
            <div className="w-full h-full flex justify-between">
                <label htmlFor="name">Nome</label>
                <p className="text-red-500">{nameErrorMessage}</p>
            </div>
            <input 
            className='w-full p-2 border-2 border-slate-500 rounded-md pl-2 mb-3' 
            type="text" 
            name="Name" 
            value={name} 
            id="name" 
            placeholder='Maria Souza'
            onChange={(e) => handleNameChange(e)}
            />
            <div className="w-full h-full flex justify-between">
                <label htmlFor="email">E-mail</label>
                <p className="text-red-500">{emailErrorMessage}</p>
            </div>
            <input 
            className='w-full p-2 border-2 border-slate-500 rounded-md pl-2'
            type="email" 
            name="Email" 
            value={email}
            id="email" 
            placeholder="meuemail@exemplo.com"
            onChange={(e) => handleEmailChange(e)}/>
            <button 
            className={`w-full lg:w-[310px] h-[52px] mx-auto mt-5 bg-[#071757e0]  text-white font-medium tracking-wide rounded-lg hover:shadow-lg ${!activeButton && ' active:scale-x-[.98]'}`}
            type="submit" disabled={activeButton}>Receber Dicas</button>
        </form>
    );
}

