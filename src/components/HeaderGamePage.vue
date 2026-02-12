
<script setup="ts">
    import Select from './Select.vue';
</script>

<template>
    <div class="selects">
        <Select name="Level"/>
        <Select name="Page"/>
    </div>
</template>


<style scoped>
.selects {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>