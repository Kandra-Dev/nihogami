import { writable } from 'svelte/store'
import { browser } from '$app/env'

export const repeatGame = writable(false)
export const noTyping = writable(false)
export const selectedNoken = writable("N5")
export const selectedVocabMode = writable("Hiragana")


// export const repeatGame = writable(
//   browser && (localStorage.getItem("repeatGame") || "false")
// );
// repeatGame.subscribe((val) => browser && localStorage.setItem("repeatGame", val));