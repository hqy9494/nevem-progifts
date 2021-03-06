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

        $prize: $('#js-prize'),
        $prize2: $('#js-prize2')
      };
      this.init()

      this.addMore(this.fetchList.bind(this))
    }
    init() {
      this.load()
    }
    load() {
      this.fetchList()
      this.getPredictClassAwards().then(v => {
        this.renderPrize(this.state.$prize, v)
      })

      this.getTodayClassAwards().then(v => {
        this.renderPrize(this.state.$prize2, v)
      })

      this.ready()
    }
    ready() {
      this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
    }
    getTodayClassAwards(){
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/classAwardRecords/getTodayClassAwards`,
      })
    }
    getPredictClassAwards(){
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/classAwardRecords/getPredictClassAwards`,
      })
    }
    sum(v){
      if (!v.awards || !Array.isArray(v.awards)) return 0
      var sum = 0
      v.awards.forEach(k => {
        if (!k || !k.childAwards || !Array.isArray(k.childAwards)) return

        if (k.name === '一等奖') {
          for (let i = 0; i < k.childAwards.length; i++) {
            if (i === 0 && k.childAwards[i]) {
              sum += k.childAwards[i].count
            }
          }
        }

        if (k.name === '二等奖' || k.name === '三等奖') {
          for (let i = 0; i < k.childAwards.length; i++) {
            if (i < 3 && k.childAwards[i]) {
              sum += k.childAwards[i].count
            }
          }
        }
      })

      return sum
    }
    renderPrizeItem(v, isPicture){
      if (!v || !Array.isArray(v)) return ''
      var html = ''

      v.forEach(k => {
        html += `
          <div class="showPrize-expected-item">
            ${isPicture ? `<img src=${k.picture || ''} alt="img">` : ''}
            <div class="showPrize-expected-item-name">${k.name || ''}</div>
            <div class="showPrize-expected-item-num">总共：${k.count || 0}个</div>
          </div>
        `
      })

      return html
    }
    renderPrize(dom, v){
      let fragment = document.createDocumentFragment()
      fragment.appendChild($(`<div class="showPrize-expected-num">${v ? this.sum(v) : 0}</div>`)[0]);
      fragment.appendChild($(`
          <div class="showPrize-expected-content">
            <div class="showPrize-expected-prize1">
              ${
                v && v.awards && v.awards[1] && v.awards[1].childAwards ? `${this.renderPrizeItem(v.awards[1].childAwards.slice(0, 3), false)}` : ''
              }
            </div>
            <div class="showPrize-expected-prize2">
              ${
                v && v.awards && v.awards[0] && v.awards[0].childAwards ? `${this.renderPrizeItem(v.awards[0].childAwards.slice(0, 2), true)}` : ''
              }
            </div>
            <div class="showPrize-expected-prize3">
              ${
                v && v.awards && v.awards[2] && v.awards[2].childAwards ? `${this.renderPrizeItem(v.awards[2].childAwards.slice(0, 3), false)}` : ''
              }
            </div>
          </div>
        `)[0])
      dom.append(fragment)
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
