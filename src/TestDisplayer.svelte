<script>
    import { tests } from "./tests.js";
    import { selectedTest } from "./stores.js";
    import Card from "./Card2.svelte";
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
        {#each tests[selected_test_index].cards as card}
            <div>
                <p>{card.cardName}</p>
                <Card id={card.n} width={100} height={100} preview="true" />
            </div>
        {/each}
    </div>
</div>
