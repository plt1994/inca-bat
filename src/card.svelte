<!-- draws a simple card with a circle inside or not -->
<script>
    export let n = 1;
    export let mode = "dot"; // simpleDice, fancyDice
    export let base_color_face = "white";
    export let base_color_dot = "black";
		export let radius = 20;
    export let width = 160;
    export let height = 160;
</script>

{#if mode=="dot"}
    <svg width={width} height={height}>
        <defs>
            <linearGradient id = "g1" x1 = "0%" y1 = "0%" x2 = "100%" y2 = "100%">
                <stop stop-color = {base_color_face} offset = "0%"/>
                <stop stop-color = {base_color_face} offset = "100%"/>
            </linearGradient>
          <radialGradient id = "g2" cx = "50%" cy = "50%" r = "50%" fx = "40%" fy = "60%">
                <stop stop-color = "white" offset = "0%"/>
                <stop stop-color = {base_color_dot} offset = "00%"/>
                <stop stop-color = {base_color_dot} offset = "100%"/>
                <stop stop-color = "transparent" offset = "100%"/>
            </radialGradient>
        </defs>
      <rect x="5" y="5" rx="20" ry="20" width="150" height="150"
      />
        <g transform="translate(5,5)">
            {#if [2,3,4,5,6,7,8,9].indexOf(n)!=-1}
                <circle cx="32" cy="32" r={radius}  />
        {/if}
            {#if [1,3,5,7,8,9].indexOf(n)!=-1}
                <circle cx="75" cy="75" r={radius} />
            {/if}
        </g>	 
    </svg>
    <style>
        rect{
     stroke:black;
    stroke-width:5;
        fill:url(#g1);
        }
        circle{
    stroke:black;
    stroke-width:0;
        fill:url(#g2);
            opacity:.8;
        }
    </style>
{/if}
