<script>
    import Link from "./Link.svelte";
    import { localCards } from "./stores";
    import EmojiSelector from "svelte-emoji-selector";
    export let createNew = false;
    export let width = 100;
    export let height = 100;
    let imgSrc;
    let isLoaded = false;
    let imgCode;
    let cardName;
    let textContent = "";

    function onEmoji(event) {
        textContent = event.detail;
        imgCode = emojiUnicode(textContent);
        imgSrc = getImgSrc();
        return imgCode;
    }
    function getImgSrc() {
        if (imgCode) {
            return `https://emojiapi.dev/api/v1/${imgCode}.svg`;
        }
        return null;
    }
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
        isLoaded = false;
        localCards.update(() => {
            return newLocalCards;
        });
    }
    function emojiUnicode(emoji) {
        var comp;
        if (emoji.length === 1) {
            comp = emoji.charCodeAt(0);
        }
        comp =
            (emoji.charCodeAt(0) - 0xd800) * 0x400 +
            (emoji.charCodeAt(1) - 0xdc00) +
            0x10000;
        if (comp < 0) {
            comp = emoji.charCodeAt(0);
        }
        return comp.toString("16");
    }
</script>

<center>
    {#if createNew}
        <div>Card Creator</div>
        <div class="instructions">Choose an Emoji or put url</div>
        <div class="align">
            <p>Create from emoji:</p>
            <EmojiSelector on:emoji={onEmoji} />
        </div>
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
            <img
                id="img-preview"
                on:load={() => (isLoaded = true)}
                on:error={() => (isLoaded = false)}
                src={imgSrc}
                alt={cardName}
            />
        </div>
        <div class="align">
            {#if isLoaded}
                <button on:click={addNewCard} class="button-style">Save!</button
                >
            {/if}
            <Link to="test_creator"
                ><button class="button-style">Go back</button></Link
            >
        </div>
    {:else}
        <Link to="new_card"
            ><button class="new-card-button">New card</button></Link
        >
    {/if}
</center>

<style>
    .instructions {
        background-color: darkgrey;
    }
    .align {
        display: inline-flex;
    }
    .new-card-button {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        margin: 0;
        background-color: darkseagreen;
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
