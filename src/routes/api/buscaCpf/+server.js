import soap from 'soap';
import dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
  const url = process.env.URL_CON;
  const { cpf } = await request.json();
  const args = {
    cnpj_cpf: cpf,
    usuario: process.env.USER,
    senha: process.env.SENHA,
    chave: process.env.CHAVE
  }

  try {
    const client = await soap.createClientAsync(url, {endpoint: url,});
    const [result] = await client.BuscaCPF_Chatbot_JsonAsync(args);

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('SOAP Error:', error);
    return new Response(JSON.stringify({ error: 'SOAP Request Failed' }), {
        status: 500
    });
  }
}