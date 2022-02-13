<script>
  import SidePanel from "../../components/SidePanel.svelte";
  import NavBar from "../../components/NavBar.svelte";
  import GameOptions from "../../components/GameOptions.svelte";
</script>

<div class="gameHeight bg-dark-red">
  <SidePanel side={"right"}>
    <GameOptions/>
  </SidePanel>
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