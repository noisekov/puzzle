<script lang="ts" setup>
import HeaderGamePage from '../components/HeaderGamePage.vue'
import { log } from '../utils/utils'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const loading = ref(false)
const post = ref(null)
const error = ref(null)

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
    error.value = post.value = null
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
        data.forEach((element) => {
            console.log(element.download_url)
        })
        post.value = data
    } catch (err) {
        error.value = err.toString()
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="container">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="wrapper" v-if="post">
            <HeaderGamePage />
            <div class="translate">
                <button
                    type="button"
                    class="translate__btn"
                    @click="log('play_translate')"
                ></button>
                <p class="translate__text">
                    Женщина любит кататься на велосипеде
                </p>
            </div>
            <div class="game"></div>
            <div class="answer">
                <div class="sentence"></div>
                <div class="picture-name">Айвазовский</div>
            </div>
            <div class="btns">
                <button type="button" class="btn" @click="log(`I don't know`)">
                    I don't know
                </button>
                <button type="button" class="btn" @click="log('Check')">
                    Check
                </button>
                <button type="button" class="btn" @click="log('Continue')">
                    Continue
                </button>
                <button type="button" class="btn" @click="log('Results')">
                    Results
                </button>
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
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
    border: 1px solid #fff;
    box-shadow: #fff 0px 0px 5px 0px;
    width: 100%;
    margin: 0 0 0.5rem 0;
}
</style>
