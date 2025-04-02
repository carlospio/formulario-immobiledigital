import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Cadastro Realizado com Sucesso!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Obrigado por se cadastrar. Em breve entraremos em contato através do e-mail fornecido.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#a11882] text-white px-6 py-3 rounded-lg hover:bg-[#8a1470] transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Voltar para a página inicial
          </button>
          
          <p className="text-sm text-gray-500">
            Se precisar de mais informações, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sucesso; 