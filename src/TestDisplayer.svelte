<script>
    import { tests } from "./tests.js";
    import { selectedTest } from "./stores.js";
    import Card2 from "./Card2.svelte";
    import Card1 from "./Card1.svelte";
    let selected_test;
    selectedTest.subscribe((value) => {
        selected_test = value;
    });

    let selected_test_index = selected_test;
    function selectTestIndex() {
        selectedTest.update(() => selected_test_index);
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
                <div class="card-preview">
                    <p>{card.cardName}</p>
                    {#if card.cardType == "diceCard"}
                        <Card1
                            id={card.n}
                            width={100}
                            height={100}
                            preview="true"
                        />
                    {:else if card.cardType == "imageCard"}
                        <Card2
                            id={card.n}
                            width={100}
                            height={100}
                            preview="true"
                        />
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .card-preview {
        background-color: antiquewhite;
    }
    .cards-preview {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
