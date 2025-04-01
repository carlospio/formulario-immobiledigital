import React, { useState } from 'react';
import { Building2, Home, User } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressContactForm from './components/AddressContactForm';
import PropertyForm from './components/PropertyForm';
import StepIndicator from './components/StepIndicator';
import Sucesso from './pages/Sucesso';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export type FormType = 'owner' | 'buyer' | 'tenant';

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formType, setFormType] = useState<FormType>('owner');
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    
    // Criar um formulário temporário para enviar os dados
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/carlospiobenicio@gmail.com'; // Substitua pelo seu email
    
    // Adicionar os campos do formulário
    Object.entries(finalData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    // Adicionar campos de configuração do FormSubmit
    const configInputs = [
      { name: '_subject', value: `Novo cadastro - ${formType}` },
      { name: '_template', value: 'table' },
      { name: '_next', value: window.location.origin + '/sucesso' },
      { name: '_autoresponse', value: 'Obrigado! Recebemos seu cadastro com sucesso.' }
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
      <div className="bg-[#a11882] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="Logo" className="h-8" />
            <h1 className="text-2xl font-bold">Imobiliária Digital</h1>
          </div>
        </div>
      </div>

      {/* Form Type Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setFormType('owner')}
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
              onClick={() => setFormType('buyer')}
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
              onClick={() => setFormType('tenant')}
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
          {currentStep === 3 && formType !== 'tenant' && (
            <PropertyForm
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
    <Router basename="/immobiledigital">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </Router>
  );
}

export default App;