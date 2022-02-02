<script>
  // Hirawords es una lista de strings
  export let hiraWords;
  // restartGame es una funcion definida en cardGame
  export let restartGame;
  // showScore es un booleano que representa si el juego termino
  export let showScore;
  // score es un int que respresenta las cards adivinadas
  export let score;
  // combo es un int que respresenta las respuestas correctas consecutivas 
  export let combo;
  // bestCombo es un int que respresenta la el combo mas grande logrado 
  export let bestCombo;
  // numberOfCards es un int que representa la cantidad de cards a mostrar
  export let numberOfCards;
  // currentCard es un int que representa la el indice+1 de la carta acutal en hiraWords 
  export let currentCard;
</script>

<div class="h-60 w-60 text-2xl rounded-md border border-gray flex justify-center shadow-md shadow-gray bg-beige items-center relative max-w-[90%] min-h-[100px]">
  {#if hiraWords.length == 0}
    <div class="h-full font-bold w-full rounded-md text-gray flex justify-center items-center" on:click={restartGame}>
      Check sets to start!
    </div>
  {:else if showScore}
  <div class="flex flex-col">
    <h1 class="text-center">{score + "/" + numberOfCards}</h1>
    <h2 class="text-center text-base">{"Best Combo: " + bestCombo}</h2>
  </div>
  {:else}
    <div class="flex absolute justify-between top-1 w-full py-0 px-4 box-border">
      <h2>{score}</h2>
      <h2>{currentCard + 1 + "/" + hiraWords.length}</h2>
    </div>
    <div class="flex absolute justify-end bottom-1 w-full py-0 px-4 box-border">
      <h2 class="text-dark-yellow font-bold">{"x" + combo}</h2>
    </div>
    <h1 class="text-center">{hiraWords[currentCard]}</h1>
  {/if}
</div>