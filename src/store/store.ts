import { defineStore } from 'pinia'

export const getGameLevel = defineStore('data', {
    state: () => ({
        levels: 0,
    }),
    getters: {
        getLevels: (state) => state.levels,
    },
    actions: {
        setLevels(value: number) {
            this.levels = value
        },
    },
})
