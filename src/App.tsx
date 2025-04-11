import React, { useState } from 'react';
import { Home, User } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressContactForm from './components/AddressContactForm';
import PropertyForm from './components/PropertyForm';
import ReviewForm from './components/ReviewForm';
import StepIndicator from './components/StepIndicator';
import Sucesso from './pages/Sucesso';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export type FormType = 'owner' | 'buyer' | 'tenant';

interface FormData {
  [key: string]: string;
}

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formType, setFormType] = useState<FormType>('owner');
  const [formData, setFormData] = useState<FormData>({});

  const handleTypeChange = (type: FormType) => {
    setFormType(type);
    setCurrentStep(1);
    setFormData({});
    // Resetar o estado do formulário
    const formElements = document.querySelectorAll('form input, form select, form textarea');
    formElements.forEach((element: any) => {
      if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = false;
      } else {
        element.value = '';
      }
    });
  };

  const handleNext = (data: FormData) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (data: FormData) => {
    const finalData = { ...formData, ...data };
    
    // Mapeamento de campos para labels
    const fieldLabels: { [key: string]: string } = {
      // Dados Pessoais
      fullName: 'Nome completo',
      birthDate: 'Data de nascimento',
      maritalStatus: 'Estado civil',
      nationality: 'Nacionalidade',
      birthPlace: 'Naturalidade',
      cpf: 'CPF',
      rg: 'RG',
      rgIssuer: 'Órgão emissor',
      rgIssueDate: 'Data de emissão',
      
      // Dados do Cônjuge
      spouseFullName: 'Nome completo do cônjuge',
      spouseBirthDate: 'Data de nascimento do cônjuge',
      spouseNationality: 'Nacionalidade do cônjuge',
      spouseBirthPlace: 'Naturalidade do cônjuge',
      spouseCpf: 'CPF do cônjuge',
      spouseRg: 'RG do cônjuge',
      spouseRgIssuer: 'Órgão emissor do cônjuge',
      spouseRgIssueDate: 'Data de emissão do cônjuge',
      
      // Endereço e Contato
      address: 'Endereço',
      number: 'Número',
      complement: 'Complemento',
      neighborhood: 'Bairro',
      city: 'Cidade',
      state: 'Estado',
      zipCode: 'CEP',
      phone: 'Celular',
      spousePhone: 'Celular do cônjuge',
      email: 'E-mail',
      spouseEmail: 'E-mail do cônjuge',
      profession: 'Profissão',
      spouseProfession: 'Profissão do cônjuge',
      
      // Dados do Imóvel
      propertyAddress: 'Endereço do imóvel',
      propertyNumber: 'Número do imóvel',
      propertyComplement: 'Complemento do imóvel',
      propertyNeighborhood: 'Bairro do imóvel',
      propertyCity: 'Cidade do imóvel',
      propertyState: 'Estado do imóvel',
      propertyZipCode: 'CEP do imóvel',
      registrationNumber: 'Número de matrícula',
      iptuNumber: 'Número de cadastro do imóvel IPTU',
      
      // Dados Bancários
      bankName: 'Banco',
      bankAgency: 'Agência',
      bankAccount: 'Conta',
      pixKey: 'Chave PIX'
    };

    // Mapeamento dos tipos de formulário para português
    const formTypeLabels: { [key in FormType]: string } = {
      owner: 'Proprietário',
      buyer: 'Comprador',
      tenant: 'Inquilino'
    };
    
    // Criar um formulário temporário para enviar os dados
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/christian.diogo@immobiledigital.com.br';
    
    // Adicionar os campos do formulário com labels formatados
    Object.entries(finalData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = fieldLabels[key] || key;
      input.value = String(value);
      form.appendChild(input);
    });

    // Adicionar campos de configuração do FormSubmit
    const configInputs = [
      { name: '_subject', value: `Novo cadastro - ${formTypeLabels[formType]}` },
      { name: '_template', value: 'table' },
      { name: '_next', value: window.location.origin + '/sucesso' },
      { name: '_autoresponse', value: 'Obrigado! Recebemos seu cadastro com sucesso.' },
      { name: '_csv', value: 'true' }
    ];

    configInputs.forEach(({ name, value }) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    // Enviar o formulário
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#190717] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="h-12" />
          </div>
        </div>
      </div>

      {/* Form Type Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleTypeChange('owner')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                formType === 'owner'
                  ? 'bg-[#a11882] text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <Home size={20} />
              Proprietário
            </button>
            <button
              onClick={() => handleTypeChange('buyer')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                formType === 'buyer'
                  ? 'bg-[#a11882] text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <User size={20} />
              Comprador
            </button>
            <button
              onClick={() => handleTypeChange('tenant')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                formType === 'tenant'
                  ? 'bg-[#a11882] text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <User size={20} />
              Inquilino
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} formType={formType} />

        {/* Form Steps */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
          {currentStep === 1 && (
            <PersonalInfoForm onSubmit={handleNext} />
          )}
          {currentStep === 2 && (
            <AddressContactForm
              onBack={handleBack}
              onSubmit={handleNext}
            />
          )}
          {currentStep === 3 && (
            <PropertyForm
              onBack={handleBack}
              onSubmit={handleNext}
              formType={formType}
            />
          )}
          {currentStep === 4 && (
            <ReviewForm
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/formulario-immobiledigital">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </Router>
  );
}

export default App;