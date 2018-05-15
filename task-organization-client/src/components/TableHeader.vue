<template>
  <div id="wrapper">
    <div class="chip" v-on:click="selectAll">
      <div class="key">총원</div>
      <div class="value" style="background:#212121">{{sum}}</div>
    </div>
    <template v-for="(value, key) in summary" v-if="value.length != 0">
      <div class="chip" v-on:click="selection(value)">
        <div class="key">{{key}}</div>
        <div class="value" v-bind:style="{background: colorTable[key]}">{{value.length}}</div>  
      </div>
    </template>
</div>
</template>

<script>
    import { bus } from '../main';
    export default {
        props: ['entities'],
        components: {

        },
        data() {
            return {
                colorTable: {
                    '대기': "#558B2F",
                    '작업': "#C62828",
                    '교육': "#1565C0",
                    '훈련': "#FF8F00",
                    '휴가': "#424242",
                    '정비': "#616161",
                    '외진': "#757575",
                    '기타': "#263238",
                    '식기': "#37474F",
                    '배식': "#455A64"
                }
            }
        },
        methods: {
            selectAll: function() {
                bus.$emit('selectAll');
            },
            selection: function(v) {
                bus.$emit('selectGroup', v);
            },
            actionOrder: function() {
                return {
                    '작업': [],
                    '교육': [],
                    '훈련': [],
                    '대기': [],
                    '식기': [],
                    '배식': [],
                    '휴가': [],
                    '정비': [],
                    '외진': [],
                    '기타': []
                }
            }
        },
        computed: {
            summary: function() {
                
                let ret = this.actionOrder();
                this.R.flatten(this.entities).forEach(v=>{
                    ret[v.action].push(v.index);
                })
                return ret;
            },
            sum: function() {
                return this.R.flatten(this.entities).length;
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
        padding: 5px;
    }

    #wrapper {
        text-align: left;
    }

    .chip {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 4px;
        padding: 2px;
        border-radius: 40px;
        background: #424242;
    }

    .key {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: none;
        padding: 3px 5px 3px 8px;
        margin: 0;
    }

    .value {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1.85rem;
        width: 1.85rem;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        padding: 0;
        margin: 0;
    }
</style>
