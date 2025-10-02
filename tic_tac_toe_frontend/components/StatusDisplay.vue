<template>
  <div class="status-wrapper" role="status" aria-live="polite">
    <div v-if="winner" class="status-card winner" :style="{ borderColor: colorFor(winner) }">
      <div class="dot" :style="{ backgroundColor: colorFor(winner) }" />
      <p class="label">Winner</p>
      <p class="value" :style="{ color: colorFor(winner) }">{{ winner }}</p>
    </div>

    <div v-else-if="isDraw" class="status-card draw">
      <div class="dot draw-dot" />
      <p class="label">Result</p>
      <p class="value draw-text">Draw</p>
    </div>

    <div v-else class="status-card turn" :style="{ borderColor: colorFor(currentPlayer) }">
      <div class="dot" :style="{ backgroundColor: colorFor(currentPlayer) }" />
      <p class="label">Current turn</p>
      <p class="value" :style="{ color: colorFor(currentPlayer) }">{{ currentPlayer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
type Player = 'X' | 'O'

const props = defineProps<{
  currentPlayer: Player
  winner: Player | ''
  isDraw: boolean
}>()

// PUBLIC_INTERFACE
function colorFor(p: Player | ''): string {
  /** Map to theme colors for status accents */
  if (p === 'X') return '#2563EB'
  if (p === 'O') return '#F59E0B'
  return '#6b7280'
}
</script>

<style scoped>
.status-wrapper {
  display: grid;
  place-items: center;
}

.status-card {
  display: inline-grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(17, 24, 39, 0.06);
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255,255,255,0.6);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.status-card:hover {
  transform: translateY(-1px);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255,255,255,0.7);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
}

.draw-dot {
  background: linear-gradient(90deg, #2563EB, #F59E0B);
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.08);
}

.label {
  font-size: 0.75rem;
  color: #4b5563;
  margin: 0;
}

.value {
  font-weight: 800;
  font-size: 1.125rem;
  letter-spacing: 0.02em;
  margin: 0;
}

.draw {
  border-color: rgba(107, 114, 128, 0.25);
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.06), rgba(245, 158, 11, 0.06));
}

.draw-text {
  background: linear-gradient(90deg, #2563EB, #F59E0B);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.winner, .turn {
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.05), rgba(255, 255, 255, 0.95));
}
</style>
