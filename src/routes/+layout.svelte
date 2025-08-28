<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col">
    <!-- <header class="bg-black text-white"> -->
        <!-- <div class="container mx-auto py-4"> -->
            <!-- <h1 class="text-2xl font-bold">PHOTON BEAT</h1> -->
        <!-- </div> -->
    <!-- </header>	 -->
    <main class="flex-1">
        {@render children?.()}
    </main>
    <!-- <footer class="bg-black text-white"> -->
        <!-- <div class="container mx-auto py-4"> -->
            <!-- <p class="text-center text-sm">© 2023 My Website. All rights reserved.</p> -->
        <!-- </div> -->
    <!-- </footer> -->
</div>