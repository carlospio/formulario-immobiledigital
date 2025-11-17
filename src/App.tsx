import React, { useState } from 'react';
import { Home, User, Loader2 } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressContactForm from './components/AddressContactForm';
import PropertyForm from './components/PropertyForm';
import BankInfoForm from './components/BankInfoForm';
import ReviewForm from './components/ReviewForm';
import StepIndicator from './components/StepIndicator';
import Sucesso from './pages/Sucesso';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { sendEmail } from './utils/emailService';

export type FormType = 'owner' | 'buyer' | 'tenant';

interface FormData {
  [key: string]: string;
}

function Form() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formType, setFormType] = useState<FormType>('owner');
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    // Calcular o step máximo baseado no tipo de formulário
    const maxStep = (formType === 'buyer' || formType === 'tenant') ? 3 : 5;
    setCurrentStep(prev => Math.min(prev + 1, maxStep));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (data: FormData) => {
    const finalData = { ...formData, ...data };
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await sendEmail(finalData, formType);
      // Redirecionar para página de sucesso após envio bem-sucedido
      navigate('/sucesso');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitError(
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente ou entre em contato conosco.'
      );
      setIsSubmitting(false);
    }
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
          {/* Mensagem de erro */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}

          {/* Loading overlay */}
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-[#a11882] animate-spin" />
                <p className="text-gray-700">Enviando formulário...</p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <PersonalInfoForm onSubmit={handleNext} />
          )}
          {currentStep === 2 && (
            <AddressContactForm
              onBack={handleBack}
              onSubmit={handleNext}
            />
          )}
          {/* Step 3: Dados do Imóvel (apenas para Proprietário) */}
          {currentStep === 3 && formType === 'owner' && (
            <PropertyForm
              onBack={handleBack}
              onSubmit={handleNext}
              formType={formType}
            />
          )}
          {/* Step 3: Revisão (para Comprador e Inquilino) */}
          {(currentStep === 3 && (formType === 'buyer' || formType === 'tenant')) && (
            <ReviewForm
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
          {/* Step 4: Dados Bancários (apenas para Proprietário) */}
          {currentStep === 4 && formType === 'owner' && (
            <BankInfoForm
              onBack={handleBack}
              onSubmit={handleNext}
            />
          )}
          {/* Step 5: Revisão (apenas para Proprietário) */}
          {currentStep === 5 && formType === 'owner' && (
            <ReviewForm
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </Router>
  );
}

export default App;