<script>
  import AnswerInput from "./AnswerInput.svelte";
  import LectionList from "./LectionList.svelte";
  import ListDict from "./ListDict.svelte";
  import OptionSelectors from "./OptionSelectors.svelte";
  import Card from "./Card.svelte";
  import YesNoImput from "./YesNoImput.svelte";
  import _ from 'lodash'

  import { noTyping, repeatGame, selectedNoken, selectedVocabMode } from '../stores/gameStore.js'
  let isToRepeat = false;
  repeatGame.subscribe(value => isToRepeat = value)

  let isNoTyping = false;
  noTyping.subscribe(value => isNoTyping = value)

  export let vocab
  $: console.log(Object.entries(vocab['default']))
  export let isKanji


  //FUNCTIONS
  const generateFullVocabList = () => {
    let dict = {};
    let allLists = Object.entries(vocab['default']);
    console.log(allLists)
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

  // Returns number of cards to play
  const getMaxCards = () => {
    if (repeatVocab.length > 0 && isToRepeat){
      return repeatVocab.length
    }else{
      if (numberOfCards == -1) {
        return vocabList.length;
      } else if (numberOfCards > vocabList.length) {
        let numberList = getNumbersList(vocabList);
        numberOfCards = numberList[numberList.length - 1];
      }
      return numberOfCards;
    }
  };

  const initWords = () => {
    if (gameType == "showLang") {
      indexA = 0;
      indexB = 1;
    }
    var newVocabList = [...vocabList];
    while (hiraWords.length < maxCards) {
      let index = Math.floor(Math.random() * (newVocabList.length - 0)) + 0;
      let randomItem = newVocabList.splice(index, 1)[0];
      let wordToAdd = ""
      let answerToAdd = ""
      if (isKanji) {
        wordToAdd = randomItem[2]
        answerToAdd = randomItem[0] + (randomItem[1]["kun"] ? ' / kun: ' + randomItem[1]["kun"] : '') + (randomItem[1]["on"] ? ' / on: ' + randomItem[1]["on"] : '')
      }else{
        wordToAdd = randomItem[indexA] 
        answerToAdd = randomItem[indexB]
      }
      if (randomItem) {
        hiraWords.push(wordToAdd);
        hiraAnswers.push(answerToAdd);
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
    maxCards = getMaxCards();
    if (repeatVocab.length > 0 && isToRepeat){
      showAnswer = false;
      let repeatRange = [...repeatVocab.keys()] 
      hiraWords = []
      hiraAnswers = []
      currentCard = 0;
      _.shuffle(repeatRange).forEach(index=> {
        hiraWords.push(repeatVocab[index][0])
        hiraAnswers.push(repeatVocab[index][1])
      });
      repeatVocab = []
    }else{
      repeatVocab = []
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
      if (selectedLists.length > 0){
        initWords();
      }
    }
  };

  const checkAnswer = (answer) => {
    if (gameType == "showLang") {
      indexA = 0;
      indexB = 1;
    }
    let correspondToAnswer = ""
    if (isKanji) {
      correspondToAnswer = vocabList.find((i) => i[1]['kun'] === answer.detail.toLowerCase())?.[2] || vocabList.find((i) => i[1]['on'] === answer.detail.toLowerCase())?.[2]
    }else{
      correspondToAnswer = vocabList.find(
        (i) => i[indexB] === answer.detail.toLowerCase()
      )?.[indexA];
    }
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
    if (currentCard + 1 == maxCards) {
      if (numberOfCards == -1 || (repeatVocab.length > 0 && isToRepeat)) {
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
  let fullVocabList = generateFullVocabList();
  $: if (vocab !== '') {       // make it react to changes (in the parent)
    fullVocabList = generateFullVocabList()
    restartGame()
   }; 
  const allVocab = generateAllVocab();

  //MODIFIABLES
  let numberOfCards = -1;
  let selectedList = [];
  let selectedLists = [];
  let gameType = "showHira";
  let repeatVocab = []
  let maxCards = 0

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

  selectedNoken.subscribe(value => {
    selectedList = []
    selectedLists = []
    restartGame()
  })
  selectedVocabMode.subscribe(value => {
    selectedList = []
    selectedLists = []
    restartGame()
  })
</script>

<LectionList bind:group={selectedLists} fullVocabList={fullVocabList} restartGame={restartGame} on:setSelectedList={setSelectedList}/> 
<div id="cardWrapper" class="z-20 m-0 p-0 w-[500px] max-h-full max-w-full h-full bg-dark-beige shadow-lg">
  <div class="m-auto h-full flex flex-col justify-items-start items-center">
    <OptionSelectors bind:numberOfCards={numberOfCards} restartGame={restartGame} vocabList={vocabList} getNumbersList={getNumbersList} gameType={gameType} />
    <Card hiraWords={hiraWords} restartGame={restartGame} showScore={showScore} score={score} combo={combo} bestCombo={bestCombo} numberOfCards={numberOfCards} currentCard={currentCard}/>

    {#if isNoTyping}
      <YesNoImput
        bind:repeatVocab={repeatVocab}
        hiraWords={hiraWords} 
        showScore={showScore} 
        bind:combo={combo}
        bind:score={score} 
        showAnswer={showAnswer}
        hiraAnswers={hiraAnswers} 
        currentCard={currentCard} 
        nextCard={nextCard} 
        restartGame={restartGame} 
      />
    {:else}
      <AnswerInput
        bind:repeatVocab={repeatVocab}
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
    {/if}
  </div>
</div>
{#if selectedList.length > 0}
  <ListDict selectedList={selectedList} isKanji={isKanji}/>
{:else}
  <div id="dictWrapper" class="z-10 m-0 p-0 w-[500px] max-h-full h-4/5 max-w-full bg-transparent shadow-none gameHeight"></div>
{/if}
