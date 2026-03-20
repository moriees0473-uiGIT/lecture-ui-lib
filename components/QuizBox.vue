<template>
  <div class="quiz-box">
    <div v-if="loading" class="message">⏳ クイズを読み込み中...</div>
    <div v-else-if="error" class="message error">❌ {{ error }}</div>
    
    <div v-else-if="questions.length > 0 && !isFinished" class="quiz-content">
      <div class="quiz-header">
        <span class="badge">Question {{ currentIndex + 1 }} / {{ questions.length }}</span>
        <span class="score">Score: {{ score }}</span>
      </div>

      <h3 class="question-text">{{ currentQ.question }}</h3>

      <div class="options-list">
        <button 
          v-for="(opt, index) in currentQ.options" 
          :key="index"
          class="option-btn"
          :class="{ 
            'selected': selectedAnswer === index,
            'correct-anim': isAnswered && index === currentQ.answer,
            'wrong-anim': isAnswered && selectedAnswer === index && index !== currentQ.answer
          }"
          @click.stop="selectOption(index)"
          :disabled="isAnswered"
        >
          <span class="opt-number">{{ index + 1 }}.</span> {{ opt }}
        </button>
      </div>

      <div v-if="isAnswered" class="explanation-area">
        <div class="result-badge" :class="isCorrect ? 'correct' : 'wrong'">
          {{ isCorrect ? '⭕ 正解！ (Correct)' : '❌ 不正解... (Wrong)' }}
        </div>
        <p class="explanation-text">{{ currentQ.explanation }}</p>
        <button class="next-btn" @click.stop="nextQuestion">
          {{ isLastQuestion ? '結果を見る (Show Results)' : '次の問題へ (Next) ➡️' }}
        </button>
      </div>
      
      <div v-else class="action-area">
        <button 
          class="submit-btn" 
          :disabled="selectedAnswer === null"
          @click.stop="checkAnswer"
        >
          回答する (Submit)
        </button>
      </div>
    </div>

    <div v-else-if="isFinished" class="result-screen">
      <h2>🎉 クイズ終了！ (Quiz Finished)</h2>
      <div class="final-score">
        {{ score }} / {{ questions.length }} Correct
      </div>
      <button class="retry-btn" @click.stop="retryQuiz">もう一度挑戦する (Retry) 🔄</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

// 状態管理
const questions = ref([])
const loading = ref(true)
const error = ref(null)

const currentIndex = ref(0)
const selectedAnswer = ref(null)
const isAnswered = ref(false)
const score = ref(0)
const isFinished = ref(false)

// 現在の問題を取得する算出プロパティ
const currentQ = computed(() => questions.value[currentIndex.value] || {})
const isCorrect = computed(() => selectedAnswer.value === currentQ.value.answer)
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)

// JSONファイルの読み込み処理
onMounted(async () => {
  try {
    const response = await fetch(props.src)
    if (!response.ok) throw new Error(`データの取得に失敗しました: ${response.status}`)
    const data = await response.json()
    questions.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

// 選択肢のクリック
function selectOption(index) {
  if (isAnswered.value) return
  selectedAnswer.value = index
}

// 回答のチェック
function checkAnswer() {
  if (selectedAnswer.value === null) return
  isAnswered.value = true
  if (isCorrect.value) {
    score.value++
  }
}

// 次の問題へ
function nextQuestion() {
  if (isLastQuestion.value) {
    isFinished.value = true
  } else {
    currentIndex.value++
    selectedAnswer.value = null
    isAnswered.value = false
  }
}

// リトライ処理
function retryQuiz() {
  currentIndex.value = 0
  selectedAnswer.value = null
  isAnswered.value = false
  score.value = 0
  isFinished.value = false
}
</script>

<style scoped>
.quiz-box {
  background: var(--slidev-theme-surface, #ffffff);
  border: 2px solid var(--slidev-theme-border, #e5e7eb);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin: 20px 0;
}

html.dark .quiz-box {
  background: #1e1e1e;
  border-color: #444;
}

.message { text-align: center; font-size: 1.2rem; padding: 20px; }
.error { color: #ef4444; }

.quiz-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
}

.badge {
  background: #3b82f6;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.question-text {
  font-size: 1.4rem;
  margin-bottom: 24px;
  line-height: 1.4;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  text-align: left;
  padding: 12px 20px;
  font-size: 1.1rem;
  background: var(--slidev-theme-background, #f9fafb);
  border: 2px solid var(--slidev-theme-border, #d1d5db);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: inherit;
}

html.dark .option-btn {
  background: #2a2a2a;
  border-color: #555;
}

.option-btn:hover:not(:disabled) {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.option-btn.selected {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.2);
}

.option-btn.correct-anim {
  background: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
}

.option-btn.wrong-anim {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
}

.action-area, .explanation-area {
  margin-top: 24px;
  text-align: center;
}

.submit-btn, .next-btn, .retry-btn {
  padding: 12px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.result-badge {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.result-badge.correct { background: rgba(34, 197, 94, 0.2); color: #16a34a; }
.result-badge.wrong { background: rgba(239, 68, 68, 0.2); color: #dc2626; }
html.dark .result-badge.correct { color: #4ade80; }
html.dark .result-badge.wrong { color: #f87171; }

.explanation-text {
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: left;
  line-height: 1.6;
}

.result-screen {
  text-align: center;
  padding: 40px 0;
}

.final-score {
  font-size: 3rem;
  font-weight: bold;
  color: #3b82f6;
  margin: 20px 0;
}
</style>