import React from 'react';

interface PropertyFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
  formType: 'owner' | 'buyer' | 'tenant';
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onBack, onSubmit, formType }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formType !== 'tenant' && (
        <>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Dados do Imóvel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                name="propertyAddress"
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
                name="propertyNumber"
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
                name="propertyComplement"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bairro
              </label>
              <input
                type="text"
                name="propertyNeighborhood"
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
                name="propertyCity"
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
                name="propertyState"
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
                name="propertyZipCode"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
              />
            </div>

            {formType !== 'buyer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Matrícula
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Cadastro do Imóvel IPTU
                  </label>
                  <input
                    type="text"
                    name="iptuNumber"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Dados Bancários
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banco
            </label>
            <input
              type="text"
              name="bankName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agência
            </label>
            <input
              type="text"
              name="bankAgency"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Conta
            </label>
            <input
              type="text"
              name="bankAccount"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chave PIX
            </label>
            <input
              type="text"
              name="pixKey"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#a11882] focus:ring-[#a11882]"
            />
          </div>
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
          Enviar
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;