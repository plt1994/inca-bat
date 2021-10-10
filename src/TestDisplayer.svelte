<script>
    import { selectedTest } from "./stores.js";
    import Card from "./Card.svelte";
    import { getSound, getTests, getCard } from "./controller";
    let selected_test;
    let tests = getTests();
    let sounds = {};
    selectedTest.subscribe((value) => {
        selected_test = value;
    });

    let selected_test_index = selected_test;
    function selectTestIndex() {
        selectedTest.update(() => selected_test_index);
    }
    function playSound(card) {
        if (!sounds[card.cardId]) {
            let soundLocation = getSound(card.soundId);
            if (!soundLocation) {
                return;
            }
            sounds[card.cardId] = new Audio(soundLocation);
        }
        sounds[card.cardId].play();
    }
</script>

<select bind:value={selected_test_index} on:change={() => selectTestIndex()}>
    {#each tests as test, i}
        <option value={i}>
            {test.name}
        </option>
    {/each}
</select>

<!-- display selected test details -->
<div class="color">
    <div class="buttonclass">
        <p>Test name: {tests[selected_test_index].name}</p>
        <p>Test cards:</p>
        <div class="cards-preview">
            {#each tests[selected_test_index].cards as card}
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
