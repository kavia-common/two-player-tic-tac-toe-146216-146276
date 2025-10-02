<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
    <NuxtRouteAnnouncer />
    <main class="container mx-auto px-4 py-10 flex items-center justify-center">
      <div
        class="w-full max-w-md rounded-2xl shadow-xl bg-white/90 backdrop-blur-md ring-1 ring-gray-100/60 p-6 sm:p-8 transition-all duration-300"
      >
        <header class="text-center space-y-2 mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">
            <span class="text-[#2563EB]">Tic</span>
            <span class="text-gray-800">Tac</span>
            <span class="text-[#F59E0B]">Toe</span>
          </h1>
          <p class="text-sm text-gray-600">
            Two-player on the same device
          </p>
        </header>

        <section class="mb-5">
          <StatusDisplay
            :current-player="currentPlayer"
            :winner="winner"
            :is-draw="isDraw"
          />
        </section>

        <section class="mb-6">
          <GameGrid
            :board="board"
            :winner="winner"
            :winning-line="winningLine"
            @cellClick="handleCellClick"
          />
        </section>

        <section class="flex items-center justify-between gap-3">
          <RestartControl @restart="restart" />

          <div class="text-xs sm:text-sm text-gray-500">
            <span class="inline-flex items-center gap-1">
              <span
                class="inline-block h-3 w-3 rounded-full border border-blue-200"
                :style="{ backgroundColor: playerColor('X') }"
              />
              X
            </span>
            <span class="mx-2">•</span>
            <span class="inline-flex items-center gap-1">
              <span
                class="inline-block h-3 w-3 rounded-full border border-amber-200"
                :style="{ backgroundColor: playerColor('O') }"
              />
              O
            </span>
          </div>
        </section>
      </div>
    </main>
    <footer class="py-6 text-center text-xs text-gray-500">
      Built with Nuxt · Ocean Professional theme
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Types
type Player = 'X' | 'O'
type Cell = Player | ''
type Board = Cell[]

// State
const board = ref<Board>(Array(9).fill(''))
const currentPlayer = ref<Player>('X')
const winner = ref<Player | ''>('')
const winningLine = ref<number[] | null>(null)

// Computed
const isDraw = computed(() => !winner.value && board.value.every(c => c !== ''))

// PUBLIC_INTERFACE
function restart(): void {
  /**
   * Reset the game to the initial state.
   */
  board.value = Array(9).fill('')
  currentPlayer.value = 'X'
  winner.value = ''
  winningLine.value = null
}

// PUBLIC_INTERFACE
function handleCellClick(index: number): void {
  /**
   * Handle a user click on a cell at the given index.
   * Ignores clicks if the cell is occupied or the game is finished.
   */
  if (board.value[index] || winner.value) return
  board.value.splice(index, 1, currentPlayer.value)

  const { winPlayer, line } = checkWinner(board.value)
  if (winPlayer) {
    winner.value = winPlayer
    winningLine.value = line
    return
  }

  if (board.value.every(c => c !== '')) {
    return
  }

  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}

// PUBLIC_INTERFACE
function checkWinner(b: Board): { winPlayer: Player | ''; line: number[] | null } {
  /**
   * Determine the winner for a given board state.
   * Returns the winning player and the winning line indices if any.
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diagonals
  ]
  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { winPlayer: b[a] as Player, line: [a, c, d] }
    }
  }
  return { winPlayer: '', line: null }
}

// PUBLIC_INTERFACE
function playerColor(p: Player): string {
  /**
   * Get themed color for the provided player.
   */
  return p === 'X' ? '#2563EB' : '#F59E0B'
}
</script>

<style>
/* Minimal base styles for Ocean Professional theme without external deps */
:root {
  --color-primary: #2563EB;   /* blue-600 */
  --color-secondary: #F59E0B; /* amber-500 */
  --color-surface: #ffffff;
  --color-bg: #f9fafb;
  --color-text: #111827;
  --color-error: #EF4444;
}

html, body, #__nuxt, #__layout {
  height: 100%;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

.container {
  max-width: 1024px;
}

/* Utility-like classes used in template to avoid Tailwind dependency */
.min-h-screen { min-height: 100vh; }
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, rgba(59,130,246,0.06), #f9fafb);
}
.from-blue-50 { }
.to-gray-50 { }
.text-gray-900 { color: #111827; }
.text-gray-800 { color: #1f2937; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-white { color: #fff; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.font-bold { font-weight: 700; }
.tracking-tight { letter-spacing: -0.015em; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.mb-5 { margin-bottom: 1.25rem; }
.mb-6 { margin-bottom: 1.5rem; }
.space-y-2 > * + * { margin-top: 0.5rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-3 { gap: 0.75rem; }
.w-full { width: 100%; }
.max-w-md { max-width: 28rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-md { border-radius: 0.375rem; }
.ring-1 { box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.05) inset; }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.08); }
.bg-white\/90 { background-color: rgba(255, 255, 255, 0.9); }
.backdrop-blur-md { backdrop-filter: blur(12px); }
.transition-all { transition: all 200ms ease; }
.duration-300 { transition-duration: 300ms; }
.inline-flex { display: inline-flex; }
.h-3 { height: 0.75rem; }
.w-3 { width: 0.75rem; }
.rounded-full { border-radius: 9999px; }
.border { border-width: 1px; }
.border-blue-200 { border-color: rgba(191, 219, 254, 1); }
.border-amber-200 { border-color: rgba(254, 215, 170, 1); }
.mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
</style>
