<script>
  import CardGame from "../components/CardGame.svelte";
  import * as vocab from "../N5-Kanji.json";
</script>

<svelte:head>
  <title>Card Game</title>
</svelte:head>

<main class="w-screen h-screen flex items-center justify-center">
  <CardGame vocab={vocab} isKanji={true}/>
</main>
