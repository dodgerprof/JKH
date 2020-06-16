<template>
  <div class="requests-item">
    <small class="requests-item__number" :key="request.id">ID Заявки{{request.id}}</small>
    <p class="requests-item__message">{{request.message}}</p>
    <div class="requests-comments">
      <small v-if='request.comments.length != 0' class="text-muted">//Комментарии</small>
      <p class="requests-comments__message" v-for="(comment, index) of request.comments" :key="index">{{comment}}</p>
    </div>
    <div class="d-flex" v-if="isAdmin">
      <input v-model='commentMessage' name="commentMessage" type="text" class="form-control form-control-sm" placeholder="Введите комментарий">
      <button type="button" @click="onAddComment" class="btn btn-sm btn-primary ml-1">Отправить</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  
  export default {
    data() {
      return {
        commentMessage: '',
      }
    },
    props: ['request'],
    methods: {
      onAddComment() {
        if (this.commentMessage !== '') {
          this.$store.dispatch('addComment', {
            message: this.commentMessage,
            id: this.request.id
          })
          this.commentMessage = '';
        }
      }
    },
    computed: {
      ...mapGetters([
        'isAdmin'
      ])
    }
  }
</script>

<style lang="scss" scoped>
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