<!-- Fullscreen.svelte -->
<script>
  import { onMount } from "svelte";
  import { learnerMode } from "./stores";

  // define initial component state
  let isFull = false;
  let fsContainer = null;
  let paused = false;

  // boring plain js fullscreen support stuff below
  const noop = () => {};

  const fullscreenSupport = !!(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled ||
    false
  );

  const exitFullscreen = (
    document.exitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen ||
    noop
  ).bind(document);

  const requestFullscreen = () => {
    const requestFS = (
      fsContainer.requestFullscreen ||
      fsContainer.mozRequestFullScreen ||
      fsContainer.webkitRequestFullscreen ||
      fsContainer.msRequestFullscreen ||
      noop
    ).bind(fsContainer);
    requestFS();
  };

  onMount(() => {
    // Add the icon stylesheet dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.head.appendChild(link);

    // remove the link when component is unmounted
    return () => {
      link.parentNode.removeChild(link);
    };
  });

  // handler for the fullscreen button
  const fsToggle = () => {
    if (!fullscreenSupport) return;
    learnerMode.update(() => {
      return !isFull;
    });
    if (isFull) {
      paused = true;
      exitFullscreen();
    } else {
      paused = false;
      requestFullscreen(fsContainer);
    }
    isFull = !isFull;
  };

  // the icon name is computed automagically based
  // on the state of the screen
  $: icon = isFull ? "fullscreen_exit" : "fullscreen";
  let enterGameMsg = paused ? "Continue?" : "START!";
</script>

<div class="fs" class:isFull bind:this={fsContainer}>
  <slot {isFull} />
  {#if fullscreenSupport && !$learnerMode}
    <div class="bg-0">
      <button class="button-enter-fullscreen" on:click={fsToggle}>
        {paused ? "Continue?" : "START!"}
      </button>
    </div>
  {:else if fullscreenSupport}
    <button class="button-exit-1" on:click={fsToggle}>
      <i class="material-icons md-36">fullscreen_exit</i>
    </button>
  {/if}
</div>

<style>
  .bg-0 {
    background-color: rgb(117, 110, 101);
  }
  .isFull {
    width: 100vw;
    height: 100vh;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .button-enter-fullscreen {
    color: #000;
    background-color: rgb(255, 255, 255);
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50vh;
    height: 20vh;
    border-radius: 10px;
  }
  .button-exit-1 {
    color: #000;
    background-color: rgb(255, 255, 255);
    position: fixed;
    right: 10px;
    bottom: 0px;
  }
</style>
