<script>
    import Card from "components/CardComponents/Card.svelte";
    import {
        getLocalTests,
        getTest,
        deleteTest,
    } from "controller/controller.js";
    import {
        Col,
        Row,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
    } from "sveltestrap";
    import Header from "components/Header.svelte";
    import Footer from "components/Footer.svelte";
    import Button from "components/Utils/Button.svelte";
    import ButtonLink from "components/Utils/ButtonLink.svelte";
    import MenuButton from "components/Utils/MenuButton.svelte";
    let sounds = {};
    let cardPreviewWidth = 70;
    let openModal = false;
    let testToDelete = "";
    let tests = getLocalTests();
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
    function toggle() {
        openModal = !openModal;
    }
    function requestDeleteTest(testId) {
        testToDelete = testId;
        toggle();
    }
    function confirmDelteTest(params) {
        deleteTest(testToDelete);
        toggle();
        tests = getLocalTests();
    }
</script>

<Header title="My Tests" />

<div class="selection-buttons">
    <ButtonLink path="test_creator" contentType="text">Create</ButtonLink>
</div>

{#each tests as test}
    <div class="color">
        <Row cols={2}>
            <Col xs="10"
                ><p class="test-details"><b>Test Name</b>: {test.name}</p></Col
            >
            <Col xs="2"
                ><div
                    class="delete-button"
                    on:click={() => {
                        requestDeleteTest(test.id);
                    }}
                >
                    <i class="fa fa-trash" />
                </div></Col
            >
        </Row>

        <div class="cards-preview">
            <Row
                cols={Math.min(
                    Math.floor((window.screen.width * 0.6) / cardPreviewWidth),
                    getTest(test.id).cards.length
                )}
            >
                {#each getTest(test.id).cards as card}
                    <Col>
                        <div
                            class="card-preview"
                            on:click={() => playSound(card)}
                        >
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
{/each}

<Footer rows={3}>
    <Col><ButtonLink path="back">Back</ButtonLink></Col>
    <Col><MenuButton /></Col>
    <Col
        ><ButtonLink path="test_creator" contentType="text">Create</ButtonLink
        ></Col
    >
</Footer>

<Modal isOpen={openModal} {toggle}>
    <ModalHeader {toggle}>Confirm test delete</ModalHeader>
    <ModalBody>Are you sure you want to delete this test?</ModalBody>
    <ModalFooter>
        <Button on:click={confirmDelteTest}>Yes</Button>
        <Button on:click={toggle}>No</Button>
    </ModalFooter>
</Modal>

<style>
    .color {
        background-color: #a0c9c0;
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        text-align: center;
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        border-radius: 10px;
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

    .test-details {
        margin: 0;
    }

    .delete-button {
        font-size: min(7vw, 7vh);
    }

    .selection-buttons {
        place-items: center;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
        text-align: center;
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        height: 12vh;
        display: grid;
    }
</style>
