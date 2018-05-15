<template>
  <div class='container' v-bind:style="{background: color}" v-bind:class="{ selected: isSelected }" v-on:click="selected">
    <div>
      <img v-bind:src="getGradeURL(info.grade)"></img>
      <span class='name'>{{info.name}}</span>
    </div>
    <div>{{info.action}}/{{info.location}}</div>
    <div>{{info.detail}}</div>
  </div>
</template>

<script>
  import { bus } from '../main';
  export default {
    props: ['info'],
    components: {

    },
    data() {
      return {
        isSelected: false
      }
    },
    methods: {
      getGradeURL: function(n) {
        return "../src/assets/" + n.toString() + ".png";
      },
      selected: function() {
        this.isSelected = !this.isSelected;
        bus.$emit('selected', this.info.index);
      },
      doSelected: function() {
        this.isSelected = true;
      },
      unSelected: function() {
        this.isSelected = false;
      }

    },
    computed: {
      color: function() {
        this.info.isSelected = this.isSelected;
        switch (this.info.action) {

          case '대기':
            return this.isSelected ? "#8BC34A" : "#558B2F";

          case '작업':
            return this.isSelected ? "#F44336" : "#C62828";
          case '교육':
            return this.isSelected ? "#2196F3" : "#1565C0";
          case '훈련':
            return this.isSelected ? "#FFCA28" : "#FF8F00";

          case '휴가':
            return this.isSelected ? "#9E9E9E" : "#424242";
          case '정비':
            return this.isSelected ? "#BDBDBD" : "#616161";
          case '외진':
            return this.isSelected ? "#E0E0E0" : "#757575";

          case '기타':
            return this.isSelected ? "#607D8B" : "#263238";
          case '식기':
            return this.isSelected ? "#78909C" : "#37474F";
          case '배식':
            return this.isSelected ? "#90A4AE" : "#455A64";

          default:
            return "crimson"
        }
      }

    },
    created() {
      this.info.doSelect = this.doSelected;
      this.info.unSelect = this.unSelected;
    },
    beforeUpdate(){
      this.info.doSelect = this.doSelected;
      this.info.unSelect = this.unSelected;
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    background: #666;
    border-radius: 5px;
    margin: 3px;
    cursor: pointer;
    height: 70px;
    overflow: hidden;


    .name {
      font-size: 14px;
      margin-bottom: 4px;
    }

  }

  img {
    display: inline-block;
    height: 0.8em;
    width: 0.8em;
  }
</style>
