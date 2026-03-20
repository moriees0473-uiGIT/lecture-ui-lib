<template>
  <div class="settings-panel">
    <h2>⚙️ Settings</h2>

    <div class="setting-item">
      <label>Theme:</label>
      <select v-model="settings.theme" @change="applyTheme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>

    <div class="setting-item">
      <label>JP Voice:</label>
      <select v-model="settings.jpVoiceURI">
        <option v-for="v in jpVoices" :key="v.voiceURI" :value="v.voiceURI">
          {{ v.name }}
        </option>
      </select>
    </div>

    <div class="setting-item">
      <label>JP Speed:</label>
      <select v-model="settings.jpSpeed">
        <option :value="0.7">Slow (0.7x)</option>
        <option :value="1.0">Normal (1.0x)</option>
        <option :value="1.3">Fast (1.3x)</option>
      </select>
    </div>

    <div class="setting-item">
      <label>EN Voice:</label>
      <select v-model="settings.enVoiceURI">
        <option v-for="v in enVoices" :key="v.voiceURI" :value="v.voiceURI">
          {{ v.name }}
        </option>
      </select>
    </div>

    <div class="setting-item">
      <label>EN Speed:</label>
      <select v-model="settings.enSpeed">
        <option :value="0.7">Slow (0.7x)</option>
        <option :value="1.0">Normal (1.0x)</option>
        <option :value="1.3">Fast (1.3x)</option>
      </select>
    </div>
    
    <div class="preview">
      <button @click="testAudio">🔊 Test Audio</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import { globalSettings } from '../composables/useSettings'

const settings = globalSettings
const jpVoices = ref([])
const enVoices = ref([])

const colorMode = useColorMode()
function applyTheme() {
  if(settings.value.theme === 'system') colorMode.value = 'auto'
  else colorMode.value = settings.value.theme
}

function loadVoices() {
  const voices = speechSynthesis.getVoices()
  jpVoices.value = voices.filter(v => v.lang.includes('ja'))
  enVoices.value = voices.filter(v => v.lang.includes('en'))
  
  if (!settings.value.jpVoiceURI && jpVoices.value.length > 0) {
    settings.value.jpVoiceURI = jpVoices.value[0].voiceURI
  }
  if (!settings.value.enVoiceURI && enVoices.value.length > 0) {
    settings.value.enVoiceURI = enVoices.value[0].voiceURI
  }
}

onMounted(() => {
  loadVoices()
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices
  }
  applyTheme()
})

function testAudio() {
  const uJp = new SpeechSynthesisUtterance("音声テストです。")
  if(settings.value.jpVoiceURI) uJp.voice = speechSynthesis.getVoices().find(v => v.voiceURI === settings.value.jpVoiceURI)
  uJp.rate = settings.value.jpSpeed
  speechSynthesis.speak(uJp)

  const uEn = new SpeechSynthesisUtterance("This is an audio test.")
  if(settings.value.enVoiceURI) uEn.voice = speechSynthesis.getVoices().find(v => v.voiceURI === settings.value.enVoiceURI)
  uEn.rate = settings.value.enSpeed
  speechSynthesis.speak(uEn)
}
</script>

<style scoped>
.settings-panel {
  background: #f9fafb;
  color: #333; /* 明るいテーマの文字色 */
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 12px;
  max-width: 550px;
  margin: 0 auto;
}
/* ダークモード時の全体カラー */
html.dark .settings-panel {
  background: #1e1e1e;
  color: #f5f5f5;
  border-color: #444;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 15px; /* 文字サイズを少し小さく */
}

select {
  padding: 6px 10px;
  font-size: 14px; /* ドロップダウンの文字も小さく */
  border-radius: 6px;
  min-width: 220px;
  background: #fff;
  color: #333; /* 明るいテーマのプルダウン文字色 */
  border: 1px solid #ccc;
  cursor: pointer;
}
/* ダークモード時のドロップダウンカラー */
html.dark select {
  background: #333;
  color: #f5f5f5;
  border-color: #555;
}

.preview {
  margin-top: 24px;
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 15px; /* ボタンの文字も小さく */
  background: #60a5fa;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: #3b82f6;
}
h2 {
  margin-top: -12px; /* マイナス値で上に引っ張り上げる（数字で微調整できます） */
  margin-bottom: 20px;
}
</style>