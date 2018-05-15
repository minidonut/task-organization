<template>
  <div id='wrapper'>
    <table-header v-bind:entities="entities"></table-header>
    <div class='flex-container'>
      <div class='flex-column'>
        <entity v-for="e in entities[0]" 
                :key="e.id"
                v-bind:info="e"></entity>
      </div>
      <div class='flex-column'>
        <entity v-for="e in entities[1]" 
                :key="e.id"
                v-bind:info="e"></entity>
      </div>
      <div class='flex-column'>
        <entity v-for="e in entities[2]" 
                :key="e.id"
                v-bind:info="e"></entity>
      </div>
      <div class='flex-column'>
        <entity v-for="e in entities[3]" 
                :key="e.id"
                v-bind:info="e"></entity>
      </div>
    </div>
    <change-state></change-state>
  </div>
</template>

<script>
  import { bus } from '../main';
  import Entity from './Entity.vue';
  import ChangeState from './ChangeState.vue';
  import TableHeader from './TableHeader.vue';

  export default {
    props: ['entities'],
    components: {
      'entity': Entity,
      'change-state': ChangeState,
      'table-header': TableHeader
    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      total: function() {
        return this.R.flatten(this.entities).length;
        // return 'asd'
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  div {
    background: #212121;
    color: #fff;
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .flex-column {
    flex: 1 0 auto;
    max-width: 25%;
    display: flex;
    flex-direction: column;

  }
</style>
