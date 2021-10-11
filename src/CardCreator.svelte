<script>
    import Link from "./Link.svelte";
    import { localCards } from "./stores";
    export let createNew = false;
    export let width = 100;
    export let height = 100;
    let imgSrc;
    let cardName;
    function addNewCard() {
        let newId = 0;
        for (let i = 0; i < $localCards.length; i++) {
            let card = $localCards[i];
            if (newId <= card.localId) {
                newId = card.localId + 1;
            }
        }
        let newCardData = {
            localId: newId,
            id: `local-${newId}`,
            cardName: cardName,
            cardType: "imageCard",
            details: {
                imgSrc: imgSrc,
            },
        };
        let newLocalCards = $localCards;
        newLocalCards.push(newCardData);
        localCards.update(() => {
            return newLocalCards;
        });
    }
</script>

<center>
    {#if createNew}
        <div>Card Creator</div>

        <label
            >Image source (url):<input bind:value={imgSrc} type="text" /></label
        >
        <label
            >Card name (useful for logs):<input
                bind:value={cardName}
                type="text"
            /></label
        >
        <div class="preview-card-creator">
            <img src={imgSrc} alt={cardName} />
        </div>
        <button on:click={addNewCard} class="button-style">Save!</button>
        <Link to="test_creator"
            ><button class="button-style">Go back</button></Link
        >
    {:else}
        <Link to="new_card"
            ><button class="new-card-button">New card</button></Link
        >
    {/if}
</center>

<style>
    .new-card-button {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        margin: 0;
    }
    .button-style {
        height: 50px;
        width: 100px;
        border-radius: 10px;
        margin: 0;
    }
    .preview-card-creator {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        margin: 0;
        border-color: black;
    }
</style>
