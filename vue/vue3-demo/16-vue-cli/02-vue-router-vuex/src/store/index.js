import { createStore } from 'vuex'
import { INCREMENT } from '@/store/mutation-types'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            count: 1,
            num: 999,
            todos: [
                { id: 1, text: '唱', done: true },
                { id: 2, text: '跳', done: false },
                { id: 3, text: 'rap', done: false },
                { id: 4, text: '篮球', done: false }
            ]
        }
    },
    getters: {
        getTodos(state) {
            return state.todos
        }
    },
    mutations: {
        [INCREMENT](state, obj) {
            state.count += obj.n
        }
    },
    actions: {
        [INCREMENT]({ commit }) {
            commit('increment', { n: 20 })
        }
    }
})

export default store