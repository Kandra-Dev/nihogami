<script>
  export let numberOfCards
  export let restartGame 
  export let vocabList
  export let getNumbersList 
  export let gameType 
  export let isNoTyping
  export let repeatGame
</script>

<div class="flex justify-evenly w-full flex-wrap mt-[115px]">
  <div class="flex flex-col">
    <label class="mb-1 text-sm text-center" for="numCardSelec">Numero de tarjetas:</label>
    <select
      id="numCardSelec"
      bind:value={numberOfCards}
      on:change={restartGame}
      class="bg-beige w-32 h-8 mb-[40px] rounded-sm"
    >
      {#each getNumbersList(vocabList) as amount}
        <option value={amount}>{amount}</option>
      {/each}
      {#if vocabList.length % 5 != 0}
        <option value={vocabList.length}
          >{"All (" + vocabList.length + ")"}</option
        >
      {/if}
      <option value={-1}>Infinito</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label class="mb-1 text-sm text-center" for="gameTypeSelec">Idioma:</label>
    <select
      id="nameTypeSelec"
      bind:value={gameType}
      on:change={restartGame}
      class="bg-beige w-32 h-8 mb-[40px] rounded-sm"
    >
      <option value={"showLang"}>Español</option>
      <option value={"showHira"}>Japones</option>
      <option value={"showShuffle"}>Shuffle</option>
    </select>
  </div>

  <div class="flex items-center justify-center mb-12">
    <label for="toggleNoType" class="flex flex-col-reverse items-center cursor-pointer">
      <!-- toggle -->
      <div class="mt-2 relative">
        <!-- input -->
        <input type="checkbox" id="toggleNoType" class="sr-only" on:change={(value) => {
          // @ts-ignore
          isNoTyping = value.target.checked
          restartGame()
        }}>
        <!-- line -->
        <div class="block bg-dark-red w-14 h-6 rounded-full" class:line={isNoTyping}></div>
        <!-- dot -->
        <div class="absolute left-1 top-1 bg-beige w-6 h-4 rounded-full transition" class:dot={isNoTyping}></div>
      </div>
      <!-- label -->
      <div class="text-gray-700 text-sm">
        Si / No 
      </div>
    </label>
  </div>

  <div class="flex items-center justify-center mb-12">
    <label for="toggleRepeat" class="flex flex-col-reverse items-center cursor-pointer">
      <!-- toggle -->
      <div class="mt-2 relative">
        <!-- input -->
        <input type="checkbox" id="toggleRepeat" class="sr-only" on:change={() => {
          repeatGame = !repeatGame 
        }}>
        <!-- line -->
        <div class="block bg-dark-red w-14 h-6 rounded-full" class:repeat-line={repeatGame}></div>
        <!-- dot -->
        <div class="absolute left-1 top-1 bg-beige w-6 h-4 rounded-full transition" class:repeat-dot={repeatGame}></div>
      </div>
      <!-- label -->
      <div class="text-gray-700 text-sm">
        Repetir Erradas 
      </div>
    </label>
  </div>

</div>

<style>
  .dot{
    transform: translateX(100%);
  }
  .line{
    background-color: #b9cb65;
  }
  .repeat-dot{
    transform: translateX(100%);
  }
  .repeat-line{
    background-color: #b9cb65;
  }
</style>