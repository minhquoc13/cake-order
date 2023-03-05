import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart')

function updateCart(item) {
    //
    axios.post('/api/v1/')
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let item = JSON.parse(btn.dataset.item)
        updateCart(item)
    })
})