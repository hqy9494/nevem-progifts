document.addEventListener('DOMContentLoaded', function(){
  class listInfo extends parent{
    constructor(){
      super()
      
      this.state = {
        arr: [],
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

    }
    ready(){
			this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
    }

    createListFragment(){
      
    } 
    render(){
      
    }
  }

  new listInfo()
})
