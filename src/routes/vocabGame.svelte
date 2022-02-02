<script>
  import CardGame from "../components/CardGame.svelte";
  import * as vocab from "../N5-Vocab.json";
</script>

<svelte:head>
  <title>Nihogami - Vocabulario</title>
</svelte:head>

<main class="w-screen h-screen flex items-center justify-center">
  <CardGame vocab={vocab}/>
</main>
