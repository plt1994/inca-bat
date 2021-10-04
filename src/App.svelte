<script>
	import Fullscreen from "./Fullscreen.svelte";
	import About from "./About.svelte";
	import CardSelection from "./CardSelection.svelte";
	import TestSelection from "./TestSelection.svelte";
	import Menu from "./Menu.svelte";
	import Settings from "./Settings.svelte";
	import LogsView from "./LogsView.svelte";
	import { page } from "./stores";
</script>

<meta name="viewport" content="width=device-width, user-scalable=no" />
<div>
	{#if $page == "menu"}
		<Menu />
	{:else if $page == "logs_view"}
		<LogsView />
	{:else if $page == "settings"}
		<Settings />
	{:else if $page == "card_selection"}
		<Fullscreen let:isFull><CardSelection /></Fullscreen>
	{:else if $page == "preview"}
		<Fullscreen let:isFull><CardSelection preview={true} /></Fullscreen>
	{:else if $page == "test_selection"}
		<TestSelection />
	{:else if $page == "about"}
		<About />
	{:else}
		<div><p>404: not found</p></div>
	{/if}
</div>
