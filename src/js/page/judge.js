document.addEventListener('DOMContentLoaded', function () {
  class list extends parent {
    constructor() {
      super()
      this.state = {
        data: [],
        $btn: $('#js-submit'),
      };
      this.init()
    }

    init() {
      this.ready()
    }

    ready() {
      this.state.$btn.on('click', (e) => {
        this.fetchQrCode(this.params).then(v => {
          window.location.href = `./judgeStatus.html?status=${v && v.stat ? 'success' : 'error'}`
        })
      })
    }
    fetchQrCode(params) {
      return this.fetch({
        url: `${this.baseUri}/wx/login/qrCode/token`,
        method: 'get',
        params
      })
    }
  }

  new list()
});
