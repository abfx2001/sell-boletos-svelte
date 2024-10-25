<script>
	let cpfInput = '';
	let result = null;
	let error = null;
	let preResult = null;
	let loading = false;

	async function fetchSoapCond() {
		loading = true;
		result = null;
		error = null;

		try {
			const response = await fetch('/api/buscaCpf', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					cpf: cpfInput
				})
			});

			if (response.ok) {
				preResult = await response.json();
				result = JSON.parse(preResult.BuscaCPF_Chatbot_JsonResult).Condominio;
			} else {
				error = await response.json();
			}
		} catch (err) {
			error = { message: 'Network Error' };
		} finally {
			loading = false;
		}
	}

	async function fetchSoapRecibos(condominio) {
		try {
			const response = await fetch('/api/relacaoRecibos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					condominio: condominio
				})
			});

			if (response.ok) {
				preResult = await response.json();
				result = JSON.parse(preResult.RelacaoRecibos_Chatbot_JsonResult); //.Condominio;
				console.log(result);
			} else {
				error = await response.json();
			}
		} catch (err) {
			error = { message: 'Network Error' };
		} finally {
			loading = false;
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetchSoapCond();
	}

	function handleVisualizarClick(condominio) {
		fetchSoapRecibos(condominio);
	}
</script>

<div class="flex flex-col justify-center items-center h-screen w-screen">
	<img class="w-64" src="/sell-logo-color.png" alt="logo-sell" />

	<form on:submit={handleSubmit}>
		<label class="m-auto label max-w-2xl flex">
			<input
				class="input bg-surface-700"
				title="Input (text)"
				type="text"
				placeholder="Digite seu CPF ou CNPJ"
				id="paramInput"
				bind:value={cpfInput}
				required
			/>
			<button class="btn variant-filled-tertiary" type="submit">Enviar</button>
		</label>
	</form>

	{#if loading}
		<p>Carregando...</p>
	{:else if error}
		<p>Erro ao carregar os dados: {error.message}</p>
	{:else if result}
		<div
			class="relative flex flex-col w-1/2 overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
		>
			<table class="w-full text-left table-auto min-w-max text-slate-800">
				<thead>
					<tr class="text-slate-500 border-b border-slate-300 bg-slate-50">
						<th class="p-4">Código</th>
						<th class="p-4">Nome</th>
						<th class="p-4">Bloco</th>
						<th class="p-4">Unidade</th>
						<th class="p-4">Usuário</th>
						<th class="p-4">Linha Digitável</th>
					</tr>
				</thead>
				<tbody>
					{#each result as condominio}
						<tr class="hover:bg-slate-50">
							<td class="p-4">{condominio.condominio}</td>
							<td class="p-4">{condominio.nome}</td>
							<td class="p-4">{condominio.bloco}</td>
							<td class="p-4">{condominio.unidade}</td>
							<td class="p-4">{condominio.tipo === 'P' ? 'Proprietário' : 'Locatário'}</td>
							<td class="p-4">
								<a href="/" on:click={() => handleVisualizarClick(condominio)}> Visualizar </a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nemo delectus eos dolores veritatis
		quasi vitae, ex, modi iusto provident dignissimos autem? Voluptates iusto ducimus delectus.
		Provident veritatis praesentium temporibus?
	</p>
</div>
