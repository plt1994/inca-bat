<script>
    import CardPreset from "./Card1.svelte";
    import CardCustom from "./Card2.svelte";
    import { getCard } from "./controller";
    export let cardObject = { cardId: 0, details: {} };
    export let preview = false;
    export let height = 160;
    export let width = 160;
    let Card;
    let cardType = getCard(cardObject.cardId).cardType;
    console.log(cardType);
    if (cardType == "imageCard") {
        Card = CardCustom;
    } else if (cardType == "diceCard") {
        Card = CardPreset;
    }
</script>

<div>
    {#if getCard(cardObject.cardId).cardType == "imageCard"}
        <CardCustom id={cardObject.cardId} {preview} {height} {width} />
    {:else if getCard(cardObject.cardId).cardType == "diceCard"}
        <CardPreset
            id={getCard(cardObject.cardId).details.n}
            {preview}
            {height}
            {width}
        />
    {/if}
</div>
