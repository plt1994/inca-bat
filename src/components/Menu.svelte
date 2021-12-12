<script>
    import Header from "./Header.svelte";
    import Link from "components/Utils/Link.svelte";
    import { Container, Row, Col } from "sveltestrap/src";
</script>

<Container>
    <Row>
        <Col xs="2"
            ><Link to="about"><i class="icon-button fa">&#xf059;</i></Link>
        </Col>
        <Col xs="8"><Header /></Col>
        <Col xs="2"
            ><Link to="settings"
                ><i class="icon-button fa fa-gear fa-spin" /></Link
            ></Col
        >
    </Row>
    <hr />
    <Row
        ><Col xs="1" />
        <Col xs="10">
            <div class="buttons">
                <button class="btn btn-primary d-block w-100 h-90 shadow-btn"
                    ><Link to="test_selection"
                        ><p class="btn-font-size">Sound To Image Test</p></Link
                    ></button
                >
                <button class="btn btn-primary d-block w-100 h-90 shadow-btn"
                    ><Link to="logs_view"
                        ><p class="btn-font-size">Local Logs</p></Link
                    ></button
                >
                <button class="btn btn-primary d-block w-100 h-90 shadow-btn"
                    ><Link to="test_creator"
                        ><p class="btn-font-size">My Tests</p></Link
                    ></button
                >
                <button class="btn btn-primary d-block w-100 h-90 shadow-btn"
                    ><Link to="new_card"
                        ><p class="btn-font-size">My Cards</p></Link
                    ></button
                >
            </div>
        </Col>
        <Col xs="1" /></Row
    >

    <Row
        ><Col xs="1" />
        <Col xs="10"
            ><div class="color">
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

<style>
    .btn {
        border-radius: 40px !important;
    }

    .shadow-btn {
        -moz-box-shadow: 2px 8px 7px -6px rgba(66, 66, 66, 0.6); /*FF 3.5+*/
        -webkit-box-shadow: 2px 8px 7px -6px rgba(66, 66, 66, 0.6); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
        box-shadow: 2px 8px 7px -6px rgba(66, 66, 66, 0.6); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
    }
    .btn-font-size {
        font-size: 10vw;
    }
    .buttons {
        height: 70%;
        display: grid;
    }

    .color {
        background-color: #a0c9c0;
        display: grid;
        place-items: center;
        margin-top: 10%;
    }

    .h-90 {
        height: 90% !important;
    }

    .icon-button {
        font-size: 12vw;
        color: teal;
    }
</style>
