<script>
  import CardGame from "../../components/CardGame.svelte";
  import { selectedNoken, selectedVocabMode } from "../../stores/gameStore";

  import * as vocabN5 from "../../N5-Vocab.json";
  import * as kanjiN5 from "../../N5-Kanji.json";
  import * as vocabN4 from "../../N4-Vocab.json";
  import * as kanjiN4 from "../../N4-Kanji.json";

  let vocab;
  let isKanji = false;
  let selectedLevel = "N5"

  const getVocab = () => {
    switch (selectedLevel) {
      case "N5":
        return isKanji  ? kanjiN5 : vocabN5
      case "N4":
        return isKanji ? kanjiN4 : vocabN4
      default:
        break;
    }
  }

  selectedVocabMode.subscribe(value => {
    isKanji = value === "Kanji" 
    vocab = getVocab();
  })

  selectedNoken.subscribe(value => {
    selectedLevel = value
    vocab = getVocab();
  })
</script>

<svelte:head>
  <title>Nihogami - Game </title>
</svelte:head>

<main class="w-screen h-screen flex items-center justify-center">
  <CardGame bind:vocab={vocab} isKanji={isKanji}/>
</main>
