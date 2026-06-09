<template>
    <div class="select">
        <label :for="`${name}-select`">{{ name }}</label>
        <select
            :name="`${name}`"
            :id="`${name}-select`"
            :value="currentValue"
            @change="selectHandler($event, name)"
        >
            <option v-for="option in optionsList" :value="option" :key="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { allData, roundStore, levelStore } from '../store/store'
import { getDataLevel } from '../utils/getDataLevel'

const props = defineProps<{ name: string }>()
const { data } = allData()

const levelsStore = levelStore()
const roundsStore = roundStore()

const currentValue = computed(() => {
    if (props.name === 'Level') {
        return levelsStore.getCurLevel || 1
    }

    if (props.name === 'Round') {
        return roundsStore.getCurRound || 1
    }

    return 1
})

const optionsList = computed(() => {
    if (props.name === 'Level') {
        return Array.from({ length: levelsStore.getAllLevels }, (_, i) => i + 1)
    }

    if (props.name === 'Round') {
        return Array.from({ length: roundsStore.getAllRounds }, (_, i) => i + 1)
    }
})

onMounted(async () => {
    const { round, level, allRounds } = JSON.parse(
        localStorage.getItem('puzzle_noisekov') || '{}'
    )

    if (props.name === 'Level') {
        if (level) {
            levelsStore.setCurLevel(level)
        }

        levelsStore.setAllLevels(data.length)
    }

    if (props.name === 'Round') {
        if (round) {
            roundsStore.setCurRound(round)
            roundsStore.setAllRounds(allRounds)

            return
        }

        const roundData = await fetch(data[0].download_url)
        const { roundsCount } = await roundData.json()

        roundsStore.setAllRounds(+roundsCount)
    }
})

const selectHandler = async (evt: Event, name: string) => {
    const select = evt.target

    if (!(select instanceof HTMLSelectElement)) return

    if (name === 'Level') {
        const ROUND_ONE_IF_CHANGE_LEVEL = 1
        const { download_url: urlAboutLevel } = await getDataLevel(select.value)
        const levelData = await fetch(urlAboutLevel)
        const { roundsCount } = await levelData.json()
        localStorage.setItem(
            'puzzle_noisekov',
            JSON.stringify(
                Object.assign(
                    JSON.parse(localStorage.getItem('puzzle_noisekov') || '{}'),
                    {
                        level: select.value,
                        round: ROUND_ONE_IF_CHANGE_LEVEL,
                        allRounds: roundsCount,
                    }
                )
            )
        )

        levelStore().setCurLevel(+select.value)
        roundStore().setAllRounds(+roundsCount)
        roundStore().setCurRound(ROUND_ONE_IF_CHANGE_LEVEL)
    }

    if (name === 'Round') {
        const { download_url: urlAboutLevel } = await getDataLevel(
            String(levelStore().getCurLevel)
        )
        const levelData = await fetch(urlAboutLevel)
        const { roundsCount } = await levelData.json()
        localStorage.setItem(
            'puzzle_noisekov',
            JSON.stringify(
                Object.assign(
                    JSON.parse(localStorage.getItem('puzzle_noisekov') || '{}'),
                    {
                        level: levelStore().getCurLevel,
                        round: select.value,
                        allRounds: roundsCount,
                    }
                )
            )
        )

        roundStore().setCurRound(+select.value)
    }
}
</script>

<style scoped>
.select {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
}
</style>
