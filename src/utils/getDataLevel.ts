export const getDataLevel = async (level: string) => {
    const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
    const response = await fetch(
        `https://api.github.com/repos/rolling-scopes-school/rss-puzzle-data/contents/data/`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
    )
    const levelInDataArr = +level - 1

    return (await response.json())[levelInDataArr]
}
