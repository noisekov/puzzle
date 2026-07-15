import { defineStore } from "pinia"

export const allData = defineStore("data", {
    state: () => ({
        data: [{}]
    }),
    getters: {
        getData: state => state.data
    },
    actions: {
        setData(value: Array<object>) {
            this.data = value
        }
    }
})

export const roundStore = defineStore("round", {
    state: () => ({
        curRound: 1,
        allRounds: 0
    }),
    getters: {
        getCurRound: state => state.curRound,
        getAllRounds: state => state.allRounds
    },
    actions: {
        setCurRound(value: number) {
            this.curRound = value
        },
        setAllRounds(value: number) {
            this.allRounds = value
        }
    }
})

export const levelStore = defineStore("level", {
    state: () => ({
        curLevel: 1,
        allLevels: 0
    }),
    getters: {
        getCurLevel: state => state.curLevel,
        getAllLevels: state => state.allLevels
    },
    actions: {
        setCurLevel(value: number) {
            this.curLevel = value
        },
        setAllLevels(value: number) {
            this.allLevels = value
        }
    }
})

export const roundDataStore = defineStore("roundData", {
    state: () => ({
        roundData: {}
    }),
    getters: {
        getRoundData: state => state.roundData
    },
    actions: {
        setRoundData(value: { rounds: Array<object>; roundsCount: number }) {
            this.roundData = value
        }
    }
})

export const wordsCurRound = defineStore("wordsCurRound", {
    state: () => ({
        words: [{}]
    }),
    getters: {
        getWords: state => state.words
    },
    actions: {
        setWords(value: Array<object>) {
            this.words = value
        }
    }
})

export const sentenceCurGuess = defineStore("sentenceCurGuess", {
    state: () => ({
        sentenceRu: "",
        sentenceEn: "",
        sound: ""
    }),
    getters: {
        getSentenceRu: state => state.sentenceRu,
        getSentenceEn: state => state.sentenceEn,
        getSound: state => state.sound
    },
    actions: {
        setSentenceRu(value: string) {
            this.sentenceRu = value
        },
        setSentenceEn(value: string) {
            this.sentenceEn = value
        },
        setSound(value: string) {
            this.sound = value
        }
    }
})

export const image = defineStore("image", {
    state: () => ({
        imageCut: "",
        imageName: "",
        imageSrc: "",
        imageNameAuthorYear: ""
    }),
    getters: {
        getImageCut: state => state.imageCut,
        getName: state => state.imageName,
        getSrc: state => state.imageSrc,
        getNameAuthorYear: state => state.imageNameAuthorYear
    },
    actions: {
        setImageCut(value: string) {
            this.imageCut = value
        },
        setName(value: string) {
            this.imageName = value
        },
        setSrc(value: string) {
            this.imageSrc = value
        },
        setNameAuthorYear(value: string) {
            this.imageNameAuthorYear = value
        }
    }
})

export const dragWord = defineStore("dragWord", {
    state: () => ({
        drag: {
            word: "",
            idx: 0
        }
    }),
    getters: {
        getDragWord: state => state.drag.word,
        getDragIndex: state => state.drag.idx
    },
    actions: {
        setDragWord(value: { word: string; idx: number }) {
            this.drag = value
        }
    }
})

export const roundCurWordNeedGuessIdx = defineStore("roundCurWordNeedGuessIdx", {
    state: () => ({
        roundCurWordNeedGuessIdx: 0
    }),
    getters: {
        getRoundCurWordNeedGuessIdx: state => state.roundCurWordNeedGuessIdx
    },
    actions: {
        setRoundCurWordNeedGuessIdx(value: number) {
            this.roundCurWordNeedGuessIdx = value
        }
    }
})

export const musicHandler = defineStore("music", {
    state: () => ({
        music: true
    }),
    getters: {
        getMusic: state => state.music
    },
    actions: {
        setMusic(value: boolean) {
            this.music = value
        }
    }
})
