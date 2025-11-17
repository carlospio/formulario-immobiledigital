# Instruções para Configurar o EmailJS

## 📋 Passo a Passo

### 1. Criar Conta no EmailJS
1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up" e crie uma conta gratuita
3. Confirme seu email

### 2. Criar um Serviço de Email
1. No dashboard, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. **Anote o SERVICE_ID** que será gerado

### 3. Criar um Template de Email
1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Configure o template com as seguintes variáveis:

#### Variáveis do Template:
- `{{subject}}` - Assunto do email
- `{{formType}}` - Tipo de formulário (Proprietário/Comprador/Inquilino)
- `{{message}}` - Corpo completo do email formatado

**Exemplo de Template:**
```
Assunto: {{subject}}

Tipo de Cadastro: {{formType}}

{{message}}
```

4. Configure:
   - **To Email**: `christian.diogo@immobiledigital.com.br`
   - **From Name**: Formulário Imobiliária
   - **Reply To**: `{{email}}` (opcional, para responder ao cliente)
   - **Subject**: `{{subject}}`
   - **Content**: `{{message}}`

5. **Anote o TEMPLATE_ID** que será gerado

### 4. Obter a Public Key
1. Vá em **Account** → **General**
2. Copie a **Public Key**

### 5. Configurar no Código
1. Abra o arquivo: `src/utils/emailService.ts`
2. Substitua os valores:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'SUA_PUBLIC_KEY_AQUI',
  SERVICE_ID: 'SEU_SERVICE_ID_AQUI',
  TEMPLATE_ID: 'SEU_TEMPLATE_ID_AQUI',
};
```

### 6. Testar
1. Execute o projeto: `npm run dev`
2. Preencha um formulário de teste
3. Envie e verifique se o email chegou

## 📧 Configuração Adicional (Opcional)

### Enviar Cópia para Outro Email
No template do EmailJS, você pode adicionar:
- **BCC**: `administrativo@immobiledigital.com.br`

### Limites do Plano Gratuito
- ✅ 200 emails por mês
- ✅ Suporte a templates
- ✅ API completa

## 🔧 Troubleshooting

### Erro: "Invalid Public Key"
- Verifique se a Public Key está correta
- Certifique-se de que não há espaços extras

### Erro: "Service not found"
- Verifique se o SERVICE_ID está correto
- Confirme que o serviço está ativo no dashboard

### Erro: "Template not found"
- Verifique se o TEMPLATE_ID está correto
- Confirme que o template está publicado

### Email não está chegando
- Verifique a pasta de spam
- Confirme que o serviço de email está conectado corretamente
- Verifique os logs no dashboard do EmailJS

## 📚 Documentação
- Site oficial: https://www.emailjs.com/docs/
- Exemplos: https://www.emailjs.com/docs/examples/reactjs/

