<script setup>
const props = defineProps({
  title: { type: String, default: 'Lecture Title' },
  description: { type: String, default: '' },
  items: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="relative h-full w-full flex flex-col justify-center px-12 py-10 bg-[#001529] text-white">
    
    <div class="absolute top-6 right-6">
      <Link to="setting" class="border-none text-2xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-white">
        <carbon:settings />
      </Link>
    </div>

    <div class="max-w-3xl">
      <h1 class="text-5xl font-bold mb-4 text-white">{{ title }}</h1>
      <p v-if="description" class="text-xl opacity-80 mb-8 leading-relaxed">{{ description }}</p>
      <ul v-if="items.length" class="space-y-3">
        <li v-for="(item, index) in items" :key="index" class="flex items-center text-lg">
          <span class="mr-3 text-blue-400">●</span>
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>