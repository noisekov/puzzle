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

export const pageStore = defineStore('page', {
    state: () => ({
        curPage: 0,
        allPages: 0,
    }),
    getters: {
        getCurPage: (state) => state.curPage,
        getAllPages: (state) => state.allPages,
    },
    actions: {
        setCurPage(value: number) {
            this.curPage = value
        },
        setAllPages(value: number) {
            this.allPages = value
        },
    },
})

export const levelStore = defineStore('level', {
    state: () => ({
        curLevel: 0,
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
