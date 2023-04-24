let cakeSizes = document.querySelectorAll('.cake-size')
cakeSizes.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const cakeId = btn.dataset.id
        const size = btn.dataset.size
        const price = btn.dataset.price
        const addToCartButton = document.getElementById(cakeId)
        const allSize = btn.parentNode.children

        // change price
        const priceCake = document.getElementsByClassName(cakeId)[0]
        let cake = JSON.parse(btn.dataset.cake)
        const originalPrice = cake['priceDisplay'] + ' VND'
        priceCake.textContent = price + ' VND'
            // click size 
        for (let i = 0; i < allSize.length; i++) {
            if (allSize[i].classList.contains('size-actived') && btn !== allSize[i]) {
                allSize[i].classList.remove('size-actived')
            }
        }
        if (btn.classList.contains('size-actived')) {
            btn.classList.remove('size-actived')
            addToCartButton.setAttribute("data-cake", "")
            priceCake.textContent = originalPrice
        } else {
            btn.classList.add('size-actived')
            let cake1 = JSON.parse(btn.dataset.cake)
            cake1.price = Number(price)
            cake1.size = size
            console.log(cake1)
            addToCartButton.setAttribute("data-cake", JSON.stringify(cake1))
        }
    })
})

$(document).ready(function() {
    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var main = new Splide('#main-carousel', {
        type: 'slide',
        rewind: true,
        pagination: false,
        arrows: false,
    });

    var thumbnails = new Splide('#thumbnail-carousel', {
        fixedWidth: 100,
        fixedHeight: 60,
        gap: 10,
        rewind: true,
        pagination: false,
        isNavigation: true,
        breakpoints: {
            600: {
                fixedWidth: 60,
                fixedHeight: 44,
            },
        },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
});
// --------------------------------------------------------
let addToCart = document.querySelectorAll('.cake-button_buy')

function updateCart(cake) {
    axios.post('/api/v1/cart/update-cart', cake).then(res => {
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

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let cake = btn.dataset.cake
        if (cake == "") {
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Please choose a size before add cake to cart',
                progressBar: false,
            }).show()
            return
        }
        cake = JSON.parse(btn.dataset.cake)
        updateCart(cake)
    })
})