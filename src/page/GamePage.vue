<script lang="ts" setup>
import HeaderGamePage from '../components/HeaderGamePage.vue'
import { log } from '../utils/utils'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import {
    allData,
    roundDataStore,
    roundStore,
    wordsCurRound,
    sentenceCurGuess,
    image,
    levelStore,
    dragWord,
    roundCurWordNeedGuessIdx,
} from '../store/store'

const loading = ref(false)
const error = ref(null)
const levels = ref(null)
const mainData = allData()
const roundData = roundDataStore()
const roundNumber = roundStore()
const wordsStore = wordsCurRound()
const sentenceGuess = sentenceCurGuess()
const imageStore = image()
const curLevelStore = levelStore()
const dragWordStore = dragWord()
const roundCurWordNeedGuessIdxStore = roundCurWordNeedGuessIdx()
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData() {
    error.value = levels.value = null
    loading.value = true
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

const mixedWords = ref<string[]>([])

watch(
    [() => roundData.getRoundData, () => roundNumber.getCurRound],
    async ([roundData, roundStore]) => {
        if (roundData || roundStore) {
            const { rounds } = roundData
            const numberOfRounds = roundNumber.getCurRound - 1
            const { levelData, words } = rounds[numberOfRounds]
            wordsStore.setWords(words)
            sentenceGuess.setSentenceRu(
                words[roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx]
                    .textExampleTranslate
            )
            sentenceGuess.setSentenceEn(
                words[roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx]
                    .textExample
            )
            const wordsArray =
                words[
                    roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx
                ].textExample.split(' ')
            mixedWords.value = wordsArray.sort(() => Math.random() - 0.5)

            answerFields.value = words.map((wordObj) => {
                const wordCount = wordObj.textExample.split(' ').length
                return Array(wordCount).fill(null)
            })

            console.log(levelData)
            console.log(words)

            const responseImg = await fetch(
                `https://api.github.com/repos/rolling-scopes-school/rss-puzzle-data/contents/images/level${curLevelStore.getCurLevel}/cut/`,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            const dataImg = await responseImg.json()
            const { download_url: imageSrc } = dataImg.find(
                (item) => item.path === `images/${levelData.cutSrc}`
            )
            imageStore.setImageCut(imageSrc)
            showBtnCheck.value = false
            roundCurWordNeedGuessIdxStore.setRoundCurWordNeedGuessIdx(0)
            proposalCollectedRows.value = Array.from(
                { length: 10 },
                () => false
            )
        }
    }
)

const isDragging = ref(false)
const proposalCollectedRows = ref<boolean[]>(
    Array.from({ length: 10 }, () => false)
)
const showBtnCheck = ref(false)

const onDragStart = (evt, word: string, idx: number) => {
    isDragging.value = true
    dragWordStore.setDragWord({ word, idx })
}
const handleDrop = (evt) => {
    isDragging.value = false

    if (evt.target.closest('.image-answers')) {
        const index = dragWordStore.getDragIndex

        if (index !== -1) {
            mixedWords.value.splice(index, 1)
        }

        const currentIdx =
            roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx
        const currentRow = answerFields.value[currentIdx]
        const firstEmpty = currentRow?.indexOf(null)

        if (currentRow && typeof firstEmpty === 'number' && firstEmpty !== -1) {
            currentRow[firstEmpty] = dragWordStore.getDragWord
        }

        if (currentRow && !currentRow.includes(null)) {
            proposalCollectedRows.value[currentIdx] = true
            showBtnCheck.value = true
        }
    }
}

const onDragOver = (evt) => {
    // console.log(evt)
}
const answerFields = ref<(string | null)[][]>([])

const checkAnswer = () => {
    const answerArr =
        answerFields.value[
            roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx
        ]
    const rightAnswer = sentenceGuess.getSentenceEn.split(' ')

    if (answerArr?.join(' ') === rightAnswer.join(' ')) {
        console.log('true')
    } else {
        console.log('false')
    }

    roundCurWordNeedGuessIdxStore.setRoundCurWordNeedGuessIdx(
        roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx + 1
    )
    showBtnCheck.value = false
}

watch(
    () => roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx,
    () => {
        const { rounds } = roundData.getRoundData
        const numberOfRounds = roundNumber.getCurRound - 1
        const { words } = rounds[numberOfRounds]
        wordsStore.setWords(words)
        sentenceGuess.setSentenceRu(
            words[roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx]
                .textExampleTranslate
        )
        sentenceGuess.setSentenceEn(
            words[roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx]
                .textExample
        )
        const wordsArray =
            words[
                roundCurWordNeedGuessIdxStore.getRoundCurWordNeedGuessIdx
            ].textExample.split(' ')
        mixedWords.value = wordsArray.sort(() => Math.random() - 0.5)
    }
)
</script>

<template>
    <div
        class="container"
        @drop="handleDrop($event)"
        @dragover.prevent="onDragOver($event)"
    >
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="wrapper" v-if="levels">
            <HeaderGamePage />
            <div class="translate">
                <button type="button" class="translate__btn"></button>
                <p class="translate__text">
                    {{ sentenceGuess.getSentenceRu }}
                </p>
            </div>
            <div class="game">
                <div class="image">
                    <img
                        :src="`${imageStore.getImageCut}`"
                        alt="image"
                        class="image-cut"
                    />
                    <div class="image-answers">
                        <div
                            v-for="(row, rowIndex) in answerFields"
                            :class="{
                                dragging: isDragging,
                                answered: proposalCollectedRows[rowIndex],
                            }"
                            :key="rowIndex"
                            class="image-answer"
                        >
                            <span
                                v-for="(slot, slotIdx) in row"
                                :key="slotIdx"
                                class="puzzle"
                                :class="{
                                    'puzzle--empty': slot === null,
                                    'puzzle--filled': slot !== null,
                                }"
                                >{{ slot }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="answer">
                    <span
                        v-for="(word, idx) in mixedWords"
                        :key="word"
                        class="puzzle"
                        draggable="true"
                        @dragstart="onDragStart($event, word, idx)"
                    >
                        {{ word }}
                    </span>
                </div>
            </div>
            <div class="btns">
                <button type="button" class="btn" @click="log(`I don't know`)">
                    I don't know
                </button>
                <button
                    v-if="showBtnCheck"
                    type="button"
                    class="btn"
                    @click="checkAnswer()"
                >
                    Check
                </button>
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

.image-answer.dragging {
    box-shadow: #fff 0px 0px 7px 0px;
}

.game {
    width: 100%;
}

.image {
    position: relative;
    width: 100%;
    height: var(--image-height);
    border: #ffffff 1px solid;
    margin-bottom: 1rem;
}

.image-cut {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.image-answer {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 40px;
    background-color: #333;
    z-index: 3;
}

.image-answer.answered {
    background: transparent;
}

.image-answer.answered .puzzle {
    background: transparent;
    color: #fff;
    text-shadow:
        1px 1px 3px rgba(0, 0, 0, 0.9),
        0 0 5px rgba(0, 0, 0, 0.5);
    outline: 2px solid rgba(255, 255, 255, 0.3);
}

.image-answer.answered .puzzle::before {
    content: none;
}

.image-answer.answered .puzzle::after {
    border-radius: 0 50% 50% 0;
    background: rgba(255, 255, 255, 0.4);
    right: -16px;
}

.image-answer.answered .puzzle:first-child::before {
    background: transparent;
}

.image-answer.answered .puzzle:last-child::after {
    background: transparent;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: auto;
    background-color: #333;
    padding: 2rem;
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
    height: 40px;
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

.image-answer .puzzle--empty {
    &::before {
        content: none;
    }
    &::after {
        content: none;
    }
}

.puzzle--filled {
    background: #ffc107;
    cursor: pointer;

    &::before {
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

    &::after {
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
}

.puzzle--empty {
    background: none;
    box-shadow: none;
    color: transparent;
    pointer-events: none;

    &::before,
    &::after {
        content: none;
    }
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
