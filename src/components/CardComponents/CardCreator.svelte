<script>
    import Link from "components/Utils/Link.svelte";
    import { localCards } from "stores/stores.js";
    import EmojiSelector from "svelte-emoji-selector";
    import Card from "./Card.svelte";
    export let createNew = false;
    export let width = 100;
    export let height = 100;
    let imgSrc;
    let isLoaded = false;
    let imgCode;
    let cardName;
    let textContent = "";
    let cardType = null;
    let textCardHorizontalPosition = 50;
    let textCardVerticalPosition = 50;
    let textCardObject = {
        cardType: "textCard",
        details: {
            text: "",
            size_r: 0.8,
            x: "50%",
            y: "50%",
            fontFamily: "monospace",
        },
    };

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
    function addNewTextCard() {
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
            cardType: "textCard",
            details: textCardObject.details,
        };
        let newLocalCards = $localCards;
        newLocalCards.push(newCardData);
        isLoaded = false;
        localCards.update(() => {
            return newLocalCards;
        });
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
        <h1>Card Creator</h1>
        {#if !cardType}
            <div>Select the type of card to create</div>
            <button on:click={() => (cardType = "imageCard")}>Emoji Card</button
            >
            <button on:click={() => (cardType = "textCard")}>Text Card</button>
        {:else if cardType == "imageCard"}
            <div class="instructions">Choose an Emoji or put url</div>
            <div class="align">
                <p>Create from emoji:</p>
                <EmojiSelector on:emoji={onEmoji} />
            </div>
            <label
                >Image source (url):<input
                    bind:value={imgSrc}
                    type="text"
                /></label
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
                {#if isLoaded && cardName}
                    <button on:click={addNewCard} class="button-style"
                        >Save!</button
                    >
                {/if}
            </div>
        {:else if cardType == "textCard"}
            <div>Create Text Card</div>
            <label
                >Text to add to the card:
                <input bind:value={textCardObject.details.text} type="text" />
            </label>
            <label
                >Card name (useful for logs):<input
                    bind:value={cardName}
                    type="text"
                /></label
            >
            <label>
                Font Family
                <select bind:value={textCardObject.details.fontFamily}>
                    <option> Serif </option>
                    <option> Arial </option>
                    <option> Sans-Serif </option>
                    <option> Tahoma </option>
                    <option> Verdana </option>
                    <option> Lucida Sans Unicode </option>
                    <option selected>monospace</option>
                </select>
            </label>
            <label
                >Text size:
                <input
                    bind:value={textCardObject.details.size_r}
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                />
            </label>

            <label
                >Text Position Horizontal:
                <input
                    bind:value={textCardHorizontalPosition}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    on:change={() => {
                        textCardObject.details.x = `${textCardHorizontalPosition}%`;
                    }}
                />
            </label>
            <label
                >Text Position Vertical:
                <input
                    bind:value={textCardVerticalPosition}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    on:change={() => {
                        textCardObject.details.y = `${textCardVerticalPosition}%`;
                    }}
                />
            </label>
            <Card cardObject={textCardObject} {width} {height} />
            <div class="align">
                {#if textCardObject.details.text && cardName}
                    <Link to="test_creator"
                        ><button on:click={addNewTextCard} class="button-style"
                            >Save!</button
                        ></Link
                    >
                {/if}
            </div>
        {/if}
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
