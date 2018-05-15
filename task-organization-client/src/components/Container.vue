<template>
  <div id='container'>
    <div id="header-wrapper">
      <div class="logout" v-on:click="logout"><svg fill="#AAA" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
</svg></div>
      <div class="lock"><svg fill="#AAA" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
</svg></div>
      <div class="refresh" v-on:click="refresh" v-if="!isRefreshing"><svg fill="#AAA" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg></div>
      <div class="half-circle-spinner" v-if="isRefreshing">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </div>
    <div id="tab-header">
      <div id="tab1" class='tab' v-bind:class='{activeTab : isActive(0)}' v-on:click='changeTab(0)'>전체</div>
      <div id="tab2" class='tab' v-bind:class='{activeTab : isActive(1)}' v-on:click='changeTab(1)'>1소대</div>
      <div id="tab3" class='tab' v-bind:class='{activeTab : isActive(2)}' v-on:click='changeTab(2)'>2소대</div>
      <div id="tab4" class='tab' v-bind:class='{activeTab : isActive(3)}' v-on:click='changeTab(3)'>3소대</div>
    </div>
    <div id='wrapper'>
      <ca-summary v-show="currentTab==0"></ca-summary>
      
      <ca-table v-show="currentTab==1"
                v-bind:entities="platoons[0]"></ca-table>
                
      <ca-table v-show="currentTab==2"
                v-bind:entities="platoons[1]"></ca-table>
                
      <ca-table v-show="currentTab==3"
                v-bind:entities="platoons[2]"></ca-table>
    </div>
  </div>
</template>

<script>
  import { bus } from '../main';
  import Table from './Table.vue';
  import Summary from './Summary.vue';
  export default {
    components: {
      'ca-table': Table,
      'ca-summary': Summary,
    },
    data() {
      return {
        currentTab: 1,
        data: [],
        counts: [],
        platoons: [
          [
            [],
            [],
            [],
            []
          ],
          [
            [],
            [],
            [],
            []
          ],
          [
            [],
            [],
            [],
            []
          ]
        ],
        selected: new Set(),
        isRefreshing: false
      }
    },
    methods: {
      changeTab: function(tab) {
        if (this.currentTab != 0) {
          this.clearAll();
        }
        this.currentTab = tab;
      },
      isActive: function(tab) {
        return this.currentTab == tab;
      },
      parsePlatoon: function() {


        const splitByCounts = (count, arr) => this.R.splitEvery(4)(this.R.reduce((acc, n) => {
          let temp = acc.concat([this.R.take(n, arr)]);
          arr = this.R.drop(n, arr);
          return temp;
        }, [], count));

        this.platoons = splitByCounts(this.counts, this.data);

      },
      update: function() {

        this.parsePlatoon();

      },
      clearAll: function() {
        this.R.flatten(this.platoons[this.currentTab - 1]).forEach(v => v.unSelect());
        this.selected.clear();
      },
      selectAll: function() {
        this.R.flatten(this.platoons[this.currentTab - 1]).forEach(v => {
          v.doSelect();
          this.selected.add(v.index);
        });
      },
      transactionJSON: function(targets, modified) {
        return { targets, modified };
      },
      refresh: function() {
        this.$http.get('https://test.minidonut.io/data').then(res => {
          this.data = res.data.data;
          this.counts = res.data.counts;
          this.parsePlatoon();
        });
        this.isRefreshing = true;
        setTimeout(function() {this.isRefreshing = false}.bind(this), 1500);
        
      },
      logout: function() {
        document.cookie = 'api-key' + '=; Max-Age=-99999999;';
        window.location.href = 'http://test.minidonut.io/login';
      }

    },
    computed: {

    },
    created() {
      this.$http.get('https://test.minidonut.io/data').then(res => {
        this.data = res.data.data;
        this.counts = res.data.counts;
        this.parsePlatoon();
      });


      // Event registering


      bus.$on('submit', function() {

      }.bind(this));

      bus.$on('selected', function(v) {

        if (this.selected.has(v)) {
          this.selected.delete(v);
        }
        else {
          this.selected.add(v);
        }

      }.bind(this));


      bus.$on('selectAll', function(v) {
        this.selectAll();
      }.bind(this));

      bus.$on('clearAll', function() {
        this.clearAll();
      }.bind(this));

      bus.$on('selectGroup', function(list) {
        list.forEach(v => {
          this.selected.add(v);
          this.data[v].doSelect();
        })
      }.bind(this));

      bus.$on('transaction', function(v) {
        let a = this.transactionJSON(Array.from(this.selected), v);
        this.clearAll();
        this.$http.post('https://test.minidonut.io/update', a).then(res => {
          this.data = res.data.data;
          this.counts = res.data.counts;
          this.parsePlatoon();
        });


      }.bind(this));
    }
  }
</script>

<style scoped lang="scss">
  #container {
    display: flex;
    flex-direction: column;
    max-width: 425px;
    padding: 0;
    margin: 0 auto;
    background: #212121;

  }

  .tab {
    flex: 1 0 auto;
    font-size: 1.4em;
    padding: 15px;
    cursor: pointer;
  }

  .activeTab {
    color: #fff;
    border-width: 2px;
    border-bottom: 2px white solid;
  }

  #tab-header {
    padding: 0;
    display: flex;
    background: #212121;
    color: #777;
    text-align: center;
  }

  #header-wrapper {
    margin-top: 15px;
    display: flex;
    color: white;
    height: 40px;
    align-items: center;

      div {
        cursor: pointer;
      }

    .refresh {
      margin-right: 24px;
      margin-left: auto;
    }
    .lock {
      justify-self: center;
    }

    .logout {
      margin-right: auto;
      margin-left: 24px;
    }
  }
  
  .half-circle-spinner, .half-circle-spinner * {
      box-sizing: border-box;
    }

    .half-circle-spinner {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      position: relative;
      margin-right: 18px;
      margin-left: auto;
    }

    .half-circle-spinner .circle {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: calc(60px / 10) solid transparent;
    }

    .half-circle-spinner .circle.circle-1 {
      border-top-color: #ff1d5e;
      animation: half-circle-spinner-animation 1s infinite;
    }

    .half-circle-spinner .circle.circle-2 {
      border-bottom-color: #ff1d5e;
      animation: half-circle-spinner-animation 1s infinite alternate;
    }

    @keyframes half-circle-spinner-animation {
      0% {
        transform: rotate(0deg);

      }
      100%{
        transform: rotate(360deg);
      }
    }
  
  
</style>
