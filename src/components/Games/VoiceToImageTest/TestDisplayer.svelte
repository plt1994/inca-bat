<script>
    import { selectedTest } from "stores/stores.js";
    import Card from "components/CardComponents/Card.svelte";
    import { getTests, getCard, getTest } from "controller/controller.js";
    import { Col, Row } from "sveltestrap";
    let tests = getTests();
    let sounds = {};
    let cardPreviewWidth = 100;
    function playSound(card) {
        if (!sounds[card.cardId]) {
            let soundLocation = card.soundSrc;
            if (!soundLocation) {
                return;
            }
            sounds[card.cardId] = new Audio(soundLocation);
        }
        sounds[card.cardId].play();
    }
</script>

<select bind:value={$selectedTest}>
    {#each tests as test}
        <option value={test.id}>
            {test.name} [{test.tags}]
        </option>
    {/each}
</select>

<!-- display selected test details -->
<div class="color">
    <div class="buttonclass">
        <br />
        <div class="cards-preview">
            <Row
                cols={Math.min(
                    Math.floor(window.screen.width / cardPreviewWidth),
                    getTest($selectedTest).cards.length
                )}
            >
                {#each getTest($selectedTest).cards as card}
                    <Col>
                        <div
                            class="card-preview"
                            on:click={() => playSound(card)}
                        >
                            <p class="card-name-text">
                                {getCard(card.cardId).cardName}
                            </p>
                            <div id={card.cardId}>
                                <Card
                                    testCard={card}
                                    width={cardPreviewWidth}
                                    height={cardPreviewWidth}
                                    preview="true"
                                />
                            </div>
                        </div>
                    </Col>
                {/each}
            </Row>
        </div>
    </div>
</div>

<style>
    .card-name-text {
        color: white;
        font-weight: bolder;
        display: inline;
        font-variant: all-small-caps;
    }
    .card-preview {
        background-color: teal;
        border-radius: 10px;
        margin: auto;
        margin-bottom: 1vh;
        position: relative;
    }
    .cards-preview {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    select {
        word-wrap: initial;
        background-color: #a0c9c0;
        text-align: center;
        border-radius: 10px;
    }
</style>
