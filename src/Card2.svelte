<!-- draws a simple card with a circle inside or not -->
<script>
    import { Images } from "./images";
    import { cardH, cardW, nOfCardsOnScreen } from "./stores";
    export let id = 0; //card id
    export let width = 160;
    export let height = 160;
    export let preview = false;
    let nOfCards, settingsW, settingsH;
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
    nOfCardsOnScreen.subscribe((value) => {
        nOfCards = value;
    });
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
        /* background-color: var(--bgcolor); */
    }
</style>
