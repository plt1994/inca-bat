<script>
	import Fullscreen from "components/Utils/Fullscreen.svelte";
	import About from "components/About.svelte";
	import CardSelection from "components/CardComponents/CardSelection.svelte";
	import TestSelection from "components/Games/VoiceToImageTest/TestSelection.svelte";
	import Menu from "components/Menu.svelte";
	import Settings from "components/SettingComponents/Settings.svelte";
	import LogsView from "components/LogComponents/LogsView.svelte";
	import TestCreator from "components/Games/VoiceToImageTest/TestCreator.svelte";
	import CardCreator from "components/CardComponents/CardCreator.svelte";
	import CardsList from "components/CardComponents/CardsList.svelte";
	import { page } from "stores/stores.js";

	$: notneek = window.neek;

	window.neek.update = function () {
		notneek = notneek;
	};
</script>

<meta name="viewport" content="width=device-width, user-scalable=no" />
<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<meta charset="“UTF-8”" />
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
	{:else if $page == "card_manager"}
		<CardsList />
	{:else}
		<div><p>404: not found</p></div>
	{/if}
</div>

<style>
	@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css";
	:global(body) {
		background-color: #DFF1ED;
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

  :global(.btn-primary) {
        color: white !important;
        background-color: #73c3b1 !important;
        border-color: #73c3b1 !important;
    }

	:global(.fixed-bottom) {
		background-color:#a0c9c0!important;
	}

	:global(.icon-button) {
        font-size: 10vw !important;
        color: teal !important;;
    }

	:global(.footer-text-size) {
		font-size: min(10vh, 8vw) !important;
	}

	:global(.no-margin) {
        margin: 0% !important;
    }

    :global(.dark-border) {
        border-color: #002a1f;
    }

	:global(span) {
        text-decoration: none !important;
	}
</style>
