document.addEventListener('DOMContentLoaded', function () {
  class list extends parent {
    constructor() {
      super()
      this.state = {
        data: [],
        $list: $('#js-list')
      };
      this.init()
    }

    init() {
      this.load()
    }

    load() {
      this.fetchData().then(res => {
        this.state.data = res
        this.render(res)

        this.ready()
      })
    }
    ready() {
      this.state.$list.on('tap', (e) => {
        const parent = $(e.target).parents('.list-itemWrap')[0]
        const detail = $(parent).data('detail')

        window.location.href = `./listDetail.html?img=${detail}`
      })
    }
    fetchData() {
      return this.getJSON({
        url: `assets/p.json`,
      })
    }
    createListFragment(arr){
      let fragment = document.createDocumentFragment()
      arr.forEach((v) => {
        let html = `
          <div class="list-itemWrap" data-detail="${v.detailPic}">
            <div class="list-item">
              <div class="list-imgWrap">
                <img src="${v.mainPic}" alt="top"/>
              </div>
              <div class="list-name">${v.name}</div>
              <div class="list-money">零售价：${v.price}</div>
              <div class="list-btn">查看更多</div>
            </div>
          </div>
        `
        fragment.appendChild($(html)[0])
      })

      return fragment
    }
    render(arr = []){
      let fragment = this.createListFragment(arr)
      this.state.$list.append(fragment)
    }
  }

  new list()
});
