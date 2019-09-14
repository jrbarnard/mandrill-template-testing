<template>
    <div class="sidebar" :class="{ 'sidebar--open': open }">
        <a class="sidebar__bar" href="#" @click="toggle"><i>{{ !open ? '&lt;' : '&gt;' }}</i></a>
        <div class="sidebar__inner">
            <div class="container">
                This is a sidebar
                TODO: Set up sidebar components for dynamic content
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {
    private open: boolean = false;

    public toggle() {
        this.open = !this.open;
    }
}
</script>

<style lang="scss">
.sidebar {
    $width: 200px;
    $barWidth: 20px;

    position: absolute;
    right: -200px + $barWidth;
    top: 0;
    bottom: 0;
    width: $width;
    background-color: white;
    z-index: 1000;
    border-left: 1px solid #cccccc;
    transition: right 0.3s ease;
    box-shadow: 7px 0px 7px 3px rgba(0,0,0,0.75);

    &--open {
        right: 0;
    }

    &__bar {
        position: absolute;
        height: 100%;
        width: $barWidth;
        background: white;
        border-right: 1px solid #cccccc;
        text-decoration: none;
        color: black;
        display: block;

        i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    &__inner {
        padding: 10px 10px 10px $barWidth + 10px;
    }
}
</style>

