import React from 'react';
import { Building2, MapPin, User, CheckCircle2, Wallet } from 'lucide-react';
import { FormType } from '../App';

interface StepIndicatorProps {
  currentStep: number;
  formType: FormType;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, formType }) => {
  const allSteps = [
    { icon: User, label: 'Dados Pessoais' },
    { icon: MapPin, label: 'Endereço e Contato' },
    { icon: Building2, label: 'Dados do Imóvel' },
    { icon: Wallet, label: 'Dados Bancários' },
    { icon: CheckCircle2, label: 'Revisão' },
  ];

  // Filtrar steps baseado no tipo de formulário
  let steps = allSteps;
  if (formType === 'tenant') {
    steps = allSteps.filter(step => step.label !== 'Dados do Imóvel' && step.label !== 'Dados Bancários');
  } else if (formType === 'buyer') {
    steps = allSteps.filter(step => step.label !== 'Dados do Imóvel' && step.label !== 'Dados Bancários');
  }

  return (
    <div className="flex justify-center items-center gap-4">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        // Para buyer e tenant, o currentStep já corresponde ao índice correto no array filtrado
        // Para owner, também corresponde porque não filtramos nada
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className={`h-1 w-20 ${
                  isCompleted ? 'bg-[#a11882]' : 'bg-gray-300'
                }`}
              />
            )}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive || isCompleted
                    ? 'bg-[#a11882] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <StepIcon size={20} />
              </div>
              <span
                className={`text-sm ${
                  isActive ? 'text-[#a11882] font-medium' : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;