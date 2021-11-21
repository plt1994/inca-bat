<script>
    import { getCards } from "../controller/controller";
    import CardCreator from "./CardCreator.svelte";
    import { localTests, username } from "../stores";
    import Link from "./Link.svelte";
    import Card from "./Card.svelte";
    import { Row } from "sveltestrap";
    let cards = getCards();
    let selectedCards = [];
    const steps = ["zero", "one", "two", "three"];
    let step = 0;
    let done = false;
    let loading = false;
    let msgForTest = {};
    let testname;
    const INCA_BAT_BACKEND_URL = "https://buho.dcc.uchile.cl/inca-bat-api";
    function nextStep() {
        if (selectedCards.length < 1 && step == 0) {
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
    async function requestNewSound(text) {
        if (!text) {
            return;
        }
        const res = await fetch(INCA_BAT_BACKEND_URL + "/text-to-speech", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                text: text,
                username: $username,
            }),
        });

        const audioSrc = await res.json().then((value) => value.src);
        return audioSrc;
    }

    function getNewTestId() {
        let newId = 0;
        console.log($localTests.length);
        for (let i = 0; i < $localTests.length; i++) {
            let test = $localTests[i];
            console.log(test);
            if (newId <= test.localId) {
                newId = test.localId + 1;
                console.log(newId);
            }
        }
        return newId;
    }

    async function buildTest() {
        loading = true;
        //TODO:result un preview del test y permitir guardarlo localmente
        //5. permitir guardarlo en el servidor
        let newTestId = getNewTestId();
        let testCards = [];
        for (let i = 0; i < selectedCards.length; i++) {
            // Posible bug, se pueden hacer tests sin nada Selectable
            // let testSoundSource = cardsSounds[selectedCards[i].id];
            let soundFilename = await requestNewSound(
                msgForTest[selectedCards[i].id]
            ).then((value) => value);
            testCards.push({
                cardId: selectedCards[i].id,
                soundSrc: soundFilename
                    ? `${INCA_BAT_BACKEND_URL}/static/sounds/${soundFilename}`
                    : null,
                // soundSrc: testSoundSource || 0,
                selectable: soundFilename ? true : false,
                msg: msgForTest[selectedCards[i].id],
            });
        }
        let newTest = {
            localId: newTestId,
            id: `local-${newTestId}`,
            name: testname,
            cards: testCards,
            tags: ["local"],
        };
        let newLocalTests = $localTests;
        newLocalTests.push(newTest);
        localTests.update(() => {
            return newLocalTests;
        });
        done = true;
        return newTest;
    }
</script>

<center>
    <div>Test Creator</div>
    {#if $username == "Default"}
        <div>Please set up the Teacher Name on Settings</div>
    {:else if done}
        <div>
            Your test was succesfuly created, click on Menu to leave the Test
            Creator
        </div>
    {:else if loading}
        <div>Wait few seconds while your test is creating</div>
    {:else if steps[step] == "zero"}
        <div>1. Select any number of cards to put in the test</div>
        <div>
            <div class="selectable-cards container">
                <Row>
                    <div class="card-box">
                        <CardCreator />
                    </div>
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
                </Row>
            </div>
        </div>
        <!-- <div>(add option to add new cards also)</div> -->
    {:else if steps[step] == "one"}
        <div>
            2. Type an message to describe the card. It will generates an audio
            file.
            {#each selectedCards as c}
                <Card cardObject={c} preview={true} width={100} height={100} />
                <label
                    >Card message:<input bind:value={msgForTest[c.id]} />
                </label>
            {/each}
        </div>
    {:else if steps[step] == "two"}
        <div>4. Add a name for the test and save</div>
        <input bind:value={testname} />
    {:else if steps[step] == "three"}
        Click on "Create" button to create test
        <button id="create-button" on:click={buildTest}>Create</button>
    {/if}

    {#if !done}
        <div>
            {#if step != 0}
                <button id="back-button" on:click={() => stepBack()}
                    >back</button
                >
            {/if}
            {#if step != 3 && $username != "Default"}
                <button id="next-button" on:click={() => nextStep()}
                    >Next</button
                >
            {/if}
        </div>
    {/if}
    <div>
        <Link to="menu"><button>Menu</button></Link>
    </div>
</center>

<style>
    .check-card {
        position: absolute;
        bottom: 0px;
        right: 10px;
    }
    .selectable-cards {
        display: inline-flex;
    }
    .card-box {
        position: relative;
        width: min-content;
        height: min-content;
        margin: auto;
        padding: 2px;
    }
</style>
