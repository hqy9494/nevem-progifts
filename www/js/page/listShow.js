document.addEventListener('DOMContentLoaded', function () {
  class listShow extends parent {
    constructor() {
      super()
      this.state = {
        $page: $('#js-page'),
        limit: 10,
        skip: 0,
        isFetch: false,
        alwayNum: 0,
        noNum: 0,
        sumNum: 847,

        $sumNum: $('#js-sumNum'),
        $alwayNum: $('#js-alwayNum'),
        $noNum: $('#js-noNum'),
        
        data1: [],
        $data1: $('#js-data1'),

        // data2: [],
        // $data2: $('#js-data2'),

        // data3: [],
        // $data3: $('#js-data3'),

        // data4: [],
        // $data4: $('#js-data4'),

        list: [],
        $list: $('#js-list'),
        $arrowTop: $('#js-scroll-top'),
      };
      this.init()

      this.addMore(this.fetchList.bind(this))

      setInterval(() => {
        this.fetchData1()
      }, 1000 * 5 * 60)
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
      
      this.fetchData1()

      // this.fetchData2().then(res => {
      //   this.state.data2 = res

      //   let fragment = this.createListFragment(res, (v) => {
      //     return `
      //       <div class="listShow-scroll-item-wrap">
      //         <div class="listShow-scroll-item">
      //           <img src="assets/img/git.png" alt="img">
      //           <span>${v.user && v.user.nickname || '幸运儿'}</span>
      //           <span>${moment(v.createdAt).fromNow()}</span>
      //           <span class="listShow-scroll-item-font">抽中${v.materialAward && v.materialAward.name}</span>
      //         </div>
      //       </div>
      //     `
      //   })
      //   this.state.$data2.append(fragment)
      // })

      // this.fetchData3().then(res => {
      //   this.state.data3 = res

      //   let fragment = this.createListFragment(res, (v) => {
      //     return `
      //       <div class="listShow-scroll-item-wrap">
      //         <div class="listShow-scroll-item">
      //           <img src="assets/img/red.png" alt="img">
      //           <span>${v.user && v.user.nickname || '幸运儿'}</span>
      //           <span>${moment(v.createdAt).fromNow()}</span>
      //           <span class="listShow-scroll-item-font">抽中${v.value || 0}元红包</span>
      //         </div>
      //       </div>
      //     `
      //   })
      //   this.state.$data3.append(fragment)
      // })

      // this.fetchData4().then(res => {
      //   this.state.data4 = res

      //   let fragment = this.createListFragment(res, (v) => {
      //     return `
      //       <div class="listShow-scroll-item-wrap">
      //         <div class="listShow-scroll-item">
      //           <img src="assets/img/iphone.png" alt="img">
      //           <span>${v.user && v.user.nickname || '幸运儿'}</span>
      //           <span>${moment(v.createdAt).fromNow()}</span>
      //           <span class="listShow-scroll-item-font">${v.value || 0}优惠券</span>
      //         </div>
      //       </div>
      //     `
      //   })
      //   this.state.$data4.append(fragment)
        
      // })

      this.fetchList()
      
      this.ready()
    }
    ready() {
      this.state.$arrowTop.on('tap', () => {
        //滚动顶部
        this.scrollTop();
      })
    }
    awardType(v){
      if (v.awardType === 'material') return v.materialAward && v.materialAward.name
      if (v.awardType === 'taobao_coupon') return `${v.value || 0}元优惠券`
      if (v.awardType === 'regular_red_bag' || v.awardType === 'virtual_red_bag') return `${v.value}元红包`
      if (v.awardType === 'buy_times_award') return v.buyTimesAward && v.buyTimesAward.name
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
        // params: {
        //   type: 'buy_times_award'
        // }
      }).then(res => {
        this.state.data1 = res
        this.state.$data1.empty()

        let fragment = this.createListFragment(res, (v) => {
          return `
            <div class="listShow-scroll-item-wrap">
              <div class="listShow-scroll-item">
                <img src="assets/img/git.png" alt="img">
                <span>${v.user && v.user.nickname || '幸运儿'}</span>
                <span>${moment(v.createdAt).fromNow()}</span>
                <span class="listShow-scroll-item-font">抽中${this.awardType(v)}</span>
              </div>
            </div>
          `
        })

        this.state.$data1.append(fragment)

        // const height = this.state.$data1.height()

        // var tt=document.styleSheets[0];
        // tt.deleteRule(6);//清除之前写入的动画样式
        // tt.insertRule(`
        //   @keyframes toTop{
        //     0%{top: 0;} 
        //     100%{top: -${height / 7.5}vw}
        //   }
        // `,6);
        // $('.listShow-title')[0].style.animate = 'toTop 300s linear infinite'
      })
    }
    // fetchData2() {
    //   return this.fetch({
    //     method: 'get',
    //     url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
    //     params: {
    //       type: 'material'
    //     }
    //   })
    // }
    // fetchData3() {
    //   return this.fetch({
    //     method: 'get',
    //     url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
    //     params: {
    //       type: 'virtual_red_bag'
    //     }
    //   })
    // }
    // fetchData4() {
    //   return this.fetch({
    //     method: 'get',
    //     url: `${this.baseUriApi}/awardrecords/getCurrentAwardRecords`,
    //     params: {
    //       type: 'taobao_coupon'
    //     }
    //   })
    // }
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
        // console.log(this.state.list, res, 'data')
        // const data = [...this.state.list, ...res]
        const data = res
        
        // this.state.$list.empty()
        // this.state.list = data

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
    // render(arr = []){
    //   let fragment = this.createListFragment(arr)
    //   this.state.$list.append(fragment)
    // }
  }

  new listShow()
});

//# sourceMappingURL=listShow.js.map
