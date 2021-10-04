<script>
	import Fullscreen from "./Fullscreen.svelte";
	import { Router, Route, Link } from "svelte-navigator";
	import About from "./About.svelte";
	import CardSelection from "./CardSelection.svelte";
	import TestSelection from "./TestSelection.svelte";
	import Menu from "./Menu.svelte";
	import Settings from "./Settings.svelte";
	import LogsView from "./LogsView.svelte";
</script>

<meta name="viewport" content="width=device-width, user-scalable=no" />
<Router>
	<div>
		<Route path="/">
			<Menu />
		</Route>

		<Route path="/logs">
			<LogsView />
		</Route>

		<Route path="/settings">
			<Settings />
		</Route>

		<Route path="cardselection">
			<Fullscreen let:isFull><CardSelection /></Fullscreen>
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
	</div>
</Router>
