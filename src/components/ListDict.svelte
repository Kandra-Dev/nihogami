<script>
  export let selectedList
</script>

<div id="dictWrapper" class="z-10 m-0 p-0 w-[500px] max-h-full h-4/5 max-w-full bg-dark-beige shadow-lg gameHeight">
  <h1 class="text-3xl text-center my-4">{"Palabras En " + selectedList[0]}</h1>
  <div class="m-4 border h-4/5 overflow-y-scroll">
      <table class="w-full border-collapse">
        {#each selectedList[1] as word, index}
          <tr class="border-none h-10 flex items-center hover:bg-dark-green" class:bg-beige={index % 2 == 0}>
            <td class="px-4 h-full border-r-solid border-r border-r-gray w-1/2 flex items-center">{word[1]}</td> 
            <td class="px-4 h-full border-l-solid border-l border-l-gray w-1/2 opacity-0 hover:opacity-100 flex items-center">{word[0]}</td> 
          </tr>
        {/each}
      </table>
  </div>
</div>