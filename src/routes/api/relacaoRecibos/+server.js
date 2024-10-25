import dotenv from 'dotenv';
import soap from 'soap';
dotenv.config();

export async function POST({ request }) {
	const url = process.env.URL_CON;
	const { condominio } = await request.json();
	const args = {
		condominio: condominio.condominio,
		bloco: condominio.bloco,
		unidade: condominio.unidade,
		tipo: condominio.tipo,
		usuario: process.env.USER,
		senha: process.env.SENHA,
		chave: process.env.CHAVE
	};

	try {
		const client = await soap.createClientAsync(url, { endpoint: url });
		const [result] = await client.RelacaoRecibos_Chatbot_JsonAsync(args);

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
