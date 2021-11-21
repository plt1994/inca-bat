<script>
    import { page } from "stores/stores.js";
    export let to = "main";
    export const moveToPage = () => {
        page.update(() => {
            return to;
        });
    };
</script>

<div on:click={moveToPage}>
    <slot />
</div>
