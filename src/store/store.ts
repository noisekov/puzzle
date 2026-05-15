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
