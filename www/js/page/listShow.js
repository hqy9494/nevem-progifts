document.addEventListener('DOMContentLoaded', function () {
  class listShow extends parent {
    constructor() {
      super()
      this.state = {
        $page: $('#js-page'),
        alwayNum: 0,
        noNum: 0,
        sumNum: 847,

        $sumNum: $('#js-sumNum'),
        $alwayNum: $('#js-alwayNum'),
        $noNum: $('#js-noNum'),
        
        data1: [],
        $data1: $('#js-data1'),

        data2: [],
        $data2: $('#js-data2'),

        data3: [],
        $data3: $('#js-data3'),

        data4: [],
        $data4: $('#js-data4'),

        list: [],
        $list: $('#js-list')
      };
      this.init()
    }

    init() {
      this.load()
    }
    load() {
      this.fetchNum().then(res => {
        this.state.alwayNum = res || 0
        this.state.noNum = this.state.sumNum - (res || 0)
        
        // 数字信息
        this.state.$sumNum.text(this.state.sumNum)
        this.state.$alwayNum.text(this.state.alwayNum)
        this.state.$noNum.text(this.state.noNum)
      })
      
      this.fetchData1().then(res => {
        this.state.data1 = res

        let fragment = this.createListFragment(res, (v) => {
          return `
            <div class="listShow-scroll-item-wrap">
              <div class="listShow-scroll-item">
                <img src="assets/img/git.png" alt="img">
                <span>${v.user && v.user.nickname || '幸运儿'}</span>
                <span>${moment(v.createdAt).fromNow()}</span>
                <span class="listShow-scroll-item-font">${v.buyTimesAward && v.buyTimesAward.name}</span>
              </div>
            </div>
          `
        })
        this.state.$data1.append(fragment)
        
        // console.log(this.state.$data1, 'this.state.$data1')
        // this.state.$data1.animate({
        //   top: '50px',
        //   color: '#abcdef',
        //   rotateZ: '45deg', translate3d: '0,10px,0'
        // }, 500, 'ease-out')
        
        // console.log(this.state.$data1.height(), 'this.state.$data1')
      })

      this.fetchData2().then(res => {
        this.state.data2 = res

        let fragment = this.createListFragment(res, (v) => {
          return `
            <div class="listShow-scroll-item-wrap">
              <div class="listShow-scroll-item">
                <img src="assets/img/git.png" alt="img">
                <span>${v.user && v.user.nickname || '幸运儿'}</span>
                <span>${moment(v.createdAt).fromNow()}</span>
                <span class="listShow-scroll-item-font">${v.materialAward && v.materialAward.name}</span>
              </div>
            </div>
          `
        })
        this.state.$data2.append(fragment)
      })

      this.fetchData3().then(res => {
        this.state.data3 = res

        let fragment = this.createListFragment(res, (v) => {
          return `
            <div class="listShow-scroll-item-wrap">
              <div class="listShow-scroll-item">
                <img src="assets/img/git.png" alt="img">
                <span>${v.user && v.user.nickname || '幸运儿'}</span>
                <span>${moment(v.createdAt).fromNow()}</span>
                <span class="listShow-scroll-item-font">${v.value || 0}红包</span>
              </div>
            </div>
          `
        })
        this.state.$data3.append(fragment)
      })

      this.fetchData4().then(res => {
        this.state.data4 = res

        let fragment = this.createListFragment(res, (v) => {
          return `
            <div class="listShow-scroll-item-wrap">
              <div class="listShow-scroll-item">
                <img src="assets/img/git.png" alt="img">
                <span>${v.user && v.user.nickname || '幸运儿'}</span>
                <span>${moment(v.createdAt).fromNow()}</span>
                <span class="listShow-scroll-item-font">${v.value || 0}优惠券</span>
              </div>
            </div>
          `
        })
        this.state.$data4.append(fragment)
        
      })

      this.fetchList().then(res => {
        this.state.list = res
        if (!res) return 

        let fragment = this.createListFragment(res, (v) => {
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
      })
    }
    ready() {
      
    }
    fetchNum(){
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/awardrecords/getCurrentBuyTimesAwardCount`,
      })
    }
    fetchData1() {
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
        params: {
          type: 'buy_times_award'
        }
      })
    }
    fetchData2() {
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
        params: {
          type: 'material'
        }
      })
    }
    fetchData3() {
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
        params: {
          type: 'virtual_red_bag'
        }
      })
    }
    fetchData4() {
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
        params: {
          type: 'taobao_coupon'
        }
      })
    }
    fetchList() {
      return this.fetch({
        method: 'get',
        url: `${this.baseUriApi}/posts`,
        params: {
          filter: {
            where: {
              type: 2
            }
          }
        }
      })
    }
    addMore(cb) {
      const wh = window.innerHeight;

      document.addEventListener("scroll", e => {
          let lh = this.state.$page.height();
          if (e.target.documentElement.scrollTop + wh > lh) cb && cb();
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
    // render(arr = []){
    //   let fragment = this.createListFragment(arr)
    //   this.state.$list.append(fragment)
    // }
  }

  new listShow()
});

//# sourceMappingURL=listShow.js.map
