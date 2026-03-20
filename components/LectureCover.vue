<script setup>

const props = defineProps({
  title: {
    type: String,
    default: 'Lecture Title'
  },
  description: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="relative h-full w-full flex flex-col justify-center px-12 py-10">
    <div class="absolute top-6 right-6">
      <Link to="2" class="border-none text-3xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <carbon:settings />
      </Link>
    </div>

    <div class="max-w-3xl">
      <h1 class="text-5xl font-bold mb-4 text-primary">
        {{ title }}
      </h1>
      
      <p v-if="description" class="text-xl opacity-80 mb-8 leading-relaxed">
        {{ description }}
      </p>

      <ul v-if="items.length" class="space-y-3">
        <li v-for="(item, index) in items" :key="index" class="flex items-center text-lg">
          <span class="mr-3 text-primary">●</span>
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--slidev-theme-primary);
}
</style>