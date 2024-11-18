app.component('review-form', {
    template:
        /*html*/
        `<form class="review-form">
      <h3>Leave a review</h3>
      <label for="name">Name:</label>
      <input id="name">
  
      <label for="review">Review:</label>      
      <textarea id="review"></textarea>
  
      <label for="rating">Rating:</label>
      <select id="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
  
      <input class="button" type="submit" value="Submit">
    </form>`,
    data() {
        return {
            name: '',
            review: '',
            rating: null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submitted', productReview)

            this.name = ''
            this.review = ''
            this.rating = null
        }
    }
})