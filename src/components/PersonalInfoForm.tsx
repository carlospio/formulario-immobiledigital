import React, { useState } from 'react';
import { formatCPF, formatRG, formatPhone } from '../utils/formatters';

interface PersonalInfoFormProps {
  onSubmit: (data: any) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit }) => {
  const [isMarried, setIsMarried] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    // Se não for casado ou união estável, remove os dados do cônjuge
    if (!isMarried) {
      delete data.spouseFullName;
      delete data.spouseBirthDate;
      delete data.spouseNationality;
      delete data.spouseBirthPlace;
      delete data.spouseCpf;
      delete data.spouseRg;
      delete data.spouseRgIssuer;
      delete data.spouseRgIssueDate;
    }
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dados Pessoais</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            type="text"
            name="fullName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data de Nascimento
          </label>
          <input
            type="date"
            name="birthDate"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado Civil
          </label>
          <select
            name="maritalStatus"
            onChange={(e) => setIsMarried(e.target.value === 'casado' || e.target.value === 'uniao_estavel')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          >
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="uniao_estavel">União Estável</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nacionalidade
          </label>
          <input
            type="text"
            name="nationality"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Naturalidade
          </label>
          <input
            type="text"
            name="birthPlace"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            CPF
          </label>
          <input
            type="text"
            name="cpf"
            required
            maxLength={14}
            onChange={(e) => {
              e.target.value = formatCPF(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            RG
          </label>
          <input
            type="text"
            name="rg"
            required
            maxLength={12}
            onChange={(e) => {
              e.target.value = formatRG(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Órgão Emissor
          </label>
          <input
            type="text"
            name="rgIssuer"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data de Emissão
          </label>
          <input
            type="date"
            name="rgIssueDate"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>
      </div>

      {isMarried && (
        <>
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-6">
            Dados do Cônjuge
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome Completo do Cônjuge
              </label>
              <input
                type="text"
                name="spouseFullName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Nascimento do Cônjuge
              </label>
              <input
                type="date"
                name="spouseBirthDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nacionalidade do Cônjuge
              </label>
              <input
                type="text"
                name="spouseNationality"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Naturalidade do Cônjuge
              </label>
              <input
                type="text"
                name="spouseBirthPlace"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CPF do Cônjuge
              </label>
              <input
                type="text"
                name="spouseCpf"
                required
                maxLength={14}
                onChange={(e) => {
                  e.target.value = formatCPF(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                RG do Cônjuge
              </label>
              <input
                type="text"
                name="spouseRg"
                required
                maxLength={12}
                onChange={(e) => {
                  e.target.value = formatRG(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Órgão Emissor do Cônjuge
              </label>
              <input
                type="text"
                name="spouseRgIssuer"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Emissão do Cônjuge
              </label>
              <input
                type="date"
                name="spouseRgIssueDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-[#a11882] text-white px-6 py-2 rounded-lg hover:bg-[#8a1470] transition-colors"
        >
          Próximo
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;