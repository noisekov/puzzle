<template>
    <div class="select">
        <label :for="`${name}-select`">{{ name }}</label>
        <select
            :name="`${name}`"
            :id="`${name}-select`"
            @change="handlePage($event)"
        >
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
import { allData } from '../store/store'
const { data } = allData()
selectLevels.value = data.length

const handlePage = (evt: Event) => {
    const select = evt.target

    if (!(select instanceof HTMLSelectElement)) return

    console.log(select.value)
}
</script>

<style scoped>
.select {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
}
</style>
