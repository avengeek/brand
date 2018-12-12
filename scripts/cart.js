class Cart {
    constructor(source, container = '#cart-box'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; //Общая стоимость товаров в корзине
        this.cartItems = []; //Массив со всеми товарами
        this._init();
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalGoods = $('<div/>', {
            class: 'cart-summary sum-goods'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalGoods.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    _init(){
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            })
    }
    _renderSum(){
        $('.sum-goods').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Общая стоимость: ${this.amount} $`);
    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} $</p>
            <i id="id${product.id_product}" class="fa fa-times-circle" aria-hidden="true"></i><br>`));
        $container.appendTo($('.cart-items-wrap'));
        $(`#id${product.id_product}`).click(e => {
          this._remove(e.target.parentElement.attributes[1].value);
        })
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity * product.price} $`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods++;
            this._renderItem(product);
        }
        this._renderSum();
    }

    subProduct(element){
        element.quantity--;
        this.countGoods--;
        this.amount -= element.price;
        this._updateCart(element);

        console.log('Удаляем товар' + element.id_product);
        console.log(this.cartItems);
        $(`div[data-product="${element.id_product}"]`).empty();
        element.id_product = 0;
    }

    _remove(idProduct){
        let productId = +idProduct;
        let find = this.cartItems.find(product => product.id_product === productId);
        console.log(find);
        if (find.quantity <= 1){
            this.subProduct(find)
        } else {
            find.quantity--;
            this.countGoods--;
            this.amount -= find.price;
            this._updateCart(find);
        }
        this._renderSum();
    }
}