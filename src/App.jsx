import heroImg from './assets/woman-relaxing.jpg';
import MailChimpForm from './components/MailcChimpForm/MailChimpForm';


function App() { 

  return (
    <div className='w-full h-full min-h-screen bg-[#071757c4] flex justify-center items-center py-14'>
      <div className="w-full lg:w-fit md:max-w-[920px] lg:h-fit bg-white flex flex-col justify-center items-center text-left lg:gap-8 px-5 md:px-10 py-5 md:py-10 shadow-xl rounded-xl">
          <h1 className='text-[#071757e0] font-semibold md:text-lg lg:text-[1.4rem]'>Mantenha-se Equilibrado: Receba Dicas de Bem-Estar e Saúde Mental</h1>
          <div className="w-full h-full flex flex-col-reverse justify-center items-center lg:flex-row lg:gap-5">
              <div className="text-left w-full h-full flex flex-col gap-5 lg:text-lg pb-10 lg:pr-7 mt-10">
                <h2>Bem-vindo à nossa comunidade dedicada ao seu bem-estar e saúde mental! <br/> <br/> Aqui, estamos comprometidos em fornecer recursos valiosos e dicas práticas para <strong>te ajudar a manter um equilíbrio saudável em sua vida</strong>.</h2>
                <p className='py-2 font-semibold '>Inscreva-se agora:</p>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <MailChimpForm/>
                </div>
              </div>
            <img className='h-[400px] md:h-[580px] rounded-lg mt-8 lg:my-auto' src={heroImg} alt="Mulher fazendo yoga, relaxando ao ar livre." />
        </div>
    </div>
  </div>
  )
}

export default App