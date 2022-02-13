<script>
  export let numberOfCards
  export let restartGame 
  export let vocabList
  export let getNumbersList 
  export let gameType 
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

</div>
