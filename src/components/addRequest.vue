<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Отправить заявку</h5>
          <button @click="$emit('closeAddRequest')" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <small class="form-text text-muted mb-1">Введите текст</small>
            <input v-model='request' class="form-control" type="text" placeholder="Текс заявки">
          </div>
        </div>
        <div class="modal-footer">
          <button @click="createRequest" :disabled="loading" type="button" class="btn btn-primary">Отправить
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'addRequest',
    data() {
      return {
        request: ''
      }
    },
    methods: {
      createRequest() {
        if (this.request !== '') {
          this.$store.dispatch('createRequest', this.request)
          this.request = '';
          this.$emit('closeAddRequest')
        }
      }
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    }
  }
</script>

