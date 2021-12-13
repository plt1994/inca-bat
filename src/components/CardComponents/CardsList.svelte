<script>
    import Header from "components/Header.svelte";
    import {
        getLocalCards,
        verifyCardUsage,
        deleteCard,
    } from "controller/controller.js";
    import CardCreator from "components/CardComponents/CardCreator.svelte";
    import MenuButton from "components/Utils/MenuButton.svelte";
    import Card from "components/CardComponents/Card.svelte";
    import Footer from "components/Footer.svelte";
    import ButtonLink from "components/Utils/ButtonLink.svelte";
    import Button from "components/Utils/Button.svelte";
    import {
        Col,
        Row,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
    } from "sveltestrap";
    let openModal = false;
    let openModalDelete = false;
    let cards = getLocalCards();
    let selectedCards = [];
    let canDelete = true;
    let usedCards = {};
    let deletableIds = [];
    function toggle() {
        if (openModal) {
            canDelete = true;
        }
        openModal = !openModal;
    }
    function toggleDelete() {
        if (openModalDelete) {
            canDelete = true;
        }
        openModalDelete = !openModalDelete;
    }
    function deleteSelectedCards() {
        usedCards = {};
        deletableIds = [];
        selectedCards.forEach((card) => {
            let testsUsingThisCard = verifyCardUsage(card.id);
            if (testsUsingThisCard.length) {
                usedCards[card.cardName] = testsUsingThisCard;
                canDelete = false;
            } else {
                deletableIds.push(card.id);
            }
        });
        if (!canDelete) {
            toggle();
            return;
        }
        toggleDelete();
    }
    function securedDelete() {
        deletableIds.forEach((cardId) => {
            deleteCard(cardId);
        });
        toggleDelete();
        cards = getLocalCards();
    }
</script>

<center>
    <Header title="My Cards" />

    <div>
        <div class="selectable-cards container">
            <Row>
                <div class="card-box">
                    <CardCreator />
                </div>
                {#each cards as c}
                    <div class="card-box">
                        <p>{c.cardName}</p>
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
    <Footer rows={3}>
        <Col><ButtonLink path="menu">Back</ButtonLink></Col>
        <Col><MenuButton /></Col>
        <Col
            ><Button on:click={deleteSelectedCards} contentType="icon"
                ><i class="fa fa-trash" /></Button
            ></Col
        >
    </Footer>

    <div>
        <!-- Modal 1 para error al eliminar -->
        <Modal isOpen={openModal} {toggle}>
            <ModalHeader {toggle}
                >Error, used cards trying to be deleted</ModalHeader
            >
            <ModalBody>
                <p class="alert-message">Following cards can not be deleted:</p>
                {#each Object.keys(usedCards) as card}
                    <p class="bold">"{card}"</p>
                {/each}
                Details:
                {#each Object.keys(usedCards) as card}
                    <p>
                        Card "{card}"" is being used in the following Tests: [{usedCards[
                            card
                        ]}]. You must delete those Tests first if you want to
                        delete this Card.
                    </p>
                {/each}
            </ModalBody>
            <ModalFooter>
                <Button on:click={toggle}>Ok</Button>
            </ModalFooter>
        </Modal>
        <!-- Modal 2 para confirmar eliminacion -->
        <Modal isOpen={openModalDelete} {toggleDelete}>
            <ModalHeader {toggleDelete}>Confirm delete</ModalHeader>
            <ModalBody>
                <p class="alert-message">Following cards will be deleted:</p>
                {deletableIds}

                Are you sure?
            </ModalBody>
            <ModalFooter>
                <Button on:click={securedDelete}>Yes!</Button>
                <Button on:click={toggleDelete}>No!</Button>
            </ModalFooter>
        </Modal>
    </div>
</center>

<style>
    .bold {
        font-weight: bolder;
    }
    .alert-message {
        color: red;
    }
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
