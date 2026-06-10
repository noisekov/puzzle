import { defineStore } from 'pinia'

export const allData = defineStore('data', {
    state: () => ({
        data: [{}],
    }),
    getters: {
        getData: (state) => state.data,
    },
    actions: {
        setData(value: Array<object>) {
            this.data = value
        },
    },
})

export const roundStore = defineStore('round', {
    state: () => ({
        curRound: 1,
        allRounds: 0,
    }),
    getters: {
        getCurRound: (state) => state.curRound,
        getAllRounds: (state) => state.allRounds,
    },
    actions: {
        setCurRound(value: number) {
            this.curRound = value
        },
        setAllRounds(value: number) {
            this.allRounds = value
        },
    },
})

export const levelStore = defineStore('level', {
    state: () => ({
        curLevel: 1,
        allLevels: 0,
    }),
    getters: {
        getCurLevel: (state) => state.curLevel,
        getAllLevels: (state) => state.allLevels,
    },
    actions: {
        setCurLevel(value: number) {
            this.curLevel = value
        },
        setAllLevels(value: number) {
            this.allLevels = value
        },
    },
})

export const roundDataStore = defineStore('roundData', {
    state: () => ({
        roundData: {},
    }),
    getters: {
        getRoundData: (state) => state.roundData,
    },
    actions: {
        setRoundData(value: { rounds: Array<object>; roundsCount: number }) {
            this.roundData = value
        },
    },
})

export const wordsCurRound = defineStore('wordsCurRound', {
    state: () => ({
        words: [{}],
    }),
    getters: {
        getWords: (state) => state.words,
    },
    actions: {
        setWords(value: Array<object>) {
            this.words = value
        },
    },
})

export const sentenceCurGuess = defineStore('sentenceCurGuess', {
    state: () => ({
        sentenceRu: '',
        sentenceEn: '',
    }),
    getters: {
        getSentenceRu: (state) => state.sentenceRu,
        getSentenceEn: (state) => state.sentenceEn,
    },
    actions: {
        setSentenceRu(value: string) {
            this.sentenceRu = value
        },
        setSentenceEn(value: string) {
            this.sentenceEn = value
        },
    },
})
