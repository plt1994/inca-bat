<script>
    import { Container, Row } from "sveltestrap";
    export let rows = "3";
</script>

<footer class="fixed-bottom rounded">
    <Container fluid>
        <div class="margin-footer-buttons">
            <Row cols={rows}>
                <slot />
            </Row>
        </div>
    </Container>
</footer>

<style>
    .margin-footer-buttons {
        margin-top: 1vh;
        margin-bottom: 1vh;
    }
    .rounded {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>
