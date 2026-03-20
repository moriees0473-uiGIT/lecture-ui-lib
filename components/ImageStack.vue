<template>

<div class="image-panel">

<img :src="src">

<div class="caption">
{{ caption }}
</div>

</div>

</template>

<script setup>

const props = defineProps({
src:String,
caption:String
})

</script>

<style scoped>

.image-panel{
text-align:center;
margin-top:30px;
}

img{
max-width:900px;
border-radius:8px;
}

.caption{
margin-top:10px;
color:#aaa;
font-size:20px;
}

</style>