<!-- draws a simple card with a circle inside or not -->
<script>
    export let id = 1;
    // export let mode = "dot"; // simpleDice, fancyDic
    import { cardH, cardW, cardBgColor } from "stores/stores.js";
    import Circle from "./Circle.svelte";
    export let base_color_face = $cardBgColor;
    // export let base_color_dot = "black";
    export let width = 160;
    export let height = 160;
    export let preview = false;
    let rx = 20;
    let ry = 20;
    let radius = height / 8;
    if (!preview) {
        cardH.subscribe((value) => {
            // settingsH = value;
            height = value;
        });
        cardW.subscribe((value) => {
            // settingsW = value;
            width = value;
        });
    }
</script>

<svg {width} {height}>
    <rect
        x="5"
        y="5"
        rx="20"
        ry="20"
        width={width - 10}
        height={height - 10}
        fill={base_color_face}
        fill-opacity="1"
    />
    {#if id == 9}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="1" y="3" {radius} w={width} h={height} />
        <Circle x="2" y="1" {radius} w={width} h={height} />
        <Circle x="2" y="3" {radius} w={width} h={height} />
        <Circle x="3" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
        <Circle x="2" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="2" {radius} w={width} h={height} />
        <Circle x="1" y="2" {radius} w={width} h={height} />
    {:else if id == 8}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="1" y="3" {radius} w={width} h={height} />
        <Circle x="1" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
        <Circle x="2" y="2" {radius} w={width} h={height} />
        <Circle x="2" y="3" {radius} w={width} h={height} />
    {:else if id == 7}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="1" y="3" {radius} w={width} h={height} />
        <Circle x="1" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
        <Circle x="2" y="2" {radius} w={width} h={height} />
    {:else if id == 6}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="1" y="3" {radius} w={width} h={height} />
        <Circle x="1" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
    {:else if id == 5}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="1" y="3" {radius} w={width} h={height} />
        <Circle x="3" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
        <Circle x="2" y="2" {radius} w={width} h={height} />
    {:else if id == 4}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="1" y="3" {radius} w={width} h={height} />
        <Circle x="3" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
    {:else if id == 3}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="2" y="2" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
    {:else if id == 2}
        <Circle x="1" y="1" {radius} w={width} h={height} />
        <Circle x="3" y="3" {radius} w={width} h={height} />
    {:else if id == 1}
        <Circle x="2" y="2" {radius} w={width} h={height} />
    {/if}
</svg>

<style>
    rect {
        stroke: black;
        stroke-width: 5;
        opacity: 0.9;
    }
    /* circle {
        stroke: black;
        stroke-width: 0;
        opacity: 1;
    } */
</style>
