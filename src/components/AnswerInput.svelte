<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
  let answer;

  const handleSubmit = () => {
    dispatch("checkAnswer", answer);
    answer = "";
  };
</script>

<form class="my-5 flex max-w-full" on:submit|preventDefault={handleSubmit}>
  <input class="rounded-sm p-2 bg-white max-w-full focus-visible:outline-none" bind:value={answer} type="text" placeholder="Answer" />
  <button class="bg-marine text-beige font-bold p-2 rounded">Submit</button>
</form>