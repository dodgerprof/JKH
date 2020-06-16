<template>
  <div :class="['site-menu', {'site-menu--hide': !showMenu}]">
    <div style="display: none;">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <symbol id="menu" viewBox="0 0 26.077 26.077">
          <g id="c103_arrow">
            <path style="fill:#3545a6;" d="M25.709,13.552l-9.721,9.994c0,0-1.151,1.219-1.151-0.105c0-1.325,0-4.532,0-4.532
			s-0.781,0-1.976,0c-3.42,0-9.642,0-12.173,0c0,0-0.688,0.184-0.688-0.861c0.001-1.047,0.001-9.533,0.001-10.279
			S0.576,7.04,0.576,7.04c2.463,0,8.895,0,12.199,0c1.072,0,1.771,0,1.771,0s0-2.569,0-4.186c0-1.61,1.208-0.395,1.208-0.395
			s9.081,8.791,10.033,9.744C26.482,12.894,25.709,13.552,25.709,13.552z" />
          </g>
        </symbol>
      </svg>
    </div>
    <button type="button" class="site-menu__toggle" @click="hideMenu">
      <svg width="20px" height="20px">
        <use xlink:href="#menu"></use>
      </svg>
    </button>
    <ul class="menu-list">
      <li class="menu-item menu-item--category">General</li>
      <li class="menu-item">
        <a class="menu-link menu-link--active" href="#">Profile</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Layouts</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Pages</a>
      </li>
    </ul>
    <ul class="menu-list">
      <li class="menu-item menu-item--category">Elements</li>
      <li class="menu-item">
        <a class="menu-link" href="#">Basic UI</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Advanced UI</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Structure</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Widgets</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Froms</a>
      </li>
      <li class="menu-item">
        <a class="menu-link" href="#">Tables</a>
      </li>
    </ul>
    <ul class="menu-list">
      <li class="menu-item menu-item--category">Apps</li>
      <li class="menu-item">
        <a class="menu-link" href="#">Apps</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showMenu: true
      }
    },
    methods: {
      hideMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .site-menu {
    position: relative;
    background-color: #1e1e1e;
    padding-top: 30px;
    width: 200px;
    transition: all 0.3s ease-out;
    z-index: 99;

    &__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background-color: #f1f4f5;
      padding: 0;
      position: absolute;
      right: -45px;
      top: 5px;
      transform: rotate(180deg);
    }

    &--hide {
      width: 0px;

      & ul {
        display: none;
      }

      & .site-menu__toggle {
        transform: rotate(0deg);
      }
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-bottom: 30px;
    margin: 0;
    list-style-type: none;
    width: 100%;
  }

  .menu-item {
    font-size: 16px;
    color: #757575;

    &--category {
      text-transform: uppercase;
      padding-left: 20px;
      padding-bottom: 5px;
    }
  }

  .menu-link {
    display: flex;
    width: 100%;
    padding: 5px 35px;
    color: #9e9e9e;
    text-decoration: none !important;

    &--active {
      color: #fff !important;
      background-color: #333;
    }

    &:hover:not(&--active),
    &:focus:not(&--active) {
      background-color: #262626;
      color: #aaa;
    }

    &:active {
      opacity: 0.5;
    }

    &::after {
      content: '→';
      margin-left: auto;
    }
  }
</style>