<script>
    import { Navbar, NavbarBrand, Col, Container, Row } from "sveltestrap";
    let color = "light";
</script>

<footer class="fixed-bottom">
    <Container>
        <Row>
            <Navbar {color}><slot /></Navbar>
        </Row>
    </Container>
</footer>

<style>
</style>
