<!-- draws a simple card with a circle inside or not -->
<script>
    export let id = 1;
    export let mode = "dot"; // simpleDice, fancyDice
    import { cardH, cardW } from "./stores";
    import Circle from "./Circle.svelte";
    export let base_color_face = "white";
    export let base_color_dot = "black";
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

<!-- {#if mode == "dot"}
    <svg {width} {height}>
        <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stop-color={base_color_face} offset="0%" />
                <stop stop-color={base_color_face} offset="100%" />
            </linearGradient>
            <radialGradient id="g2" cx="50%" cy="50%" r="50%" fx="40%" fy="60%">
                <stop stop-color="white" offset="0%" />
                <stop stop-color={base_color_dot} offset="00%" />
                <stop stop-color={base_color_dot} offset="100%" />
                <stop stop-color="transparent" offset="100%" />
            </radialGradient>
        </defs>
        <rect x="0" y="0" rx={width / 8} ry={height / 8} {width} {height} />
        <g transform="translate(5,5)">
            {#if [2, 3, 4, 5, 6, 7, 8, 9].indexOf(id) != -1}
                <circle cx={width / 5} cy={height / 5} r={radius} />
            {/if}
            {#if [1, 3, 5, 7, 8, 9].indexOf(id) != -1}
                <circle cx={id*width / 3} cy={id*height / 3} r={radius} />
            {/if}
        </g>
    </svg>
    <style>
        rect {
            stroke: black;
            stroke-width: 5;
            fill: url(#g1);
        }
        circle {
            stroke: black;
            stroke-width: 0;
            fill: url(#g2);
            opacity: 0.8;
        }
    </style>
{/if} -->

<svg {width} {height}>
    <rect
        x="5"
        y="5"
        rx="20"
        ry="20"
        width={width - 10}
        height={height - 10}
        fill={base_color_face}
        fill-opacity="0.8"
    />
    {#if id == 9}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="118" r={radius} fill={base_color_dot} />
    {:else if id == 8}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="118" r={radius} fill={base_color_dot} />
    {:else if id == 7}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="75" r={radius} fill={base_color_dot} />
    {:else if id == 6}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
    {:else if id == 5}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
    {:else if id == 4}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="32" cy="118" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
    {:else if id == 3}
        <circle cx="32" cy="32" r={radius} fill={base_color_dot} />
        <circle cx="75" cy="75" r={radius} fill={base_color_dot} />
        <circle cx="118" cy="118" r={radius} fill={base_color_dot} />
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
    circle {
        stroke: black;
        stroke-width: 0;
        opacity: 1;
    }
</style>
