<script>
	import { onMount, onDestroy } from 'svelte';
	import { subscribeToComments, disconnectCable } from '$lib/cable.js';

	let messages = $state([]);
	let messageId = 0;

	onMount(() => {
		subscribeToComments((data) => {
			if (data.body) {
				const newMessage = {
					id: messageId++,
					text: data.body,
					timestamp: data.at || Date.now()
				};
				messages = [...messages, newMessage];
				
				// 10秒後にメッセージを削除
				setTimeout(() => {
					messages = messages.filter(m => m.id !== newMessage.id);
				}, 10000);
			}
		});
	});

	onDestroy(() => {
		disconnectCable();
	});
</script>

<div class="performer-container">
	<div class="messages-container">
		{#each messages as message (message.id)}
			<div 
				class="message"
				style="animation-delay: {Math.random() * 0.5}s; top: {Math.random() * 80 + 10}%"
			>
				{message.text}
			</div>
		{/each}
	</div>
	
	<div class="status-bar">
		<h1 class="title">Performer View</h1>
		<div class="connection-status">
			<div class="status-dot"></div>
			<span>Live</span>
		</div>
	</div>
</div>

<style>
	.performer-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
		overflow: hidden;
	}
	
	.messages-container {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	
	.message {
		position: absolute;
		white-space: nowrap;
		font-size: 2.5rem;
		font-weight: bold;
		color: #ffffff;
		text-shadow: 
			2px 2px 4px rgba(0, 0, 0, 0.5),
			0 0 10px rgba(255, 255, 255, 0.3);
		animation: scrollText 10s linear;
		will-change: transform;
	}
	
	@keyframes scrollText {
		from {
			transform: translateX(100vw);
		}
		to {
			transform: translateX(-100%);
		}
	}
	
	.status-bar {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		padding: 10px 30px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		gap: 20px;
	}
	
	.title {
		margin: 0;
		color: white;
		font-size: 1.2rem;
		font-weight: 600;
	}
	
	.connection-status {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #4ade80;
		font-size: 0.9rem;
		font-weight: 500;
	}
	
	.status-dot {
		width: 8px;
		height: 8px;
		background: #4ade80;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}
	
	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	
	@media (max-width: 768px) {
		.message {
			font-size: 1.8rem;
		}
		
		.status-bar {
			padding: 8px 20px;
		}
		
		.title {
			font-size: 1rem;
		}
	}
</style>