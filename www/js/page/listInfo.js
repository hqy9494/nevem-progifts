document.addEventListener('DOMContentLoaded', function(){
  class listInfo extends parent{
    constructor(){
      super()
      
      this.state = {
        data: [],
        $ruleBox: $('#js-rule-box'),
        $arrowTop: $('#js-scroll-top'),
      }
			
      // 初始化
      this.init()
    }
    init(){
      this.load()

      this.ready()
    }
   	load(){
			this.fetchData().then(res => {
//				console.log(res)
				
				this.state.data = res;
				this.render(res);
				this.ready();
			})
			
    }
   	fetchData() {
      return this.getJSON({
        url: `assets/rule.json`,
      })
    }
    ready(){
			this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
    }

    createListFragment(arr){
      let fragment = document.createDocumentFragment();
      if(arr[0].content){
      	console.log(arr[0].content)
      	let html = `<div class="urle-content">${arr[0].content}</div>`
      	fragment.appendChild($(html)[0])
      }
//    return fragment
    } 
    render(arr = []){
      let fragment = this.createListFragment(arr);
      this.state.$ruleBox.append(fragment);
    }
  }

  new listInfo()
})

//# sourceMappingURL=listInfo.js.map
