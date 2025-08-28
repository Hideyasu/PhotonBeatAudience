<script>
	function startGame() {
        window.location.href = '/audience';
	}
</script>

<svelte:head>
	<title>PHOTON BEAT - ライブ直前！</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Noto+Sans+JP:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="background-animation"></div>

<main class="container">
	<header class="header">
		<!-- <h1 class="header-logo">PHOTON BEAT</h1> -->
	</header>

	<section class="main-content">
		<h2 class="main-title">PHOTON BEAT</h2>
		<p class="description">桃山大学の天才ピアニストによるライブ配信</p>

		<div class="button-group">
			<button on:click={startGame} class="cta-button pulse"> LIVE NOW </button>
			<!-- <a href="#" class="details-link">詳細を見る</a> -->
		</div>
	</section>
</main>

<style>
	/* グローバルスタイルとフォント */
	:global(body) {
		margin: 0;
		font-family: 'Noto Sans JP', sans-serif;
		color: #fff;
		background-color: #000;
		overflow: hidden;
		/* コンテンツを中央に配置するためのFlexbox設定 */
		display: flex;
		justify-content: center; /* 水平方向の中央揃え */
		align-items: center; /* 垂直方向の中央揃え */
		min-height: 100vh; /* 画面の高さ全体をカバー */
		position: relative;
	}

	h1,
	h2,
	.countdown-timer {
		font-family: 'Orbitron', sans-serif;
	}

	.min-h-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	/* 背景アニメーション */
	.background-animation {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, #0a0a2a, #2a0a2a, #0a2a2a, #2a2a0a);
		background-size: 400% 400%;
		animation: gradientAnimation 15s ease infinite;
		z-index: -1;
		opacity: 0.8;
	}

	@keyframes gradientAnimation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.container {
		text-align: center;
		z-index: 1;
		padding: 20px;
		max-width: 900px;
		width: 100%;
		/* コンテンツを垂直方向にも中央に寄せるための追加設定 */
		display: flex;
		flex-direction: column;
		justify-content: center; /* コンテナ内のコンテンツを垂直方向の中央に */
		align-items: center; /* コンテナ内のコンテンツを水平方向の中央に */
		/* --- */
	}

	/* ... 以下、既存のスタイルは変更なし ... */

	.header-logo {
		font-size: 1.5em;
		font-weight: 700;
		letter-spacing: 2px;
		margin-bottom: 50px;
		animation: fadeIn 1.5s ease-out;
	}

	.main-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 180px;
	}

	@media screen and (max-width: 600px) {
		.main-content {
			width: 100%;
			padding-top: 200px;
		}
	}

	.main-title {
		font-size: 3.5em;
		font-weight: 700;
		margin-bottom: 10px;
		color: #e0f2f7;
		text-shadow: 0 0 15px rgba(109, 207, 246, 0.7);
		animation:
			pulseTitle 2s infinite alternate,
			fadeIn 1.5s ease-out 0.5s both;
	}

	.description {
		font-size: 1.2em;
		margin-bottom: 60px;
		color: #c0d9e4;
		animation: fadeIn 1.5s ease-out 1s both;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		animation: fadeIn 1.5s ease-out 1.5s both;
	}

	.cta-button {
		background: linear-gradient(90deg, #bb6dcc, #6dccf6);
		border: none;
		color: white;
		padding: 18px 40px;
		font-size: 1.3em;
		font-weight: 700;
		border-radius: 50px;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 1px;
		box-shadow: 0 0 20px rgba(109, 207, 246, 0.5);
		transition: all 0.3s ease;
		outline: none;
	}

	.cta-button:hover {
		transform: translateY(-3px) scale(1.02);
		box-shadow:
			0 0 30px rgba(109, 207, 246, 0.8),
			0 0 15px rgba(187, 109, 204, 0.8);
	}

	.cta-button:active {
		transform: translateY(0);
		box-shadow: 0 0 10px rgba(109, 207, 246, 0.3);
	}

	.pulse {
		animation: buttonPulse 1.5s infinite;
	}

	@keyframes buttonPulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}

	.details-link {
		color: #a7d9e8;
		text-decoration: none;
		font-size: 1em;
		transition: color 0.3s ease;
	}

	.details-link:hover {
		color: #6dccf6;
		text-decoration: underline;
	}

	/* アニメーション */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes pulseTitle {
		0% {
			text-shadow: 0 0 15px rgba(109, 207, 246, 0.7);
		}
		100% {
			text-shadow:
				0 0 25px rgba(109, 207, 246, 0.9),
				0 0 10px rgba(187, 109, 204, 0.5);
		}
	}

	/* レスポンシブデザイン */
	@media (max-width: 768px) {
		.main-title {
			font-size: 2.5em;
		}
		.description {
			font-size: 1em;
		}
		.cta-button {
			padding: 15px 30px;
			font-size: 1.1em;
		}
	}

	@media (max-width: 480px) {
		.main-title {
			font-size: 1.8em;
		}
		.description {
			font-size: 0.9em;
		}
		.cta-button {
			padding: 12px 25px;
			font-size: 1em;
		}
	}
</style>
