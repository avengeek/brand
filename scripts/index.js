class Products {
    constructor(source){
        this.source = source;
        this.container = '#product';
        this.items = []; //Массив со всеми товарами
        this._init();
    }
    _render(){
    	let $productsTitle = $('<h3/>', {
    	    class: 'product-title',
    	    text: 'Featured Items'
    	});
    	let $productsDesc = $('<p/>', {
    		class: 'product-desc',
    		text: 'Shop for items based on what we featured in this week'
    	});
    	$(this.container).prepend($productsDesc);
    	$(this.container).prepend($productsTitle);
    }
    _init(){
    	this._render();
    	fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.index){
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
		$img.appendTo($desc);
		$buyBtn.appendTo($desc);
		$name.appendTo($desc);
		$price.appendTo($desc);
		$desc.appendTo($wrapper);
		$(this.container).append($wrapper);
		$(`.buyBtn[data-id="${product.pr_id}"]`).click(e => {
		  e.preventDefault();
		  new Cart(product);
		});
    }
}