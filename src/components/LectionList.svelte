<script>
  import { createEventDispatcher } from "svelte";

  export let group
  export let fullVocabList
  export let restartGame

  let selectedList
  let dispatch = createEventDispatcher();

  const handleListSelect = (list) => {
    console.log(group)
    selectedList = list
    dispatch("setSelectedList", list);
  };
</script>

<div id="selectorWrapper" class="z-10 m-0 p-0 w-[500px] max-h-full h-4/5 max-w-full bg-dark-beige shadow-lg gameHeight">
  <h1 class="text-3xl text-center my-4">Seleccionar Lecciones</h1>
  <div class="m-4 border h-4/5 overflow-y-scroll">
    <div class="h-50 flex z-30">
      <div class="h-full w-1/2 flex items-center justify-center hover:shadow-inner hover:cursor-pointer hover:text-dark-red" on:click={() => {
        group = Object.entries(fullVocabList)
        restartGame()
      }}>Seleccionar Todos</div>
      <div class="h-full w-1/2 flex items-center justify-center hover:shadow-inner hover:cursor-pointer hover:text-dark-red" on:click={() => {
        group = [] 
        restartGame()
      }}>Limpiar</div>
    </div>
    {#each Object.entries(fullVocabList) as list, index}
      <div class="h-10 px-4 flex items-center hover:cursor-pointer hover:bg-dark-green" class:bg-green={selectedList && selectedList[0] == list[0]} class:bg-beige={index % 2 == 0} on:click={() => handleListSelect(list)}>
        <input type="checkbox" class="mr-2" value={list} bind:group={group} on:change={() => restartGame()}>{"Set - " + list[0]}
      </div>
    {/each}
  </div>
</div>