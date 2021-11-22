<script>
    import { cardH, cardW, cardBgColor, fgColor } from "stores/stores.js";
    export let width = 160;
    export let height = 160;
    export let preview = false;
    export let textMsg = "";
    export let fontFamily = "Comic sans ms";
    export let x = "50%";
    export let y = "50%";
    export let size_r = 0.8;
    let fillColor = $fgColor;

    if (!preview) {
        cardH.subscribe((value) => {
            height = value;
        });
        cardW.subscribe((value) => {
            width = value;
        });
    }
</script>

<svg {width} {height}>
    <style>
        text {
            font: italic serif;
        }
    </style>
    <rect
        x="5"
        y="5"
        rx="20"
        ry="20"
        width={width - 10}
        height={height - 10}
        fill={$cardBgColor}
        fill-opacity="1"
    />
    <text
        {x}
        {y}
        dominant-baseline="middle"
        text-anchor="middle"
        fill={fillColor}
        font-family={fontFamily}
        font-size={height * size_r}>{textMsg}</text
    >
</svg>
