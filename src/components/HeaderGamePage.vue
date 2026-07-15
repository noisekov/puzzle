<script setup="ts">
import { musicHandler } from "../store/store.ts"
import Select from "./Select.vue"

const musicHandlerStore = musicHandler()

const volumeHandler = () => {
    musicHandlerStore.setMusic(!musicHandlerStore.getMusic)
}
</script>

<template>
    <header class="header">
        <div class="selects">
            <Select name="Level" />
            <Select name="Round" />
        </div>
        <div class="btns">
            <button
                class="btn btn-volume"
                type="button"
                @click="volumeHandler()"
            ></button>
        </div>
    </header>
</template>

<style scoped lang="postcss">
.selects {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}

.btns {
    display: flex;
    gap: 1rem;
}
.btn {
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    border: none;
    cursor: pointer;
    &:after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 2px;
        left: 2px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
}

.btn-volume:after {
    background-image: url(/src/assets/volume.svg);
}
</style>
