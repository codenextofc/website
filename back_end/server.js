// server.js

// 1. Importar as bibliotecas
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Configurar variáveis de ambiente
dotenv.config();

// 3. Inicializar o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Configurar os Middlewares
app.use(cors());
app.use(express.json());

// 5. Rota para receber os dados do formulário e enviar o email
app.post('/enviar-email', async (req, res) => {
    // Extrai os dados do corpo da requisição (com os novos campos)
    const { nome, sobrenome, email, telefone, nicho, nomeEmpresa, descricao } = req.body;

    // Validação básica para ver se os campos essenciais existem
    if (!nome || !sobrenome || !email) {
        return res.status(400).json({ message: 'Nome, sobrenome e email são obrigatórios.' });
    }

    // Configura o "transportador" de email usando o Nodemailer com o Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Seu email do arquivo .env
            pass: process.env.EMAIL_PASS, // Sua senha de app do arquivo .env
        },
    });

    // Monta o corpo do email em HTML para ficar bem formatado
    const mailOptions = {
        from: `"Formulário Site" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email, // Faz o botão "Responder" do seu email usar o email do cliente
        subject: `Novo Contato do Site - ${nome} ${sobrenome}`,
        html: `
            <h1>Nova submissão do formulário de contato</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Sobrenome:</strong> ${sobrenome}</p>
            
            <hr>
            <h3>Informações de Contato</h3>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
            <hr>

            <h3>Detalhes da Empresa</h3>
            <p><strong>Nome da Empresa:</strong> ${nomeEmpresa || 'Não informado'}</p>
            <p><strong>Nicho da Empresa:</strong> ${nicho || 'Não informado'}</p>
            
            <h3>Descrição da Necessidade</h3>
            <p>${descricao || 'Não informado'}</p>
        `
    };

    // Tenta enviar o email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso!');
        res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
        res.status(500).json({ message: 'Falha ao enviar o email.', error: error.message });
    }
});

// 6. Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});