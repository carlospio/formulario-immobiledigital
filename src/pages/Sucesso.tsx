import React from 'react';
import { CheckCircle } from 'lucide-react';

const Sucesso = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Cadastro Realizado com Sucesso!
        </h1>
        <p className="text-gray-600 mb-8">
          Obrigado por se cadastrar. Em breve entraremos em contato.
        </p>
        <a
          href="/"
          className="inline-block bg-[#a11882] text-white px-6 py-2 rounded-lg hover:bg-[#8a1470] transition-colors"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default Sucesso; 