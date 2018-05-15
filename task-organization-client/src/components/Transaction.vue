<template>
  <div id="transaction-modal">
    <div id='modal-window'>
        <div class="header"><p>작업</p></div>
        <div class='action-table'>
            <div v-for="(action, index) in actionType" class='action-type' v-bind:class="styleClass[index]" v-on:click="select(action)">{{action}}</div>
        </div>
        <div id="text-forms">
            <input type="text" v-model="location" name="" v-bind:placeholder="locationPlaceholder"/>
            <input type="text" v-model="detail" name="" v-bind:placeholder="detailPlaceholder"/>
        </div>
        <div id="forms">
            <div id='submit' v-on:click="submit">변경하기</div>
            <div id='cancel' v-on:click="close">취소</div>
        </div>
    </div>
    <div id='overlay' v-on:click="close"></div>
  </div>
</template>

<script>
    import { bus } from '../main';


    // 작업 work 
    // 교육 edu
    // 훈련 train
    // 대기 wait
    // 식기 dish
    // 배식 food
    // 휴가 vaca
    // 정비 rest
    // 외진 hosp
    // 기타 etc


    export default {
        components: {

        },
        data() {
            return {
                actionType: ['작업', '교육', '훈련', '대기', '식기', '배식', '휴가', '정비', '외진', '기타'],
                locationPlaceholder: "--",
                detailPlaceholder: "--",
                location: "",
                detail: "",
                action: "",
                styleClass: ['work', 'edu', 'train', 'wait', 'dish', 'food', 'vaca', 'rest', 'hosp', 'etc']
            }
        },
        methods: {
            close: function() {
                bus.$emit('close-transaction');
            },
            submit: function() {
                bus.$emit('submit');
            },
            select: function(action) {
                console.log(action);
            }
        },
        computed: {

        },
        created() {

        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/color.scss';

    #transaction-modal {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: 0;

    }

    #modal-window {
        position: relative;
        z-index: 999 !important;
        background: #212121;
        width: 70%;
        height: 50%;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #424242;
            height: 60px;
            text-align: center;
            color: white;
        }

        .action-table {
            display: flex;
            flex-wrap: wrap;

            div {
                display: block;
                border-radius: 4px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
                text-align: center;
                color: white;
                padding: 10px;
                margin: 10px;
                flex: 1 0 10%;
            }
        }
    }




    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 997;
        cursor: pointer;
    }

    #forms {
        display: flex;
        justify-items: center;
        div {
            text-align: center;
            width: 50%;
        }
    }

    input {
        color: #fff;
        width: 100%;
        background: none;
        outline: none;
        resize: none;
        border: 0;
        transition: all .3s;
        border-bottom: 1px solid #bebed2;
        padding: 3px;
    }

    input:focus {
        border-bottom: 2px solid #78788c
    }
    
</style>
