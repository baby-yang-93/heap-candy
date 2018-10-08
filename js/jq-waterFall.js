function WaterFall(num, pos, nauter) {
    this.pos = pos || window;
    this.$aUl = $('#context-h').find('ul');
    this.num = num || 25;
    this.data = null;
    this.init();
}
WaterFall.prototype = {
    init: function () {
        this.getData();
        this.creatLi();
        this.posSet();
    },
    getData: function () {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'json/data-waterFall.txt',
            async: false,
            dataType: 'json',
            success: function (val) {
                _this.data = val;
                console.log('瀑布流数据接收成功');
            },
            error: function (val) {
                if (val.responseText != '') {
                    console.log('瀑布流数据获取失败');
                    _this.data = val.responseText;
                }
            }
        });
    },
    creatLi: function () {
        var n = Math.round(Math.random() * 9);
        var $oLi = `<li><img src="${this.data[n].imgSrc}" alt=""><div class="context-h-down"><div class="context-h-a">${this.data[n].line1}</div><div class="context-h-b">${this.data[n].line2}</div><div class="context-h-c"><p>${this.data[n].line3}</p></div></div></li>`;
        return $oLi;
    },
    posSet: function () {
        for (var i = 1; i < this.num; i++) {
            console.log(i)
            this.$oLi = this.creatLi();
                var ary = $.makeArray(this.$aUl);
                ary.sort(function (a, b) {
                    return a.offsetHeight - b.offsetHeight;
                });
                ary[0].innerHTML+=this.$oLi
            }
    },
};

