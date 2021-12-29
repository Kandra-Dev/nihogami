<script>
  import AnswerInput from "../components/AnswerInput.svelte";
  import Card from "../components/Card.svelte";
  import * as vocab from "../N5-Vocab.json";

  //FUNCTIONS
  const generateFullVocabList = () => {
    let dict = {};
    let allLists = Object.entries(vocab['default']);
    for (let index = 0; index < Object.entries(vocab['default']).length; index++) {
      dict["s" + (index + 1)] = allLists.sort()[index][1];
    }
    return dict;
  };

  const generateAllVocab = () => {
    let res = [];
    for (
      let index = 1;
      index <= Object.entries(fullVocabList).length;
      index++
    ) {
      res = res.concat(fullVocabList["s" + index]);
    }
    return res;
  };

  const getVocabList = () => {
    if (selectedList == "all") {
      return allVocab;
    } else {
      return fullVocabList[selectedList];
    }
  };

  const getMaxCards = () => {
    if (numberOfCards == -1) {
      return vocabList.length;
    } else if (numberOfCards > vocabList.length) {
      let numberList = getNumbersList(vocabList);
      numberOfCards = numberList[numberList.length - 1];
    }
    return numberOfCards;
  };

  const initWords = () => {
    let maxCards = getMaxCards();
    if (gameType == "showLang") {
      indexA = 0;
      indexB = 1;
    }
    var newVocabList = [...vocabList];
    while (hiraWords.length < maxCards) {
      let index = Math.floor(Math.random() * (newVocabList.length - 0)) + 0;
      let randomItem = newVocabList.splice(index, 1)[0];
      if (
        hiraWords.findIndex((a) => a == randomItem[indexA]) == -1 ||
        hiraAnswers.findIndex((a) => a == randomItem[indexB]) == -1
      ) {
        hiraWords.push(randomItem[indexA]);
        hiraAnswers.push(randomItem[indexB]);
        if (gameType == "showShuffle") {
          let extra = indexA;
          indexA = indexB;
          indexB = extra;
        }
      } else {
        console.log(randomItem[0] + " ESTA REPETIDO");
      }
    }
    indexA = 1;
    indexB = 0;
  };

  const restartGame = () => {
    vocabList = getVocabList();
    showScore = false;
    score = 0;
    combo = 0;
    hiraWords = [];
    hiraAnswers = [];
    currentCard = 0;
    rightAnswer = undefined;
    showAnswer = false;
    indexA = 1;
    indexB = 0;
    initWords();
  };

  const checkAnswer = (answer) => {
    if (gameType == "showLang") {
      indexA = 0;
      indexB = 1;
    }
    let correspondToAnswer = vocabList.find(
      (i) => i[indexB] === answer.detail.toLowerCase()
    )?.[indexA];
    if (hiraWords[currentCard] == correspondToAnswer) {
      rightAnswer = true;
      showAnswer = false;
      combo++;
      if (combo > bestCombo) {
        bestCombo = combo
      }
      score++;
      nextCard();
      if (gameType == "showShuffle") {
        let extra = indexA;
        indexA = indexB;
        indexB = extra;
      }
    } else {
      rightAnswer = false;
      combo = 0;
    }
  };

  const nextCard = () => {
    let maxCards = getMaxCards();
    if (currentCard + 1 == maxCards) {
      if (numberOfCards == -1) {
        restartGame();
      } else {
        showScore = true;
      }
    } else {
      currentCard++;
    }
  };

  const getNumbersList = (list) => {
    let posibleNumbers = [];
    for (let index = 4; index < list.length; index += 5) {
      posibleNumbers.push(index + 1);
    }
    return posibleNumbers;
  };

  //CONSTANTS
  const fullVocabList = generateFullVocabList();
  const allVocab = generateAllVocab();

  //MODIFIABLES
  let numberOfCards = 5;
  let selectedList = "s1";
  let gameType = "showHira";

  //INIT STATE
  let vocabList = getVocabList();
  let showScore = false;
  let score = 0;
  let combo = 0;
  let bestCombo = 0;
  let hiraWords = [];
  let hiraAnswers = [];
  let currentCard = 0;
  let rightAnswer = undefined;
  let showAnswer = false;
  let indexA = 1;
  let indexB = 0;
</script>

<svelte:head>
  <title>Card Game</title>
</svelte:head>

<main class="w-screen h-screen flex justify-center">
  <div class="m-0 p-0 w-[500px] max-h-full max-w-full bg-dark-beige shadow-lg gameHeight">
    <div class="m-auto h-full flex flex-col justify-items-start items-center">
      <div class="flex justify-evenly w-full flex-wrap mt-[115px]">
        <div class="flex flex-col">
          <label class="mb-1 text-sm text-center" for="vocabListSelec">Set de tarjetas:</label>
          <select
            id="vocabListSelec"
            bind:value={selectedList}
            on:change={restartGame}
            class="bg-beige w-32 h-8 mb-[40px] rounded-sm"
          >
            {#each Object.entries(fullVocabList) as list}
              <option value={list[0]}>{"N5 Set - " + list[0]}</option>
            {/each}
            <option value={"all"}>Todos</option>
          </select>
        </div>

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
            <option value={-1}>Non Stop</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="mb-1 text-sm text-center" for="gameTypeSelec">Tipo de juego:</label>
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

      <Card hiraWords={hiraWords} restartGame={restartGame} showScore={showScore} score={score} combo={combo} bestCombo={bestCombo} numberOfCards={numberOfCards} currentCard={currentCard}/>

      <div class="flex flex-col items-center mt-10 max-w-full">
        {#if rightAnswer == true}
          <h2 class="text-dark-green text-2xl font-bold">Correcto!</h2>
        {:else if rightAnswer === false}
          <h2 class="text-red text-2xl font-bold">Incorrecto!</h2>
        {/if}

        {#if hiraWords.length > 0 && !showScore}
          <AnswerInput on:checkAnswer={checkAnswer} />
          <div class="flex justify-between w-full items-center max-h-50 bg-beige">
            <button
              class="text-beige font-bold rounded-md p-2 bg-red"
              on:click={() => {
                showAnswer = true;
                combo = 0 
                score--;
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
    </div>
  </div>
</main>
