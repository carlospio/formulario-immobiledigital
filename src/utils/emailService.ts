import emailjs from '@emailjs/browser';

// Configurações do EmailJS
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'zIubvbu-9AetnQGKc',
  SERVICE_ID: 'service_2lq3w0o',
  TEMPLATE_ID: 'template_15ynys3',
};

/**
 * Formata os dados do formulário para envio via EmailJS
 */
export const formatFormDataForEmail = (formData: Record<string, string>, formType: string) => {
  // Mapeamento de campos para labels em português
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
    originRegistry: 'Cartório de origem',
    invoiceAvailable: 'Nota fiscal',
    immobileAdministration: 'Administração Immobile',
    
    // Dados Bancários
    bankName: 'Banco',
    bankAgency: 'Agência',
    bankAccount: 'Conta',
    pixKey: 'Chave PIX'
  };

  // Mapeamento dos tipos de formulário para português
  const formTypeLabels: { [key: string]: string } = {
    owner: 'Proprietário',
    buyer: 'Comprador',
    tenant: 'Inquilino'
  };

  // Criar objeto formatado para o email
  const formattedData: Record<string, string> = {
    subject: `Novo cadastro - ${formTypeLabels[formType] || formType}`,
    formType: formTypeLabels[formType] || formType,
  };

  // Adicionar todos os campos com labels formatados
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      const label = fieldLabels[key] || key;
      formattedData[label] = String(value);
    }
  });

  // Criar uma mensagem formatada para o corpo do email
  let messageBody = `Tipo de Cadastro: ${formTypeLabels[formType] || formType}\n\n`;
  
  // Agrupar por seções
  const sections = [
    { title: 'Dados Pessoais', fields: ['fullName', 'birthDate', 'maritalStatus', 'nationality', 'birthPlace', 'cpf', 'rg', 'rgIssuer', 'rgIssueDate'] },
    { title: 'Dados do Cônjuge', fields: ['spouseFullName', 'spouseBirthDate', 'spouseNationality', 'spouseBirthPlace', 'spouseCpf', 'spouseRg', 'spouseRgIssuer', 'spouseRgIssueDate'] },
    { title: 'Endereço e Contato', fields: ['address', 'number', 'complement', 'neighborhood', 'city', 'state', 'zipCode', 'phone', 'spousePhone', 'email', 'spouseEmail', 'profession', 'spouseProfession'] },
    { title: 'Dados do Imóvel', fields: ['propertyAddress', 'propertyNumber', 'propertyComplement', 'propertyNeighborhood', 'propertyCity', 'propertyState', 'propertyZipCode', 'registrationNumber', 'iptuNumber', 'originRegistry', 'invoiceAvailable', 'immobileAdministration'] },
    { title: 'Dados Bancários', fields: ['bankName', 'bankAgency', 'bankAccount', 'pixKey'] },
  ];

  sections.forEach(section => {
    const sectionData: string[] = [];
    section.fields.forEach(field => {
      if (formData[field]) {
        const label = fieldLabels[field] || field;
        sectionData.push(`${label}: ${formData[field]}`);
      }
    });
    
    if (sectionData.length > 0) {
      messageBody += `${section.title}:\n`;
      sectionData.forEach(line => {
        messageBody += `${line}\n`;
      });
      messageBody += '\n';
    }
  });

  formattedData.message = messageBody;

  return formattedData;
};

/**
 * Envia o formulário via EmailJS
 */
export const sendEmail = async (
  formData: Record<string, string>,
  formType: string
): Promise<void> => {
  // Inicializar EmailJS
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

  // Formatar dados
  const templateParams = formatFormDataForEmail(formData, formType);

  // Enviar email
  await emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    templateParams
  );
};

