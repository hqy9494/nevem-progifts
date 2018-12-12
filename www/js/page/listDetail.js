document.addEventListener('DOMContentLoaded', function () {
  class listDetail extends parent {
    constructor() {
      super()
      this.state = {
        data: [],
        $img: $('#js-img'),
        $arrowTop: $('#js-scroll-top'),
      };
      this.init()
      
    }

    init() {
      const params = this.params

      params && this.render([params.img])
      
      this.load()
    }
    
    load(){
    	this.ready()
    }
    
    ready(){
    	this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
    }

    createListFragment(arr){
      let fragment = document.createDocumentFragment()
      arr.forEach((v) => {
        let html = `
          <img src="${v}" alt="img" style="width: 100%; display: block">
        `
        fragment.appendChild($(html)[0])
      })

      return fragment
    }
    render(arr = []){
      let fragment = this.createListFragment(arr)
      this.state.$img.append(fragment)
    }
  }

  new listDetail()
});

//# sourceMappingURL=listDetail.js.map
