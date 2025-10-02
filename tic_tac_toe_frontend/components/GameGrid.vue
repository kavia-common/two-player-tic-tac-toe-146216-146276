<template>
  <div
    class="grid-container"
    role="grid"
    aria-label="Tic Tac Toe board"
  >
    <button
      v-for="(cell, idx) in board"
      :key="idx"
      class="cell"
      :class="cellClasses(idx, cell)"
      role="gridcell"
      :aria-label="ariaLabel(idx, cell)"
      @click="$emit('cellClick', idx)"
    >
      <span class="mark" :style="{ color: markColor(cell) }">
        {{ cell }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Player = 'X' | 'O'
type Cell = Player | ''

const props = defineProps<{
  board: Cell[],
  winner: Player | '',
  winningLine: number[] | null,
}>()

const emit = defineEmits<{
  (e: 'cellClick', idx: number): void
}>()

// PUBLIC_INTERFACE
function markColor(cell: Cell): string {
  /** Map cell to themed color */
  if (cell === 'X') return '#2563EB'
  if (cell === 'O') return '#F59E0B'
  return 'transparent'
}

// PUBLIC_INTERFACE
function ariaLabel(idx: number, cell: Cell): string {
  /** Accessible label per grid cell */
  const r = Math.floor(idx / 3) + 1
  const c = (idx % 3) + 1
  return `Row ${r} Column ${c}${cell ? `, ${cell}` : ''}`
}

// PUBLIC_INTERFACE
function cellClasses(idx: number, cell: Cell): Record<string, boolean> {
  /** Classes for cell state and winning highlight */
  const isWinning = props.winningLine?.includes(idx) ?? false
  return {
    filled: !!cell,
    winning: isWinning,
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 360px;
  margin-inline: auto;
}

.cell {
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.06), rgba(255,255,255,0.9));
  box-shadow:
    0 2px 6px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.6);
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.cell:hover {
  transform: translateY(-1px);
  box-shadow:
    0 6px 12px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.7);
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.08), rgba(255,255,255,0.95));
}

.cell.filled {
  cursor: default;
}

.cell.winning {
  outline: 2px solid rgba(37, 99, 235, 0.35);
  box-shadow:
    0 10px 18px rgba(37, 99, 235, 0.15),
    inset 0 1px 0 rgba(255,255,255,0.8);
  background: linear-gradient(145deg, rgba(245, 158, 11, 0.10), rgba(255,255,255,1));
}

.mark {
  font-weight: 800;
  font-size: clamp(2.25rem, 12vw, 3rem);
  line-height: 1;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.8),
    0 4px 12px rgba(0,0,0,0.06);
  transition: color 180ms ease, transform 180ms ease;
  transform: translateZ(0);
}

.cell:hover .mark {
  transform: scale(1.04);
}
</style>
