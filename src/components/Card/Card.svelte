<script>
    import DiceCard from "./DiceCard.svelte";
    import ImageCard from "./ImageCard.svelte";
    import { getCard } from "controller/controller.js";
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
            <ImageCard
                imgSrc={cardObject.details.imgSrc}
                {preview}
                {height}
                {width}
            />
        {:else if cardObject.cardType == "diceCard"}
            <DiceCard id={cardObject.details.n} {preview} {height} {width} />
        {/if}
    {:else if getCard(testCard.cardId).cardType == "imageCard"}
        <ImageCard
            imgSrc={getCard(testCard.cardId).details.imgSrc}
            {preview}
            {height}
            {width}
        />
    {:else if getCard(testCard.cardId).cardType == "diceCard"}
        <DiceCard
            id={getCard(testCard.cardId).details.n}
            {preview}
            {height}
            {width}
        />
    {/if}
</div>
