<script>
	let cpfInput = '';
	let result = null;
	let error = null;
	let preResult = null;
	let loading = false;

	async function fetchSOAPData() {
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

	function handleSubmit(event) {
		event.preventDefault();
		fetchSOAPData();
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
		<div class="max-w-2xl">
			{#each result as condominio}
				<div class="border-2 border-secundary-500">
					<p><strong>Nome do Condomínio:</strong> {condominio.nome}</p>
					<p><strong>Bloco:</strong> {condominio.bloco}</p>
					<p><strong>Unidade:</strong> {condominio.unidade}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
