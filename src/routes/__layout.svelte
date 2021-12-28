<script>
  import NavBar from "../components/NavBar.svelte";
</script>

<NavBar/>
<div class="gameHeight bg-dark-red">
  <slot></slot>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .gameHeight{
    height: calc(100% - 50px);
  }
</style>