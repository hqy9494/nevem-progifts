document.addEventListener('DOMContentLoaded', function () {
  class listAward extends parent {
    constructor() {
      super()
      this.state = {
        data: [],
        $to: $('#js-to'),
        $arrowTop: $('#js-scroll-top'),
      };
      
      this.state.$to.on('tap', () => {
        window.location.href = `./listInfo.html`
      })
      
      this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
      
    }
  }

  new listAward()
});

//# sourceMappingURL=listAward.js.map
