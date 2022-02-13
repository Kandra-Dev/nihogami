<script>
  import { subscribe } from 'svelte/internal';
  import { noTyping, repeatGame, selectedNoken, selectedVocabMode } from '../stores/gameStore.js'

  let isToRepeat = false;
  repeatGame.subscribe(value => isToRepeat = value)

  let isNoTyping= false;
  noTyping.subscribe(value => isNoTyping = value)

  let selectedLevel = "N5"
  let selectedMode= "Hiragana"
</script>

<div class="w-full flex flex-col items-center justify-center">
  <div class="flex flex-col">
    <label class="mb-1 text-sm text-center" for="numCardSelec">Nivel:</label>
    <select
      id="numCardSelec"
      bind:value={selectedLevel}
      on:change={(event) => selectedNoken.update(v => v = event.target.value)}
      class="bg-beige w-32 h-8 mb-[40px] rounded-sm"
    >
      <option value={"N5"}>N5</option>
      <option value={"N4"}>N4</option>
    </select>
  </div>
  <div class="flex flex-col">
    <label class="mb-1 text-sm text-center" for="numCardSelec">Modo:</label>
    <select
      id="numCardSelec"
      bind:value={selectedMode}
      on:change={(event) => selectedVocabMode.update(v => v = event.target.value)}
      class="bg-beige w-32 h-8 mb-[40px] rounded-sm"
    >
      <option value={"Hiragana"}>Hiragana</option>
      <option value={"Kanji"}>Kanji</option>
    </select>
  </div>
  <div class="w-1/2 flex justify-evenly items-center">
    <div class="flex items-center justify-center mb-12">
      <label for="toggleNoType" class="flex flex-col-reverse items-center cursor-pointer">
        <!-- toggle -->
        <div class="mt-2 relative">
          <!-- input -->
          <input type="checkbox" id="toggleNoType" class="sr-only" on:change={(value) => {
            // @ts-ignore
            noTyping.set(!isNoTyping)
            // restartGame()
          }}>
          <!-- line -->
          <div class="block bg-dark-red w-14 h-6 rounded-full" class:line={isNoTyping}></div>
          <!-- dot -->
          <div class="absolute left-1 top-1 bg-beige w-6 h-4 rounded-full transition" class:dot={isNoTyping}></div>
        </div>
        <!-- label -->
        <div class="text-gray-700 text-sm">
          Si / No 
        </div>
      </label>
    </div>
    <div class="flex items-center justify-center mb-12">
      <label for="toggleRepeat" class="flex flex-col-reverse items-center cursor-pointer">
        <!-- toggle -->
        <div class="mt-2 relative">
          <!-- input -->
          <input type="checkbox" id="toggleRepeat" class="sr-only" on:change={() => {
            repeatGame.set(!isToRepeat)
          }}>
          <!-- line -->
          <div class="block bg-dark-red w-14 h-6 rounded-full" class:repeat-line={isToRepeat}></div>
          <!-- dot -->
          <div class="absolute left-1 top-1 bg-beige w-6 h-4 rounded-full transition" class:repeat-dot={isToRepeat}></div>
        </div>
        <!-- label -->
        <div class="text-gray-700 text-sm">
          Repetir Erradas 
        </div>
      </label>
    </div>
  </div>
</div>

<style>
  .dot{
    transform: translateX(100%);
  }
  .line{
    background-color: #b9cb65;
  }
  .repeat-dot{
    transform: translateX(100%);
  }
  .repeat-line{
    background-color: #b9cb65;
  }
</style>