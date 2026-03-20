<template>
  <div class="scroll-wrapper" :style="{ maxHeight: height }">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  // 💡 親が知るべきなのは「自分の高さ」だけです。子のデータ(srcなど)はここには書きません！
  height: {
    type: String,
    default: '400px'
  }
})
</script>

<style scoped>
.scroll-wrapper {
  overflow-y: auto;
  padding-right: 12px; /* スクロールバーと中身が被らないように余白をあける */
}

/* 👇おまけ：スクロールバーをモダンで細いデザインにするCSS */
.scroll-wrapper::-webkit-scrollbar {
  width: 8px;
}
.scroll-wrapper::-webkit-scrollbar-track {
  background: transparent;
}
.scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
html.dark .scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.8);
}
</style>