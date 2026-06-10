<script lang="ts" setup>
import HeaderGamePage from '../components/HeaderGamePage.vue'
import { log } from '../utils/utils'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import {
    allData,
    roundDataStore,
    roundStore,
    wordsCurRound,
    sentenceCurGuess,
} from '../store/store'

const loading = ref(false)
const error = ref(null)
const levels = ref(null)
const mainData = allData()
const roundData = roundDataStore()
const roundNumber = roundStore()
const wordsStore = wordsCurRound()
const sentenceGuess = sentenceCurGuess()

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData() {
    error.value = levels.value = null
    loading.value = true
    const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
    try {
        const response = await fetch(
            `https://api.github.com/repos/rolling-scopes-school/rss-puzzle-data/contents/data/`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
        const data = await response.json()
        mainData.setData(data)
        levels.value = data.length
    } catch (err) {
        error.value = err.toString()
    } finally {
        loading.value = false
    }
}

watch(
    () => roundData.getRoundData,
    (roundData) => {
        if (roundData) {
            const { rounds } = roundData
            const numberOfRounds = roundNumber.getCurRound - 1
            const { levelData, words } = rounds[numberOfRounds]
            wordsStore.setWords(words)
            sentenceGuess.setSentenceRu(words[0].textExampleTranslate)
            sentenceGuess.setSentenceEn(words[0].textExample)
            console.log(levelData)
            console.log(words)
        }
    }
)

const sentenceMixed = computed(() => {
    const sentenceEn = sentenceGuess.getSentenceEn

    if (!sentenceEn) return []

    return sentenceEn.split(' ').sort(() => Math.random() - 0.5)
})
</script>

<template>
    <div class="container">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="wrapper" v-if="levels">
            <HeaderGamePage />
            <div class="translate">
                <button
                    type="button"
                    class="translate__btn"
                    @click="log('play_translate')"
                ></button>
                <p class="translate__text">
                    {{ sentenceGuess.getSentenceRu }}
                </p>
            </div>
            <div class="game">
                <div class="answer">
                    <span
                        v-for="word in sentenceMixed"
                        :key="word"
                        class="puzzle"
                    >
                        {{ word }}
                    </span>
                </div>
            </div>
            <div class="btns">
                <button type="button" class="btn" @click="log(`I don't know`)">
                    I don't know
                </button>
                <!-- <button type="button" class="btn" @click="log('Check')">
                    Check
                </button> -->
                <!-- <button type="button" class="btn" @click="log('Continue')">
                    Continue
                </button>
                <button type="button" class="btn" @click="log('Results')">
                    Results
                </button> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
}

.game {
    width: 100%;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: auto;
    background-color: #333;
    padding: 1rem;
}

.btns {
    display: flex;
    flex-direction: row;
    padding: 0.5em 1em;
    gap: 1rem;
}

.btn {
    padding: 0.5em 1em;
    border-radius: 0.5em;
    border: none;
    background-color: #6a4645;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(1.05);
    }
}

.translate {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 0.5rem 0;
}

.translate__text {
    margin: 0;
}

.translate__btn {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    width: 1.5em;
    height: 1.5em;
    background-image: url(/src/assets/volume.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: invert(1);
}

.answer {
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    box-shadow: #fff 0px 0px 5px 0px;
    width: 100%;
    margin: 0 0 0.5rem 0;
}

.puzzle {
    position: relative;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: #ffc107;
    cursor: pointer;
    user-select: none;
    margin: 0 1px 0 0;
    color: black;
}
.puzzle::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: #333;
    border-radius: 50%;
    z-index: 1;
}

.puzzle::after {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: #ffc107;
    border-radius: 50%;
    z-index: 2;
}
</style>
