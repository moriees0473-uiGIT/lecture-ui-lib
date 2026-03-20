import { useStorage } from '@vueuse/core'

// useStorageを使うことで、ブラウザのlocalStorageに自動保存・復元されます
// 第1引数は保存キー名、第2引数は初期値です
export const globalSettings = useStorage('lecture-slidev-settings', {
  theme: 'system', // 'light', 'dark', 'system' のいずれか
  jpVoiceURI: '',  // 選択された日本語音声のID
  jpSpeed: 1.0,    // 日本語の速さ
  enVoiceURI: '',  // 選択された英語音声のID
  enSpeed: 1.0     // 英語の速さ
})