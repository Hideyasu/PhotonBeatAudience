<script>
	import { onMount, onDestroy } from 'svelte';
	import { subscribeToComments, disconnectCable } from '$lib/cable.js';

	let messages = $state([]);
	let messageId = 0;

	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

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
					messages = messages.filter((m) => m.id !== newMessage.id);
				}, 10000);
			}
		});
	});

	onDestroy(() => {
		disconnectCable();
	});
</script>

<div class="performer-container">
	<div class="flame-effect" style="display: none;">🔥</div>
	<div class="bolt-effect" style="display: none;">⚡</div>
	<div class="bad-effect" style="display: none;">👎</div>
	<div class="mocking-effect" style="display: none;">😂</div>
	<div class="messages-container">
		{#each messages as message (message.id)}
			<div
				class="message"
				style="animation-delay: {Math.random() * 0.5}s;
				top: {Math.random() * 80 + 10}%;
				color: {getRandomColor()};
				"
			>
				{message.text}
			</div>
		{/each}
	</div>
</div>

<style>
	.performer-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #008000;
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
		font-size: 50px !important;
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
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
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

	.flame-effect-wrapper {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5rem;
		z-index: 1000;
		pointer-events: none;
		/* アクティブになった時に表示 */
		display: none;
	}
	.flame-effect-wrapper.active {
		display: block;
	}

	@keyframes wobble {
		0%,
		100% {
			transform: translateY(0) scale(1.1);
		}
		50% {
			transform: translateY(-5px) scale(1.2);
		}
	}

	.flame-emoji {
		animation: wobble 0.8s ease-in-out infinite alternate;
		position: relative;
		z-index: 2; /* グローより手前に表示 */
	}

	@keyframes pulseGlow {
		0%,
		100% {
			box-shadow:
				0 0 20px 10px #ff9900,
				0 0 40px 20px #ff6600,
				0 0 60px 30px #ff3300;
		}
		50% {
			box-shadow:
				0 0 30px 15px #ff9900,
				0 0 50px 25px #ff6600,
				0 0 70px 35px #ff3300;
		}
	}

	.flame-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100px; /* サイズ調整 */
		height: 100px;
		border-radius: 50%;
		background: radial-gradient(circle, #ffcc00 0%, transparent 70%);
		animation: pulseGlow 1s ease-in-out infinite;
		z-index: 1; /* 炎の背後に表示 */
	}

	.flame-particles {
		position: absolute;
		top: 100%; /* 炎の下から開始 */
		left: 50%;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #ff9900;
		box-shadow: 0 0 5px #ff9900;
		animation:
			riseAndFade 1.5s linear forwards,
			flicker 0.2s infinite; /* ゆらぎを追加 */
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 0.8;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	/* 複数の火の粉を表現するために疑似要素を使う */
	.flame-particles::before,
	.flame-particles::after {
		content: '';
		position: absolute;
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background-color: #ffcc00;
		box-shadow: 0 0 3px #ffcc00;
		animation:
			riseAndFade 1.8s linear forwards,
			flicker 0.2s infinite;
	}

	.flame-particles::before {
		top: -10px;
		left: 10px;
		animation-delay: 0.3s;
	}

	.flame-particles::after {
		top: -20px;
		left: -15px;
		animation-delay: 0.6s;
	}

	.flame-effect,
	.bolt-effect,
	.bad-effect,
	.mocking-effect {
		position: fixed; /* 画面上の任意の位置に表示 */
		font-size: 5rem;
		z-index: 1000;
		pointer-events: none; /* クリック不可にする */
	}

	@keyframes riseAndFade {
		0% {
			transform: translateY(0) scale(1);
			opacity: 1;
		}
		100% {
			transform: translateY(-200px) scale(2);
			opacity: 0;
		}
	}

	.flame-effect.active {
		animation: riseAndFade 1.5s ease-out forwards;
	}

	/* ⚡ パッと光って拡大縮小 */
	@keyframes zapPop {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.6);
		}
		10% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.15);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
			filter: drop-shadow(0 0 18px currentColor);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(1.1);
		}
	}
	.bolt-effect.active {
		animation: zapPop 1.5s ease-out forwards;
	}

	/* 👎 ブルブル震える */
	@keyframes shake {
		0% {
			transform: translate(-50%, -50%) rotate(0deg) scale(1);
			opacity: 1;
		}
		15% {
			transform: translate(-50%, -50%) rotate(-12deg) scale(1.05);
		}
		30% {
			transform: translate(-50%, -50%) rotate(10deg) scale(1.05);
		}
		45% {
			transform: translate(-50%, -50%) rotate(-8deg) scale(1.05);
		}
		60% {
			transform: translate(-50%, -50%) rotate(6deg) scale(1.05);
		}
		75% {
			transform: translate(-50%, -50%) rotate(-4deg) scale(1.05);
		}
		100% {
			transform: translate(-50%, -50%) rotate(0deg) scale(1);
			opacity: 0;
		}
	}
	.bad-effect.active {
		animation: shake 1.5s ease-out forwards;
	}

	/* 😂 ぴょんぴょん弾む */
	@keyframes bounce {
		0% {
			transform: translate(-50%, -50%) translateY(0) scale(1);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		30% {
			transform: translate(-50%, -50%) translateY(-40px) scale(1.1);
		}
		50% {
			transform: translate(-50%, -50%) translateY(0) scale(1);
		}
		70% {
			transform: translate(-50%, -50%) translateY(-20px) scale(1.05);
		}
		100% {
			transform: translate(-50%, -50%) translateY(0) scale(1);
			opacity: 0;
		}
	}
	.mocking-effect.active {
		animation: bounce 1.5s ease-out forwards;
	}
</style>
