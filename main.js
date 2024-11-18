const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    // los metodos van a continuacion de data 
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    },
 
})
