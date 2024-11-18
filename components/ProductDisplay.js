// el primer argumento es el nombre del componente, el segundo es
// un objeto en el que configuramos el componente
app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /* html */
    ` <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <!-- v-bind se usa para asociar un atributo(src) a un valor de una expresion(image) -->
            <!-- <img v-bind:src="image"> -->
             <!-- solo con poner los dos puntos vale -->
            <img :src="image">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <!-- condicional para mostrar uno u otro p -->

            <p v-if="inStock">In Stock</p>
            <p v-else>Out of stock</p>

            <!-- <p v-if="inventory > 10" >Available</p>
            <p v-else-if="inventory <= 10 && inventory > 0" >Almost sold out</p>
            <p v-else>Sold Out!</p> -->
            <p>Shipping: {{ shipping }}</p>
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{backgroundColor:variant.color}">
            </div>

            <!-- si solo queremos modificar la visibilidad(sigue en el dom)
             aparece un style display none -->
            <!-- <p v-show:'inStock'>inStock</p> -->
            
            <!-- <button class="button" v-on:click="addtoCart">Add to cart</button> -->
            <button class="button"
              :class="{ disabledButton: !inStock } "
              :disabled="!inStock" 
              @click="addtoCart">
              Add to cart
            </button>
          </div>
          </div>
          <review-list v-if="reviews.length" :reviews="reviews"></review-list>
          <review-form @review submitted="addReview"></review-form>
        </div>`,
      data() {
        return {
            product: 'Socks',
            brand: "Vue Mastery",
            selectedVariant:0,
            // inStock: true,
            details: ['50% cotton, 30% wool, 20% polyester'],
            variants: [
                {id: 2234, color:'green', image: './assets/images/socks_green.jpg', quantity:50 },
                {id: 2235, color:'blue', image: './assets/images/socks_blue.jpg', quantity:0 },
            ],
            reviews: []   
        }
    },
    // los metodos van a continuacion de data 
    methods: {
        addtoCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index          
        },
        addReview(review) {
            this.reviews.push(review)
        }
        
    },
     computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        }, 
        shipping() {
            if(this.premium) {
                return 'free'
            } else {
                return 2.99
            }
        }
     }
})
