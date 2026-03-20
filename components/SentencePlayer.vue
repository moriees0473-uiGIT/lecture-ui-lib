<template>
  <div class="sentence">

    <div class="row" v-if="displayJp">
      <button class="speaker" @click="speakJP">🔊</button>
      <span v-html="jpHtml"></span>
    </div>

    <div class="row" v-if="en">
      <button class="speaker" @click="speakEN">🔊</button>
      <span class="en">{{ en }}</span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { globalSettings } from '../composables/useSettings.js'

const props = defineProps({
  jp: String,
  en: String,
  text: String // 990_docker_manual.md の "text" にも対応！
})

// jp がなければ text を使う。どちらもなければ空文字にする
const displayJp = computed(() => props.jp || props.text || "")

function speakJP(){
  const str = displayJp.value;
  if (!str) return;
  
  const rawText = String(str).replace(/\[.*?\]/g,"")
  const u = new SpeechSynthesisUtterance(rawText)

  // 設定画面の「声」を適用
  if(globalSettings.value.jpVoiceURI) {
    const voices = speechSynthesis.getVoices()
    u.voice = voices.find(v => v.voiceURI === globalSettings.value.jpVoiceURI)
  } else {
    u.lang = "ja-JP"
  }
  
  // 設定画面の「速さ」を適用
  u.rate = globalSettings.value.jpSpeed || 1.0

  speechSynthesis.speak(u)
}

function speakEN(){
  if(!props.en) return
  const u = new SpeechSynthesisUtterance(props.en)

  // 設定画面の「声」を適用
  if(globalSettings.value.enVoiceURI) {
    const voices = speechSynthesis.getVoices()
    u.voice = voices.find(v => v.voiceURI === globalSettings.value.enVoiceURI)
  } else {
    u.lang = "en-US"
  }
  
  // 設定画面の「速さ」を適用
  u.rate = globalSettings.value.enSpeed || 1.0

  speechSynthesis.speak(u)
}

const jpHtml = computed(() => {
  const str = displayJp.value;
  // 💥クラッシュ防止ガード：データが無い、または文字列でない場合は空文字を返す
  if (!str || typeof str !== 'string') return ""; 
  
  return str
    .replace(/\[n\](.*?)\[\/n\]/g,'<span class="noun">$1</span>')
    .replace(/\[v\](.*?)\[\/v\]/g,'<span class="verb">$1</span>')
})
</script>

<style scoped>

.sentence{
  font-size:28px;
  line-height:1.8;
  margin-bottom: 15px; /* 少し余白を追加 */
}

.row{
  display:flex;
  align-items:center;
  gap:12px;
}

.speaker{
  font-size:22px;
  background:none;
  border:none;
  cursor:pointer;
  transition: transform 0.1s; /* マウスホバー用のアニメーション */
}

/* マウスを乗せたらアイコンが少し大きくなるおまけ */
.speaker:hover {
  transform: scale(1.15);
}

.noun{
  color:#60a5fa;
}

.verb{
  color:#f87171;
}

.en{
  color:#888;
}

</style>