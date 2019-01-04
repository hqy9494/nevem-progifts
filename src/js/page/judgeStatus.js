document.addEventListener('DOMContentLoaded', function () {
  class list extends parent {
    constructor() {
      super()
      this.state = {
        data: [],
        $imgSuccess: $('#js-img-success'),
        $imgError: $('#js-img-error'),
        $font: $('#js-font')
      };
      this.init()
    }

    init() {
      this.ready()
    }

    ready() {
      const status = this.params['status']

      if (status === 'success') {
        this.state.$imgSuccess.show()
        this.state.$imgError.hide()
        this.state.$font.text('微信授权登录成功')
      } else {
        this.state.$imgSuccess.hide()
        this.state.$imgError.show()
        this.state.$font.text('您的扫描二维码已经过期，请在电脑刷新二维码，重新扫描')
      }
    }
  }

  new list()
});
