<script>
    import { tests } from "./tests.js";
    import { selectedTest } from "./stores.js";
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
        {tests[selected_test_index].name}
    </div>
</div>
