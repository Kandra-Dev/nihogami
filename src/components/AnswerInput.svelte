<script>
  import { createEventDispatcher } from "svelte";

  export let rightAnswer
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

  let dispatch = createEventDispatcher();
  let answer;

  const handleSubmit = () => {
    dispatch("checkAnswer", answer);
    answer = "";
  };
</script>

<div class="flex flex-col items-center mt-10 max-w-full p-[20px]">
  {#if rightAnswer == true}
    <h2 class="text-dark-green text-2xl font-bold">Correcto!</h2>
  {:else if rightAnswer === false}
    <h2 class="text-red text-2xl font-bold">Incorrecto!</h2>
  {/if}

  {#if hiraWords.length > 0 && !showScore}
    <form class="my-5 flex max-w-full" on:submit|preventDefault={handleSubmit}>
      <input class="rounded-sm p-2 bg-white max-w-full focus-visible:outline-none" bind:value={answer} type="text" placeholder="Answer" />
      <button class="bg-marine text-beige font-bold p-2 rounded">Submit</button>
    </form>
    <div class="flex justify-between w-full items-center max-h-50 bg-beige">
      <button
        class="text-beige font-bold rounded-md p-2 bg-red"
        on:click={() => {
          showAnswer = true;
          combo = 0 
          score--;
          repeatVocab.push([hiraWords[currentCard], hiraAnswers[currentCard]])
        }}>Revelar</button
      >
      {#if showAnswer}
        <h2>{hiraAnswers[currentCard]}</h2>
        <button
          class="text-beige font-bold rounded-md p-2 bg-dark-marine"
          on:click={() => {
            nextCard();
            showAnswer = false;
            score++;
          }}>Siguiente</button
        >
      {/if}
    </div>
  {/if}
  {#if showScore}
    <button class="mt-24 text-beige bg-dark-green rounded-md font-bold p-4" on:click={restartGame}
      >Play Again</button
    >
  {/if}
</div>