<script>
	import Fullscreen from "./Fullscreen.svelte";
	import { Router, Route, Link } from "svelte-navigator";
	import About from "./About.svelte";
	import CardSelection from "./CardSelection.svelte";
	import TestSelection from "./TestSelection.svelte";
	import Menu from "./Menu.svelte";
	import Settings from "./Settings.svelte";
</script>

<Router>
	<Fullscreen let:isFull>
		<div>
			<Route path="/">
				<Menu />
			</Route>

			<Route path="/settings">
				<Settings />
			</Route>

			<Route path="cardselection">
				<CardSelection />
			</Route>

			<Route path="preview">
				<CardSelection preview="true" />
			</Route>

			<Route path="testselection">
				<TestSelection />
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

<!-- <svelte:component this={CardSelectionView}></svelte:component> -->
<style>
	h1 {
		text-align: center;
		font-size: 2rem;
	}
</style>
