<script>
    import Header from "./Header.svelte";
    import Link from "components/Utils/Link.svelte";
    import { Container, Row, Col } from "sveltestrap/src";
    import ButtonLink from "components/Utils/ButtonLink.svelte";
    let menuButtonFontSize = "min(10vh, 8vw)";
</script>

<div class="menu">
    <Container>
        <Row>
            <Col xs="2"
                ><Link to="about"><i class="icon-button fa">&#xf059;</i></Link>
            </Col>
            <Col xs="8"><Header /></Col>
            <Col xs="2"
                ><Link to="settings"><i class="icon-button fa fa-gear" /></Link
                ></Col
            >
        </Row>
        <hr />
        <Row
            ><Col xs="1" />
            <Col xs="10">
                <div class="buttons">
                    <ButtonLink
                        path="test_selection"
                        fontSize={menuButtonFontSize}>Start Test</ButtonLink
                    >
                    <ButtonLink path="logs_view" fontSize={menuButtonFontSize}
                        >Local Logs</ButtonLink
                    >
                    <ButtonLink
                        path="test_creator"
                        fontSize={menuButtonFontSize}>My Tests</ButtonLink
                    >
                    <ButtonLink
                        path="card_manager"
                        fontSize={menuButtonFontSize}>My Cards</ButtonLink
                    >
                </div>
            </Col>
            <Col xs="1" /></Row
        >
        <Row
            ><Col xs="1" />
            <Col xs="10"
                ><div class="collab">
                    In collaboration with <a
                        href="https://parrotkindergarten.com/"
                        target="_blank">Parrot Kindergarten</a
                    >, Inc. and
                    <a href="https://inca.dcc.uchile.cl" target="_blank"
                        >InCA Labs</a
                    >
                </div></Col
            >
            <Col xs="1" /></Row
        >
    </Container>
</div>

<style>
    .menu {
        height: 100%;
    }
    .buttons {
        height: 70%;
        display: grid;
    }

    .collab {
        background-color: #a0c9c0;
        place-items: center;
        margin-top: 7vh;
        text-align: center;
        padding-left: 3vw;
        padding-right: 3vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        border-radius: 10px;
    }
</style>
