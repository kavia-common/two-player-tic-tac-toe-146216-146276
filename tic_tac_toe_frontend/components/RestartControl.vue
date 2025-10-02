<template>
  <button
    class="btn"
    type="button"
    @click="$emit('restart')"
    aria-label="Restart game"
  >
    <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 15.55-5.95" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      <path d="M21 3v6h-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21 12a9 9 0 0 1-17 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
    <span class="label">Restart</span>
  </button>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'restart'): void }>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(37, 99, 235, 0.25);
  color: #2563EB;
  background: linear-gradient(145deg, rgba(37, 99, 235, 0.08), rgba(255,255,255,0.95));
  box-shadow:
    0 4px 10px rgba(37, 99, 235, 0.12),
    inset 0 1px 0 rgba(255,255,255,0.7);
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
}

.btn:hover {
  transform: translateY(-1px);
  background: linear-gradient(145deg, rgba(245, 158, 11, 0.10), rgba(255,255,255,0.98));
  color: #1e40af; /* darker blue for contrast on hover */
  border-color: rgba(245, 158, 11, 0.35);
  box-shadow:
    0 8px 16px rgba(245, 158, 11, 0.18),
    inset 0 1px 0 rgba(255,255,255,0.75);
}

.icon {
  width: 18px;
  height: 18px;
}

.label {
  font-weight: 600;
  letter-spacing: 0.01em;
}
</style>
