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
				if (data.body == '🔥') {
					const flame = document.querySelector('.flame-effect');
					if (flame) {
						// 画面中央に表示
						flame.style.top = '50%';
						flame.style.left = '50%';
						flame.style.transform = 'translate(-50%, -50%)';

						// エフェクトを表示
						flame.style.display = 'block';
						flame.classList.add('active');

						// アニメーション終了後にクラスを削除してリセット
						setTimeout(() => {
							flame.style.display = 'none';
							flame.classList.remove('active');
						}, 1500); // アニメーション時間と合わせる
						return;
					}
				} else if (data.body == '⚡') {
					const bolt = document.querySelector('.bolt-effect');
					if (bolt) {
						// 画面中央に表示
						bolt.style.top = '50%';
						bolt.style.left = '50%';
						bolt.style.transform = 'translate(-50%, -50%)';

						// エフェクトを表示
						bolt.style.display = 'block';
						bolt.classList.add('active');

						// アニメーション終了後にクラスを削除してリセット
						setTimeout(() => {
							bolt.style.display = 'none';
							bolt.classList.remove('active');
						}, 1500); // アニメーション時間と合わせる
						return;
					}
				} else if (data.body == '👎') {
					const bad = document.querySelector('.bad-effect');
					if (bad) {
						// 画面中央に表示
						bad.style.top = '50%';
						bad.style.left = '50%';
						bad.style.transform = 'translate(-50%, -50%)';

						// エフェクトを表示
						bad.style.display = 'block';
						bad.classList.add('active');

						// アニメーション終了後にクラスを削除してリセット
						setTimeout(() => {
							bad.style.display = 'none';
							bad.classList.remove('active');
						}, 1500); // アニメーション時間と合わせる
						return;
					}
				} else if (data.body == '😂') {
					const mocking = document.querySelector('.mocking-effect');
					if (mocking) {
						// 画面中央に表示
						mocking.style.top = '50%';
						mocking.style.left = '50%';
						mocking.style.transform = 'translate(-50%, -50%)';

						// エフェクトを表示
						mocking.style.display = 'block';
						mocking.classList.add('active');

						// アニメーション終了後にクラスを削除してリセット
						setTimeout(() => {
							mocking.style.display = 'none';
							mocking.classList.remove('active');
						}, 1500); // アニメーション時間と合わせる
						return;
					}
				}
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
