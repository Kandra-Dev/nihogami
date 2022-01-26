<script>
  import AnswerInput from "./AnswerInput.svelte";
  import LectionList from "./LectionList.svelte";
  import ListDict from "./ListDict.svelte";
  import OptionSelectors from "./OptionSelectors.svelte";
  import Card from "./Card.svelte";
  import * as vocab from "../N5-Vocab.json";
  import isEqual from 'lodash/isEqual'


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
    let res = []
    selectedLists.forEach(list => {
      res.push(...list[1])  
    });
    return res;
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
      if (randomItem) {
        hiraWords.push(randomItem[indexA]);
        hiraAnswers.push(randomItem[indexB]);
        if (gameType == "showShuffle") {
          let extra = indexA;
          indexA = indexB;
          indexB = extra;
        }
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

  const setSelectedList = (list) => {
    selectedList = list.detail;
  }

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
  let numberOfCards = -1;
  let selectedList = [];
  let selectedLists = [];
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

<LectionList bind:group={selectedLists} fullVocabList={fullVocabList} restartGame={restartGame} on:setSelectedList={setSelectedList}/> 
<div id="cardWrapper" class="z-20 m-0 p-0 w-[500px] max-h-full max-w-full h-full bg-dark-beige shadow-lg gameHeight">
  <div class="m-auto h-full flex flex-col justify-items-start items-center">
    <OptionSelectors numberOfCards={numberOfCards} restartGame={restartGame} vocabList={vocabList} getNumbersList={getNumbersList} gameType={gameType} />
    <Card hiraWords={hiraWords} restartGame={restartGame} showScore={showScore} score={score} combo={combo} bestCombo={bestCombo} numberOfCards={numberOfCards} currentCard={currentCard}/>

    <AnswerInput
      on:checkAnswer={checkAnswer} 
      rightAnswer={rightAnswer}
      hiraWords={hiraWords} 
      showScore={showScore} 
      combo={combo}
      score={score} 
      showAnswer={showAnswer}
      hiraAnswers={hiraAnswers} 
      currentCard={currentCard} 
      nextCard={nextCard} 
      restartGame={restartGame} 
    />
  </div>
</div>
{#if selectedList.length > 0}
  <ListDict selectedList={selectedList}/>
{:else}
  <div id="dictWrapper" class="z-10 m-0 p-0 w-[500px] max-h-full h-4/5 max-w-full bg-transparent shadow-none gameHeight"></div>
{/if}
