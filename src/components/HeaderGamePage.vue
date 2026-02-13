
<script setup="ts">
    import Select from './Select.vue';

    const log = (msg) => console.log(msg);
</script>

<template>
    <header class="header">
        <div class="selects">
            <Select name="Level"/>
            <Select name="Page"/>
        </div>
        <div class="btns">
            <button class="btn btn-volume" type="button" @click="log('volume')"></button>
            <button class="btn btn-doc" type="button" @click="log('doc')"></button>
            <button class="btn btn-music" type="button" @click="log('music')"></button>
            <button class="btn btn-pic" type="button" @click="log('pic')"></button>
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
    width: calc(100% - 2rem);
    padding: 0.5rem 1rem;
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
    cursor:pointer;
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
.btn-music:after {
    background-image: url(/src/assets/music.svg);
}
.btn-pic:after {
    background-image: url(/src/assets/picture.svg);
}
.btn-doc:after {
    background-image: url(/src/assets/doc.svg);
}
.btn-volume:after {
    background-image: url(/src/assets/volume.svg);
}
</style>