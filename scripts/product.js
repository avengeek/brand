class Products {
    constructor(source){
        this.source = source;
        this.container = '#product';
        this.items = []; //Массив со всеми товарами
        this._init();
    }
    _init(){
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.producti){
                    this.items.push(product);
                    this._renderItem(product);
                }
            })
    }
    _renderItem(product){
        let $wrapper = $('<a/>', {
            href: 'single_page.html'
        });
        let $desc = $('<div/>', {
            class: 'product-box'
        });

        let $img = $('<img/>', {
            src: product.pr_img,
            alt: product.pr_title
        });
        let $name = $('<p/>', {
            class: 'product-box-name',
            text: product.pr_title
        });
        let $price = $('<p/>', {
            class: 'product-box-price',
            text: '$' + product.pr_price + '.00'
        });

        let $buyBtn = $('<button/>', {
            class: 'buyBtn',
            text: 'Add to Cart',
            'data-id': product.pr_id,
            'data-price': product.pr_price,
            'data-name': product.pr_title
        });

        // Создание структуры
        $img.appendTo($desc);
        $buyBtn.appendTo($desc);
        $name.appendTo($desc);
        $price.appendTo($desc);
        $desc.appendTo($wrapper);
        $(this.container).append($wrapper);
        $(`.buyBtn[data-id="${product.pr_id}"]`).click(e => {
          e.preventDefault();
          cart.addProduct(e.target);
        });
    }
}

