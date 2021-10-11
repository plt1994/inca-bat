<script>
    import { getCards } from "./controller";
    import Link from "./Link.svelte";
    import Card from "./Card.svelte";
    let cards = getCards();
    let selectedCards = [];
    const steps = ["zero", "one", "two", "three"];
    let step = 0;
    let done = false;
    let cardsSounds = {};
    let msgForTest = {};
    let testname;
    function nextStep() {
        if (selectedCards.length < 1 && step == 0) {
            return;
        }
        if (Object.keys(cardsSounds).length < 1 && step == 1) {
            return;
        }
        if (step < 4) {
            step++;
        }
        if (step > 3) {
            done = true;
        }
    }
    function stepBack() {
        if (step > 0) {
            step--;
        }
    }
    function addSoundsToDb(soundsObject) {
        let lastKey = 0;
        let soundLibrary = {};
        let testSoundsReferenced = {};
        Object.keys(soundsObject).forEach((key) => {
            let newKey = lastKey++;
            soundLibrary[newKey] = soundsObject[key];
            testSoundsReferenced[key] = newKey;
        });
        console.log(JSON.stringify(soundLibrary));
        console.log(JSON.stringify(testSoundsReferenced));
        return testSoundsReferenced;
    }
    function buildTest() {
        //TODO:
        //4. falta dar un preview del test y permitir guardarlo localmente
        //5. permitir guardarlo en el servidor
        let lastTestId = -1;
        let newTestId = lastTestId + 1;
        let testCards = [];
        let soundsForTest = addSoundsToDb(cardsSounds);
        for (let i = 0; i < selectedCards.length; i++) {
            let testSoundId = soundsForTest[selectedCards[i].id];
            testCards.push({
                cardId: selectedCards[i].id,
                soundId: testSoundId || 0,
                selectable: testSoundId ? true : false,
                msg: msgForTest[selectedCards[i].id],
            });
        }
        let newTest = {
            id: newTestId,
            name: testname,
            cards: testCards,
        };
        return newTest;
    }
</script>

<center>
    <div>Test Creator</div>
    {#if done}
        <div>
            {JSON.stringify(buildTest())}
        </div>
        <div>
            <Link to="menu"><button>Finish</button></Link>
        </div>
    {:else if steps[step] == "zero"}
        <div>
            1. select cards to put in the test (show all the cards available)
        </div>
        <!-- <select bind:value={selected_test_index} on:change={() => selectTestIndex()}> -->
        <div>
            <p>Cards available</p>
            <div class="selectable-cards">
                {#each cards as c}
                    <div class="card-box">
                        <input
                            class="check-card"
                            type="checkbox"
                            id={c.id}
                            bind:group={selectedCards}
                            value={c}
                        />
                        <label for={c.id}
                            ><Card
                                cardObject={c}
                                preview={true}
                                width={100}
                                height={100}
                            /></label
                        >
                    </div>
                {/each}
            </div>
        </div>
        <!-- <div>(add option to add new cards also)</div> -->
    {:else if steps[step] == "one"}
        <div>
            2. Select an audio source for each card chosen in step 1, if you
            don't add a source link, there won't be any sound for that card in
            current test, and it won't be part of the "choosable" cards during
            the game.
            {#each selectedCards as c}
                <Card cardObject={c} preview={true} width={100} height={100} />
                <label
                    >Audio source: <input
                        bind:value={cardsSounds[c.id]}
                    /></label
                >
                <label
                    >Card message:<input bind:value={msgForTest[c.id]} />
                </label>
            {/each}
        </div>
    {:else if steps[step] == "two"}
        <div>4. Add a name for the test and save</div>
        <input bind:value={testname} />
    {:else if steps[step] == "three"}
        Click on "Next" button to create test
    {/if}

    {#if !done}
        <div>
            <button id="back-button" on:click={() => stepBack()}>back</button>
            <button id="next-button" on:click={() => nextStep()}>Next</button>
        </div>
    {/if}
</center>

<style>
    .check-card {
        position: absolute;
        bottom: 0px;
        right: 0px;
    }
    .selectable-cards {
        display: inline-flex;
    }
    .card-box {
        position: relative;
        width: min-content;
        height: min-content;
        margin: auto;
    }
</style>
