import { getDataLevel } from "./getDataLevel"
import { roundStore, levelStore, roundDataStore, sentenceCurGuess } from "../store/store"

export const updateLevel = async (level: string) => {
    const roundData = roundDataStore()

    const ROUND_ONE_IF_CHANGE_LEVEL = 1
    const { download_url: urlAboutLevel } = await getDataLevel(level)
    const levelData = await fetch(urlAboutLevel)
    const responseLevelData = await levelData.json()
    roundData.setRoundData(responseLevelData)
    localStorage.setItem(
        "puzzle_noisekov",
        JSON.stringify(
            Object.assign(JSON.parse(localStorage.getItem("puzzle_noisekov") || "{}"), {
                level: level,
                round: ROUND_ONE_IF_CHANGE_LEVEL,
                allRounds: responseLevelData.roundsCount
            })
        )
    )

    const pathAudioFile = responseLevelData.rounds[0].words[0].audioExample
    updateSound(pathAudioFile)
    levelStore().setCurLevel(+level)
    roundStore().setAllRounds(+responseLevelData.roundsCount)
    roundStore().setCurRound(ROUND_ONE_IF_CHANGE_LEVEL)
}

export const updateSound = async (pathSound: string) => {
    const sentenceGuess = sentenceCurGuess()
    const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
    const responseSound = await fetch(`https://api.github.com/repos/rolling-scopes-school/rss-puzzle-data/contents/${pathSound}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
    const dataSound = await responseSound.json()

    const { download_url: sound } = dataSound
    sentenceGuess.setSound(sound)
}
