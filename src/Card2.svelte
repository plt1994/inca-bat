<!-- draws a simple card with a circle inside or not -->
<script>
    import { Images } from "./images";

    export let id = 0; //card id
    export let width = 160;
    export let height = 160;
    const BgColor = {
        0: "blue",
        1: "red",
    };
    function getCardImage(id) {
        return Images[id] || "images/default.png";
    }
</script>

<div style="--bgcolor:{BgColor[id]}" class="bgcolorcard">
    <img src={getCardImage(id)} alt="" {height} {width} />
</div>

<style>
    .bgcolorcard {
        background-color: var(--bgcolor);
    }
</style>
