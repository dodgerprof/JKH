<template>
  <div class="page-wrapper">
    <addRequest :class="{'modal--show': isOpenedModal}" @closeAddRequest="isOpenedModal = false" />
    <navbar />
    <div class="content-wrapper">
      <siteMenu />
      <main class="page-main">
        <div class="profile">
          <div class="panel">
            <div class="profile__wrapper-image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQEj29vnuRKOnfiDt935yZ7bSq_BYEMTrRSoys9NBBldXM9aPJ&usqp=CAU" class="profile__image" alt="Responsive image">
            </div>
            <h3 class="profile__name">johnny depp</h3>
            <span class="profile__rang">Пользователь</span>
            <p class="profile__about-user">Hi! I'm Adrian the Senior UI Designer at AmazingSurge. We hope you enjoy the design and quality of Social.</p>
            <button v-if="!isAdmin" @click="isOpenedModal = true" type="button" class="btn btn-outline-primary">Оставить заявку</button>
          </div>
        </div>
        <div class="requests">
          <div class="panel">
            <div class="requests__tabs">
              <a class="requests__tab requests__tab--active" type="button">Заявки
                <span class="badge badge-pill badge-info">{{requests.length}}</span>
              </a>
              <a class="requests__tab" type="button">Голосование</a>
              <a class="requests__tab" type="button">Сообщения</a>
            </div>
            <requestComponent v-for="request of requests" :request="request" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import navbar from '@/components/navbar.vue'
  import addRequest from '@/components/addRequest.vue'
  import siteMenu from '@/components/site-menu.vue'
  import requestComponent from '@/components/request.vue'
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        isOpenedModal: false,
        commentMessage: ''
      }
    },
    components: {
      navbar,
      addRequest,
      siteMenu,
      requestComponent
    },
    computed: {
      ...mapGetters([
        'loading',
        'requests',
        'isAdmin'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: calc(100vh - 74px);
  }

  .page-main {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color: #f1f4f5;
  }

  .profile {
    display: flex;
    width: 25%;
    text-align: center;

    @media(max-width: 1100px) {
      width: 100%;
    }

    &__wrapper-image {
      width: 120px;
      margin: 0 auto 35px;
    }

    &__image {
      display: block;
      border-radius: 50%;
      width: 100%;
      height: auto;
    }

    &__name {
      text-transform: uppercase;
    }

    &__rang {
      display: block;
      color: #aaa;
      margin-bottom: 20px;
    }

    &__about-user {
      color: #757575;
    }

    &__footer {
      background-color: #aaa;
    }
  }

  .requests {
    width: 75%;

    @media(max-width: 1100px) {
      width: 100%;
    }

    &__tabs {
      border-bottom: 1px solid #ccc;

      @media(max-width: 420px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    &__tab {
      font-size: 14px;
      color: #757575;
      background-color: transparent;
      border: none;
      padding: 10px 15px;
      margin-bottom: -1px;
      outline: none;
      position: relative;

      &--active {
        border-bottom: 3px solid #3f51b5;
      }

      &:hover:not(&--active),
      &:focus:not(&--active) {
        border-bottom: 3px solid #bbb;
      }
    }
  }

  .requests-item {
    padding: 15px 10px;
    border-bottom: 1px solid #ccc;

    &__number {
      color: #bbb;
      font-size: 11px;
    }

    &__message {
      font-size: 16px;
    }
  }

  .requests-comments {
    text-align: right;

    &__message {
      display: block;
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
  }

  .modal--show {
    display: block !important;
    opacity: 1 !important;
    z-index: 99;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>