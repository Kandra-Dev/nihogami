<script>
  import NavBar from "../components/NavBar.svelte";
</script>

<div class="h-[100vh] flex flex-col">
  <NavBar/>
  <div class="gameHeight bg-dark-red">
    <slot></slot>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .gameHeight{
    height: calc(100% - 50px);
  }
</style>