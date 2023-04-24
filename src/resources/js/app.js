let addToCart = document.querySelectorAll('.cake-button_buy')
import axios from 'axios'
import Noty from 'noty'

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let cake = JSON.parse(btn.dataset.datacake)
        console.log(cake)
        updateCart(cake)
    })
})

function updateCart(pizza) {
    axios.post('/api/v1/cart/update-cart', pizza).then(res => {
        // cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}