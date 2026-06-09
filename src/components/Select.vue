<template>
    <div class="select">
        <label :for="`${name}-select`">{{ name }}</label>
        <select
            :name="`${name}`"
            :id="`${name}-select`"
            :value="currentValue"
            @change="handlePage($event, name)"
        >
            <option v-for="option in optionsList" :value="option" :key="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { allData, pageStore, levelStore } from '../store/store'
import { getDataLevel } from '../utils/getDataLevel'

const props = defineProps<{ name: string }>()
const { data } = allData()

const levelsStore = levelStore()
const pagesStore = pageStore()

const currentValue = computed(() => {
    if (props.name === 'Level') {
        return levelsStore.getCurLevel || 1
    }

    if (props.name === 'Page') {
        return pagesStore.getCurPage || 1
    }

    return 1
})

const optionsList = computed(() => {
    if (props.name === 'Level') {
        return Array.from({ length: levelsStore.getAllLevels }, (_, i) => i + 1)
    }

    if (props.name === 'Page') {
        return Array.from({ length: pagesStore.getAllPages }, (_, i) => i + 1)
    }
})

onMounted(async () => {
    const { page, level, allPages } = JSON.parse(
        localStorage.getItem('puzzle_noisekov') || '{}'
    )

    if (props.name === 'Level') {
        if (level) {
            levelsStore.setCurLevel(level)
        }

        levelsStore.setAllLevels(data.length)
    }

    if (props.name === 'Page') {
        if (page) {
            pagesStore.setCurPage(page)
            pagesStore.setAllPages(allPages)

            return
        }

        const pageData = await fetch(data[0].download_url)
        const { roundsCount } = await pageData.json()

        pagesStore.setAllPages(+roundsCount)
    }
})

const handlePage = async (evt: Event, name: string) => {
    const select = evt.target

    if (!(select instanceof HTMLSelectElement)) return

    if (name === 'Level') {
        const PAGE_ONE_IF_CHANGE_LEVEL = 1
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
                        page: PAGE_ONE_IF_CHANGE_LEVEL,
                        allPages: roundsCount,
                    }
                )
            )
        )

        levelStore().setCurLevel(+select.value)
        pageStore().setAllPages(+roundsCount)
        pageStore().setCurPage(PAGE_ONE_IF_CHANGE_LEVEL)
    }

    if (name === 'Page') {
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
                        page: select.value,
                        allPages: roundsCount,
                    }
                )
            )
        )

        pageStore().setCurPage(+select.value)
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
