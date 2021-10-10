<script>
    import { getCards } from "./controller";
    import Card from "./Card.svelte";
    let cards = getCards();
    let selectedCards = "";
    const steps = ["one", "two", "three", "four"];
    let step = 0;
    let done = false;
    let cardsSounds = {};
    let testname;
    function nextStep() {
        step += 1;
        if (step > 4) {
            done = true;
            step = 5;
        }
    }
    function stepBack() {
        step -= 1;
        if (step < 0) {
            step = 0;
        }
    }
    function printAll() {
        console.log(selectedCards);
        console.log(cardsSounds);
    }
    function buildTest() {
        //TODO: (many things)
        //1. falta asignarle un id
        //2. falta guardar el audio y poner el soundId, y quitar el soundSrc
        //3. falta agregar los campos "msg" y "selectable" en las testCards
        //4. falta dar un preview del test y permitir guardarlo localmente
        //5. permitir guardarlo en el servidor
        let testCards = [];
        for (let i = 0; i < selectedCards.length; i++) {
            testCards.push({
                cardId: selectedCards[i].id,
                soundSrc: cardsSounds[selectedCards[i].id],
            });
        }
        let newTest = {
            name: testname,
            cards: testCards,
        };
        return newTest;
    }
</script>

<div>test creator</div>
{#if steps[step] == "one"}
    <div>1. select cards to put in the test (show all the cards available)</div>
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
{:else if steps[step] == "two"}
    <div>
        2. Select audio source for each card chosen in step 1, if you dont add a
        source link, there won't be any sound for that card in current test.
        {#each selectedCards as c}
            <Card cardObject={c} preview={true} width={100} height={100} />
            <input bind:value={cardsSounds[c.id]} />
        {/each}
    </div>
{:else if steps[step] == "three"}
    <div>3.Select filling cards or none (blank card)</div>
{:else if steps[step] == "four"}
    <div>4. Add a name for the test and save</div>
    <input bind:value={testname} />
{:else if done}
    <div>
        {JSON.stringify(buildTest())}
    </div>
{/if}

<button on:click={() => stepBack()}>back</button>
<button on:click={() => nextStep()}>Next</button>

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
