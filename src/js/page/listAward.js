document.addEventListener('DOMContentLoaded', function () {
  class listAward extends parent {
    constructor() {
      super()
      this.state = {
        data: [],
        $to: $('#js-to')
      };
      
      this.state.$to.on('tap', () => {
        window.location.href = `./listInfo.html`
      })
    }
  }

  new listAward()
});
