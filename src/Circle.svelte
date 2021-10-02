<script>
    export let x = 1;
    export let y = 1;
    export let w = 160;
    export let h = 160;
    export let radius = 20;
    let cx = x * (w / 4);
    let cy = y * (h / 4);
    let base_color_dot = "black";
</script>

<circle {cx} {cy} r={radius} fill={base_color_dot} />
