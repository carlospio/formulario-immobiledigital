import React from 'react';

interface ReviewFormProps {
  formData: any;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onBack, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (label: string, value: string) => {
    if (!value) return null;
    return (
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
        <p className="text-gray-700">{value}</p>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Revise seus dados
      </h2>

      <div className="bg-white p-6 rounded-lg shadow">
        {/* Dados Pessoais */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
          {renderField('Nome completo', formData.fullName)}
          {renderField('Data de nascimento', formData.birthDate)}
          {renderField('Estado civil', formData.maritalStatus)}
          {renderField('Nacionalidade', formData.nationality)}
          {renderField('Naturalidade', formData.birthPlace)}
          {renderField('CPF', formData.cpf)}
          {renderField('RG', formData.rg)}
          {renderField('Órgão emissor', formData.rgIssuer)}
          {renderField('Data de emissão', formData.rgIssueDate)}
        </div>

        {/* Dados do Cônjuge */}
        {(formData.maritalStatus === 'casado' || formData.maritalStatus === 'uniao_estavel') && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dados do Cônjuge</h3>
            {renderField('Nome completo do cônjuge', formData.spouseFullName)}
            {renderField('Data de nascimento do cônjuge', formData.spouseBirthDate)}
            {renderField('Nacionalidade do cônjuge', formData.spouseNationality)}
            {renderField('Naturalidade do cônjuge', formData.spouseBirthPlace)}
            {renderField('CPF do cônjuge', formData.spouseCpf)}
            {renderField('RG do cônjuge', formData.spouseRg)}
            {renderField('Órgão emissor do cônjuge', formData.spouseRgIssuer)}
            {renderField('Data de emissão do cônjuge', formData.spouseRgIssueDate)}
          </div>
        )}

        {/* Endereço e Contato */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Endereço e Contato</h3>
          {renderField('Endereço', formData.address)}
          {renderField('Número', formData.number)}
          {renderField('Complemento', formData.complement)}
          {renderField('Bairro', formData.neighborhood)}
          {renderField('Cidade', formData.city)}
          {renderField('Estado', formData.state)}
          {renderField('CEP', formData.zipCode)}
          {renderField('Celular', formData.phone)}
          {renderField('Celular do cônjuge', formData.spousePhone)}
          {renderField('E-mail', formData.email)}
          {renderField('E-mail do cônjuge', formData.spouseEmail)}
          {renderField('Profissão', formData.profession)}
          {renderField('Profissão do cônjuge', formData.spouseProfession)}
        </div>

        {/* Dados do Imóvel */}
        {formData.propertyAddress && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dados do Imóvel</h3>
            {renderField('Endereço do imóvel', formData.propertyAddress)}
            {renderField('Número do imóvel', formData.propertyNumber)}
            {renderField('Complemento do imóvel', formData.propertyComplement)}
            {renderField('Bairro do imóvel', formData.propertyNeighborhood)}
            {renderField('Cidade do imóvel', formData.propertyCity)}
            {renderField('Estado do imóvel', formData.propertyState)}
            {renderField('CEP do imóvel', formData.propertyZipCode)}
            {renderField('Número de matrícula', formData.registrationNumber)}
            {renderField('Número de cadastro do imóvel IPTU', formData.iptuNumber)}
          </div>
        )}

        {/* Dados Bancários */}
        {formData.bankName && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dados Bancários</h3>
            {renderField('Banco', formData.bankName)}
            {renderField('Agência', formData.bankAgency)}
            {renderField('Conta', formData.bankAccount)}
            {renderField('Chave PIX', formData.pixKey)}
          </div>
        )}
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
          Confirmar e Enviar
        </button>
      </div>
    </form>
  );
};

export default ReviewForm; 