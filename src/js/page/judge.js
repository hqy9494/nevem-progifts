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
      this.state.$btn.on('tap', (e) => {
        const token = this.params['token']

        this.fetchMe(token).then(v => {
          if (!v) return

          if (!v.enabled) {
            alert('用户已禁用')
          }else{
            if (!this.params['qrCode']) return

            this.fetchQrCode(this.params).then(v => {
              if (v) window.location.href = `./judgeStatus.html?status=success`
            })
          }
        })

      })
    }
    fetchMe() {
      return this.fetch({
        url: `accounts/me`,
        method: 'get'
      })
    }
    fetchQrCode(params) {
      return this.fetch({
        url: `/Logins/qr/code`,
        method: 'post',
        params
      })
    }
  }

  new list()
});
