<script>
  export let hiraWords 
  export let showScore 
  export let combo 
  export let score 
  export let showAnswer 
  export let hiraAnswers 
  export let currentCard 
  export let nextCard 
  export let restartGame 
  export let repeatVocab 
</script>

<div class="flex flex-col items-center mt-10 max-w-full p-[20px] w-60 box-border">
  {#if hiraWords.length > 0 && !showScore}
    <div class="flex flex-col justify-between w-full items-center max-h-60 h-36">
      <button
        class="text-beige font-bold rounded-md p-2 bg-dark-marine"
        on:click={() => {
          showAnswer = true;
        }}>Revelar</button
      >
      <div class="bg-beige text-xl font-bold w-full flex justify-center items-center">
      {#if showAnswer}
          <h2 class="text-center p-2">{hiraAnswers[currentCard]}</h2>
      {/if}
      </div>
      <div>
        <button
          disabled={!showAnswer}
          class="text-beige font-bold rounded-md p-2 bg-green w-24"
          on:click={() => {
            nextCard();
            showAnswer = false;
            score++;
            combo++;
          }}>Si</button
        >
        <button
          disabled={!showAnswer}
          class="text-beige font-bold rounded-md p-2 bg-red w-24"
          on:click={() => {
            showAnswer = false;
            score--;
            combo=0;
            repeatVocab.push([hiraWords[currentCard], hiraAnswers[currentCard]])
            nextCard();
          }}>No</button
        >
      </div>
    </div>
  {/if}
  {#if showScore}
    <button class="mt-24 text-beige bg-dark-green rounded-md font-bold p-4" on:click={restartGame}
      >Play Again</button
    >
  {/if}
</div>