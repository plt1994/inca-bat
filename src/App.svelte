<script>
	import Fullscreen from "./Fullscreen.svelte";
	import { Router, Route, Link } from "svelte-navigator";
import About from "./About.svelte";
	import CardSelection from "./CardSelection.svelte";
	// import CardSelectionView from "./CardSelection.svelte"
	import Menu from "./Menu.svelte"
</script>

<!-- <svelte:component this={CardSelectionView}></svelte:component> -->

<style>
  h1 {
    text-align: center;
    font-size: 2rem;
  }
</style>

<Router>
<Fullscreen let:isFull>
{#if isFull == false}
	<header>
	<h1 align=CENTER>InCA BAT Mockup</h1>
	</header>{/if}

	<div> 
	<Route path="/">
		<Menu/>
	</Route>

	<Route path="cardselection">
		<CardSelection />
	</Route>

	<Route path="about">
		<About />
	</Route>

	<!-- <PrivateRoute path="profile" let:location>
		<h3>Welcome {$user.username}</h3>
		<button on:click={handleLogout}>Logout</button>
	</PrivateRoute> -->
	</div>
	</Fullscreen>
</Router>
