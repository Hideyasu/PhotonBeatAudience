<script>
	import { onMount, onDestroy } from 'svelte';
	import { subscribeToComments, sendComment, disconnectCable } from '$lib/cable.js';

	let message = $state('');
	let isConnected = $state(false);

	onMount(() => {
		subscribeToComments((data) => {
			console.log('Comment received:', data);
		});
		isConnected = true;
	});

	onDestroy(() => {
		disconnectCable();
		isConnected = false;
	});

	function handleSubmit(event) {
		event.preventDefault();
		if (message.trim()) {
			sendComment(message);
			message = '';
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-5xl font-bold text-white mb-8 text-center">Audience</h1>
		
		<div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
			<h2 class="text-2xl font-semibold text-white mb-6">メッセージを送信</h2>
			
			{#if isConnected}
				<div class="mb-4 flex items-center">
					<div class="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
					<span class="text-green-300 text-sm">接続中</span>
				</div>
			{:else}
				<div class="mb-4 flex items-center">
					<div class="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
					<span class="text-red-300 text-sm">未接続</span>
				</div>
			{/if}
			
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<textarea
						bind:value={message}
						placeholder="メッセージを入力..."
						class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
						rows="4"
					></textarea>
				</div>
				
				<button
					type="submit"
					disabled={!message.trim()}
					class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
				>
					送信
				</button>
			</form>
			
			<div class="mt-6 pt-6 border-t border-white/20">
				<p class="text-white/70 text-sm text-center">
					メッセージはPerformerページに表示されます
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>