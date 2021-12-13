<script></script>

<button on:click class="btn btn-primary d-block w-100 h-90 shadow-btn">
    <slot />
</button>

<style>
    .btn {
        border-radius: 40px !important;
    }
    .shadow-btn {
        -moz-box-shadow: 2px 8px 7px -6px rgba(66, 66, 66, 0.6); /*FF 3.5+*/
        -webkit-box-shadow: 2px 8px 7px -6px rgba(66, 66, 66, 0.6); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
        box-shadow: 2px 8px 7px -6px rgba(66, 66, 66, 0.6); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
    }
    .h-90 {
        height: 90% !important;
    }
</style>
