<template>
  <div id="wrapper">
    <div id="details">
      <div>
        <p>위치</p>
        <input type="text" v-model="location" name="" v-bind:placeholder="locationPlaceholder"/>
      </div>
      <div>
        <p>세부내용</p>
        <input type="text" v-model="detail" name="" v-bind:placeholder="detailPlaceholder"/>
      </div>
      <div id="selectAll" v-on:click="selectAll" class="btn">전체</div>
      <div id="clearAll" v-on:click="clearAll" class="btn">취소</div>
    </div>
    <div id="btn-wrapper">
      <div class='flex-column'>
      <div class="btn" v-on:click="actionBtn('대기')" style="background: #558B2F">대기</div>
      </div>
      <div class='flex-column'>
        <div class="btn" v-on:click="actionBtn('작업')" style="background: #C62828">작업</div>
        <div class="btn" v-on:click="actionBtn('교육')" style="background: #1565C0">교육</div>
        <div class="btn" v-on:click="actionBtn('훈련')" style="background: #FF8F00">훈련</div>
      </div>
      <div class='flex-column'>
        <div class="btn" v-on:click="actionBtn('휴가')" style="background: #424242">휴가</div>
        <div class="btn" v-on:click="actionBtn('정비')" style="background: #616161">정비</div>
        <div class="btn" v-on:click="actionBtn('외진')" style="background: #757575">외진</div>
      </div>
      <div class='flex-column'>
        <div class="btn" v-on:click="actionBtn('기타')" style="background: #263238">기타</div>
        <div class="btn" v-on:click="actionBtn('식기')" style="background: #37474F">식기</div>
        <div class="btn" v-on:click="actionBtn('배식')" style="background: #455A64">배식</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../main';
  export default {
    components: {

    },
    data() {
      return {
        locationPlaceholder: "--",
        detailPlaceholder: "--",
        location: "",
        detail: ""

      }
    },
    methods: {
      actionBtn: function(action) {
        
        let loc = this.location === "" ? this.locationPlaceholder : this.location;
        let det = this.detail === "" ? this.detailPlaceholder : this.detail; 
        

        bus.$emit('transaction',
          this.modified(
            action,
            this.trim(loc),
            this.trim(det)));
        this.location = "";
        this.detail = "";
      },
      selectAll: function() {
        bus.$emit('selectAll');
      },
      clearAll: function() {
        bus.$emit('clearAll');
      },
      trim: function(str) {
        return this.R.take(7, str);
      },
      modified: function(action, location, detail) {
        return ({ action, location, detail });
      }

    },
    computed: {

    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  #wrapper {
    background: #212121;
    color: #fff;
    padding: 3px;
    margin-top: 15px;

  }

  #btn-wrapper {
    display: flex;
    flex-direction: row;

  }

  #details {
    display: flex;
    flex-direction: row;

    .btn {
      flex-basis: 30px;
    }


    div {
      margin: 0 3px 0 3px;
    }

  }

  .flex-column {
    flex: 1 0 auto;

    div {
      margin: 6px 3px 6px 3px;
    }
  }

  input {
    color: #fff;
    width: 95%;
    background: none;
    outline: none;
    resize: none;
    border: 0;
    transition: all .3s;
    border-bottom: 1px solid #bebed2;
    padding: 3px;

    &:focus {
      border-bottom: 2px solid #78788c;
    }
  }

  input p {
    margin: 0 0 5px 0;
    display: block;
    text-align: left;
    color: #DDD;
  }

  #selectAll {
    color: #00E676;
    cursor: pointer;
    font-size: 1.2em;
    padding: 10px;
  }

  #clearAll {
    color: #B71C1C;
    cursor: pointer;
    font-size: 1.2em;
    padding: 10px;
  }

  .btn {
    cursor: pointer;
    background: #424242;
    padding: 10px;
    text-align: center;
    border-radius: 3px;
  }
</style>
