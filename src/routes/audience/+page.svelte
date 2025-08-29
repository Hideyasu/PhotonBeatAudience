<script>
	// import Fa from "svelte-fa"
	import { onMount, onDestroy } from 'svelte';
	import { subscribeToComments, sendComment, disconnectCable } from '$lib/cable.js';
	import Fa from 'svelte-fa';
	import { faFire, faBolt, faThumbsDown, faGrinTears } from '@fortawesome/free-solid-svg-icons';

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

	function sendReactionFire() {
		message = "🔥";
		sendComment(message)
		message = ''
	}
	function sendReactionThunder() {
		message = "⚡";
		sendComment(message)
		message = ''
	}
	function sendReactionBad() {
		message = "👎";
		sendComment(message)
		message = ''
	}
	function sendReactionMocking() {
		message = "😂";
		sendComment(message)
		message = ''
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8">
	<div class="mx-auto max-w-2xl">
		<h1 class="mb-8 text-center text-5xl font-bold text-white">Audience</h1>

		<div class="rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md">
			<h2 class="mb-6 text-2xl font-semibold text-white">メッセージを送信</h2>

			{#if isConnected}
				<div class="mb-4 flex items-center">
					<div class="mr-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
					<span class="text-sm text-green-300">接続中</span>
				</div>
			{:else}
				<div class="mb-4 flex items-center">
					<div class="mr-2 h-3 w-3 rounded-full bg-red-400"></div>
					<span class="text-sm text-red-300">未接続</span>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<textarea
						bind:value={message}
						placeholder="メッセージを入力..."
						class="w-full resize-none rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-white/50 focus:outline-none"
						rows="4"
					></textarea>
				</div>
				
				<button
					type="submit"
					disabled={!message.trim()}
					class="w-full transform rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
				>
					送信
				</button>
			</form>

			<div class="reaction-buttons pt-6 flex justify-between px-6">
				<button onclick={sendReactionFire} type="button" aria-label="炎のリアクション">
					<!-- <Fa icon={faFire} /> -->
					<span>🔥</span>
				</button>
				<button onclick={sendReactionThunder} type="button" aria-label="雷のリアクション">
					<!-- <Fa icon={faBolt} /> -->
					<span>⚡</span>
				</button>
				<button onclick={sendReactionBad} type="button" aria-label="バッドボタン">
					<!-- <Fa icon={faThumbsDown} /> -->
					<span>👎</span>
				</button>
				<button onclick={sendReactionMocking} type="button" aria-label="笑いのリアクション">
					<!-- <Fa icon={faGrinTears} /> -->
					<span>😂</span>
				</button>
			</div>

			<div class="mt-6 border-t border-white/20 pt-6">
				<p class="text-center text-sm text-white/70">
					メッセージ・リアクションは画面に表示されます
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
