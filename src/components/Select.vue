<template>
    <div class="select">
        <label :for="`${name}-select`">{{ name }}</label>
        <select :name="`${name}`" :id="`${name}-select`">
            <option v-for="level in selectLevels" :value="level" :key="level">
                {{ level }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
const selectLevels = ref(0)
import { ref } from 'vue'
import { getGameLevel } from '../store/store'
const { levels } = getGameLevel()
selectLevels.value = levels
</script>

<style scoped>
.select {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
}
</style>
