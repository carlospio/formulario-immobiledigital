import React from 'react';
import { formatPhone } from '../utils/formatters';

interface AddressContactFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const AddressContactForm: React.FC<AddressContactFormProps> = ({ onBack, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Endereço, Contato e Ocupação
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Endereço
          </label>
          <input
            type="text"
            name="address"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input
            type="text"
            name="number"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Complemento
          </label>
          <input
            type="text"
            name="complement"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bairro
          </label>
          <input
            type="text"
            name="neighborhood"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <input
            type="text"
            name="city"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <input
            type="text"
            name="state"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            CEP
          </label>
          <input
            type="text"
            name="zipCode"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Celular
          </label>
          <input
            type="tel"
            name="phone"
            required
            maxLength={15}
            onChange={(e) => {
              e.target.value = formatPhone(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Celular (cônjuge)
          </label>
          <input
            type="tel"
            name="spousePhone"
            maxLength={15}
            onChange={(e) => {
              e.target.value = formatPhone(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-mail (cônjuge)
          </label>
          <input
            type="email"
            name="spouseEmail"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profissão
          </label>
          <input
            type="text"
            name="profession"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profissão (cônjuge)
          </label>
          <input
            type="text"
            name="spouseProfession"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>
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

export default AddressContactForm;