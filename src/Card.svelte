<script>
    import CardPreset from "./Card1.svelte";
    import CardCustom from "./Card2.svelte";
    export let cardObject = { n: 0, cardType: "imageCard", details: {} };
    export let preview = false;
    export let height = 160;
    export let width = 160;
    let Card;
    let cardType = cardObject.cardType;
    console.log(cardType);
    if (cardType == "imageCard") {
        Card = CardCustom;
    } else if (cardType == "diceCard") {
        Card = CardPreset;
    }
</script>

{#if cardObject.cardType == "imageCard"}
    <CardCustom id={cardObject.n} {preview} {height} {width} />
{:else if cardObject.cardType == "diceCard"}
    <CardPreset id={cardObject.details.n} {preview} {height} {width} />
{/if}
