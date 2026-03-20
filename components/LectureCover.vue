<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  items: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="h-full flex flex-col justify-center px-12 py-8 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
    <header class="mb-8 border-b-4 border-blue-500 pb-4">
      <h1 class="text-5xl font-bold text-slate-800 dark:text-white leading-tight">
        {{ title }}
      </h1>
    </header>

    <div v-if="description" class="mb-8">
      <p class="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <div v-if="items.length > 0" class="bg-white/50 dark:bg-slate-700/50 p-6 rounded-xl shadow-sm">
      <h2 class="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
        Learning Points
      </h2>
      <ul class="space-y-2">
        <li v-for="(item, index) in items" :key="index" class="flex items-start text-lg text-slate-700 dark:text-slate-200">
          <span class="text-blue-500 mr-3">✔</span>
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>