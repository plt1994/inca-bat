<script>
    import TestDisplayer from "./TestDisplayer.svelte";
    import MenuButton from "components/Utils/MenuButton.svelte";
    import ButtonLink from "components/Utils/ButtonLink.svelte";
    import Footer from "components/Footer.svelte";
    import { Col } from "sveltestrap";
</script>

<center><h1>Select a Test to start</h1></center>
<center>
    <div class="color">
        <TestDisplayer />
    </div>
</center>

<Footer rows="2">
    <Col>
        <MenuButton />
    </Col>
    <Col>
        <ButtonLink path="card_selection" contentType="text">Start</ButtonLink>
    </Col>
</Footer>
