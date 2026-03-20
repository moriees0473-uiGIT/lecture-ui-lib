<template>
  <div class="portal-grid">
    <div class="card" @click="goTo(fePage)">
      <div class="icon">📘</div>
      <div class="info">
        <h3>基本情報 (FE)</h3>
        <p>アルゴリズムとデータ構造</p>
      </div>
    </div>

    <div class="card" @click="goTo(javaPage)">
      <div class="icon">☕</div>
      <div class="info">
        <h3>Java プログラミング</h3>
        <p>オブジェクト指向の基礎</p>
      </div>
    </div>

    <div class="card" @click="goTo(dockerPage)">
      <div class="icon">🐳</div>
      <div class="info">
        <h3>Docker 実習</h3>
        <p>コンテナの起動と操作</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 変更前：数字で管理（ページが増えるとズレて壊れる）
// const fePage = 3
// const dockerPage = 6

// 変更後：名前（エイリアス）で管理（絶対にズレない）
const fePage = 'fe-start'
const javaPage = 'java-start' // ※Java用ファイルを作った時用
const dockerPage = 'docker-start'

const router = useRouter()

function goTo(targetName) {
  // 数字の場合は '/3'、名前の場合は '/fe-start' というURLに飛ぶ処理
  router.push(`/${targetName}`)
}
</script>

<style scoped>
.portal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.card {
  display: flex;
  align-items: center;
  background: #2a2a2a; /* ダークテーマ寄りの背景 */
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  border: 1px solid #444;
}

.card:hover {
  transform: translateY(-5px);
  background: #3a3a3a;
  border-color: #60a5fa;
}

.icon {
  font-size: 40px;
  margin-right: 20px;
}

.info h3 {
  margin: 0;
  font-size: 24px;
  color: #fff;
}

.info p {
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #aaa;
}
</style>