<script>
	import Fullscreen from "./Fullscreen.svelte";
	import About from "./About.svelte";
	import CardSelection from "./CardSelection.svelte";
	import TestSelection from "./TestSelection.svelte";
	import Menu from "./Menu.svelte";
	import Settings from "./Settings.svelte";
	import LogsView from "./LogsView.svelte";
	import TestCreator from "./TestCreator.svelte";
	import CardCreator from "./CardCreator.svelte";
	import { page } from "./stores";
	// añadir logo de InCA BAT
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
	{:else if $page == "test_creator"}
		<TestCreator />
	{:else if $page == "new_card"}
		<CardCreator createNew={true} />
	{:else}
		<div><p>404: not found</p></div>
	{/if}
</div>

<style>
	@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css";
	:global(body) {
		background-color: aliceblue;
	}

	:global(:root) {
		--theme-color: green,
		--theme-color-2: blue
	}

	:global(body.dark-mode){
		background-color: darkblue;
	}

	p {
		color:var(--theme-color)
	}

	:global(table){
		table-layout: fixed;
		width: 100%;
		font-size:1rem;
	}
	:global(th),
  :global(td) {
    text-align: center;
    padding: 8px;
  }

  :global(tr:nth-child(even)) {
    background-color: #f2f2f2;
  }

  :global(th) {
    background-color: #4caf50;
    color: white;
  }

  :global(button) {
	  border-radius: 7px;
  }
</style>
