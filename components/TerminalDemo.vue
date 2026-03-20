<template>
<div class="terminal">

<div class="bar">
<span class="dot red"></span>
<span class="dot yellow"></span>
<span class="dot green"></span>
</div>

<pre>{{ cmd }}</pre>

</div>
</template>

<script setup>

const props = defineProps({
  cmd:String
})

</script>

<style scoped>

.terminal{
background:#111;
color:#00ff88;
padding:20px;
border-radius:10px;
font-family:monospace;
font-size:22px;
}

.bar{
margin-bottom:10px;
}

.dot{
display:inline-block;
width:12px;
height:12px;
border-radius:50%;
margin-right:5px;
}

.red{background:#ff5f56;}
.yellow{background:#ffbd2e;}
.green{background:#27c93f;}

</style>