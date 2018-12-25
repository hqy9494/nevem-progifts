document.addEventListener('DOMContentLoaded', function () {
  class showPrize extends parent {
    constructor() {
      super()
      this.state = {
        $page: $('#js-page'),
        limit: 10,
        skip: 0,
        isFetch: false,

        list: [],
        $list: $('#js-list'),
        $arrowTop: $('#js-scroll-top'),
      };
      this.init()

      // this.addMore(this.fetchList.bind(this))
    }
    init() {
      this.load()
    }
    load() {
      // this.fetchList()
      this.ready()
    }
    ready() {
      this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
    }
    fetchList() {
      this.state.isFetch = true

      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/posts`,
        params: {
          filter: {
            type: 2,
            limit: 10,
            skip: this.state.skip
          }
        },
      }).then(res => {
        if (!res) return
        const data = res

        if (!data) return

        let fragment = this.createListFragment(data, (v) => {
          return v && `
            <div class="listShow-user">
              <div class="listShow-left">
                <img src=${v.user && v.user.avatar || 'assets/img/avatar.png'} alt="img">
              </div>
              <div class="listShow-right">
                <div class="listShow-right-name">${v.user && v.user.avatar && v.user.avatar.nickname || '中奖用户'}</div>
                <div class="listShow-right-content">${v.titleRaw || ''}</div>
                ${v.images ? `<div class="listShow-right-img"><img src="${v.images && v.images[0]}" alt="img"></div>` : ''}
              </div>
            </div>
          `
        })
        this.state.$list.append(fragment)

        this.state.skip = this.state.skip + this.state.limit
        this.state.isFetch = false
      })
    }
    addMore(cb) {
      const wh = window.screen.height;
      document.addEventListener("scroll", e => {
        let lh = this.state.$page.height();
        const sh = document.body.scrollTop || e.target.documentElement.scrollTop
        if (sh + wh > lh && !this.state.isFetch) cb && cb();
      });
    }

    createListFragment(arr, cb){
      let fragment = document.createDocumentFragment()
      arr.forEach((v) => {
        let html = cb && cb(v)
        fragment.appendChild($(html)[0])
      })

      return fragment
    }
  }

  new showPrize()
});
