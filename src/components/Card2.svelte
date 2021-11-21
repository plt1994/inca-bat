<script>
    import { cardH, cardW, nOfCardsOnScreen, cardBgColor } from "../stores";
    export let imgSrc = "images/default.png";
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

<div>
    <img
        style="--card-bgcolor:{$cardBgColor}"
        class="cardBgColor"
        src={imgSrc}
        alt=""
        {height}
        {width}
    />
</div>

<style>
    .cardBgColor {
        background-color: var(--card-bgcolor);
        border-radius: 10px;
    }
</style>
