<script>
    import ButtonLink from "./ButtonLink.svelte";
    export let fontSize = "min(10vh, 8vw)";
</script>

<ButtonLink path="menu" {fontSize} contentType="icon"
    ><i class="fa fa-home" />
</ButtonLink>
