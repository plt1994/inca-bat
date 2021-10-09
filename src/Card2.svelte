<script>
    import { getImage } from "./controller";
    import { cardH, cardW, nOfCardsOnScreen } from "./stores";
    export let id = 0;
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
</script>

<div style="--bgcolor:{BgColor[id]}" class="bgcolorcard">
    <img src={getImage(id)} alt="" {height} {width} />
</div>

<style>
    .bgcolorcard {
        /* background-color: var(--bgcolor); */
    }
</style>
