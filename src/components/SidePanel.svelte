<script>
  export let side = 'right';
 
  let isOpen = false;
</script>

<div class={"fixed flex top-1/2 translate-y-[-50%] w-[500px] h-[750px] bg-dark-beige z-30 shadow-md rounded-l-md transition-transform ease-out duration-1000 " + (side == 'right' ? 'right-panel' : 'left-panel')} class:closed={!isOpen}>
  <div class="h-full w-[25px] hover:bg-beige hover:rounded-l-md cursor-pointer flex justify-center items-center" on:click={() => isOpen = !isOpen}>
    >>
    <!-- <Fa icon={isOpen ? faAnglesRight : faAnglesLeft} /> -->
  </div>
  <slot></slot>
</div>

<style>
  .closed {
    transition: transform 1s;
    transform: translate(+475px, -50%);
  }
  .right-panel{
    right: 0;
  }
</style>