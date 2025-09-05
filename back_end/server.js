// Arquivo server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config(); // Carrega as variáveis do arquivo .env

const app = express();
const PORT = 3000; // O servidor rodará na porta 3000

// Middlewares
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Habilita o parse de JSON no corpo das requisições

// Rota para receber o formulário
app.post("/enviar-formulario", async (req, res) => {
    // Pega os dados do corpo da requisição
    const { nome, sobrenome, empresa, nicho, telefone, email, descricao } = req.body;

    // Validação simples
    if (!nome || !email || !descricao) {
        return res.status(400).send("Campos obrigatórios não foram preenchidos.");
    }

    // Configuração do Nodemailer com as credenciais do .env
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Conteúdo do e-mail formatado em HTML
    const mailOptions = {
        from: `Formulário Site <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email, // Para que o botão "Responder" funcione corretamente
        subject: `Novo Contato do Site - ${nome}`,
        html: `
            <h1>Novo Contato Recebido</h1>
            <p><strong>Nome:</strong> ${nome} ${sobrenome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
            <hr>
            <p><strong>Empresa:</strong> ${empresa || "Não informada"}</p>
            <p><strong>Nicho:</strong> ${nicho || "Não informado"}</p>
            <hr>
            <h3>Mensagem:</h3>
            <p>${descricao}</p>
        `,
    };

    // Tenta enviar o e-mail
    try {
        await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso!");
        res.status(200).send("Formulário recebido e e-mail enviado!");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).send("Ocorreu um erro ao enviar o formulário.");
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});