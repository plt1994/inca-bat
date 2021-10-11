<script>
    import CardPreset from "./Card1.svelte";
    import CardCustom from "./Card2.svelte";
    import { getCard } from "./controller";
    export let cardObject = null;
    export let testCard = {
        cardId: 0,
        msg: "touch the white",
        selectable: false,
        soundId: 0,
    };
    export let preview = false;
    export let height = 160;
    export let width = 160;
</script>

<div>
    {#if cardObject}
        {#if cardObject.cardType == "imageCard"}
            <CardCustom
                imgSrc={cardObject.details.imgSrc}
                {preview}
                {height}
                {width}
            />
        {:else if cardObject.cardType == "diceCard"}
            <CardPreset id={cardObject.details.n} {preview} {height} {width} />
        {/if}
    {:else if getCard(testCard.cardId).cardType == "imageCard"}
        <CardCustom
            imgSrc={getCard(testCard.cardId).details.imgSrc}
            {preview}
            {height}
            {width}
        />
    {:else if getCard(testCard.cardId).cardType == "diceCard"}
        <CardPreset
            id={getCard(testCard.cardId).details.n}
            {preview}
            {height}
            {width}
        />
    {/if}
</div>
