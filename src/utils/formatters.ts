// Remove all non-numeric characters from a string
const stripNonNumeric = (str: string): string => str.replace(/\D/g, '');

export const formatCPF = (cpf: string): string => {
  // Remove any non-numeric characters
  const numbers = stripNonNumeric(cpf);
  
  // Return if empty
  if (!numbers) return '';
  
  // Apply CPF mask (XXX.XXX.XXX-XX)
  return numbers
    .slice(0, 11) // Limit to 11 digits
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    .replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
    .replace(/(\d{3})(\d{1,3})/, '$1.$2')
    .replace(/(\d{1,3})/, '$1');
};

export const formatRG = (rg: string): string => {
  // Remove any non-numeric characters
  const numbers = stripNonNumeric(rg);
  
  // Return if empty
  if (!numbers) return '';
  
  // Apply RG mask (XX.XXX.XXX-X)
  return numbers
    .slice(0, 9) // Limit to 9 digits
    .replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
    .replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3')
    .replace(/(\d{2})(\d{1,3})/, '$1.$2')
    .replace(/(\d{1,2})/, '$1');
};

export const formatPhone = (phone: string): string => {
  // Remove any non-numeric characters
  const numbers = stripNonNumeric(phone);
  
  // Return if empty
  if (!numbers) return '';
  
  // Handle different phone number lengths
  if (numbers.length <= 2) {
    return `(${numbers}`;
  }
  
  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  
  if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  
  // If more than 11 digits, limit to 11
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};