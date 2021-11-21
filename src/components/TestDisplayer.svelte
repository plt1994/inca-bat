<script>
    import { selectedTest } from "stores/stores.js";
    import Card from "./Card/Card.svelte";
    import { getTests, getCard, getTest } from "controller/controller.js";
    let tests = getTests();
    let sounds = {};
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
        <p>Test name: {getTest($selectedTest).name}</p>
        <p>Test cards:</p>
        <div class="cards-preview">
            {#each getTest($selectedTest).cards as card}
                <div class="card-preview" on:click={() => playSound(card)}>
                    <p>{getCard(card.cardId).cardName}</p>
                    <div id={card.cardId}>
                        <Card
                            testCard={card}
                            width={100}
                            height={100}
                            preview="true"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .card-preview {
        background-color: #fff;
    }
    .cards-preview {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
