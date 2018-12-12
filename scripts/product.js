class Product {
    constructor(id, title, price, img){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container = '#product';
        this._render(this.container);
    }
    _render(container){
        let $wrapper = $('<a/>', {
            href: 'single_page.html'
        });
        let $desc = $('<div/>', {
            class: 'product-box'
        });

        let $img = $('<img/>', {
            src: this.img,
            alt: this.title
        });
        let $name = $('<p/>', {
            class: 'product-box-name',
            text: this.title
        });
        let $price = $('<p/>', {
            class: 'product-box-price',
            text: '$' + this.price + '.00'
        });

        let $buyBtn = $('<button/>', {
            class: 'buyBtn',
            text: 'Add to Cart',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title
        });

        // Создание структуры
        $img.appendTo($desc);
        $buyBtn.appendTo($desc);
        $name.appendTo($desc);
        $price.appendTo($desc);
        $desc.appendTo($wrapper);
        $(container).append($wrapper);
    }
}

