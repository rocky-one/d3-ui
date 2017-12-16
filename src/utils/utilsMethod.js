const windowClient = function() {
    return {
        clientWidth:document.documentElement.clientWidth,
        clientHeight:document.documentElement.clientHeight
    }
}
const getBoundingClientRects = function(ele) {
    return ele.getBoundingClientRect();
}
const windowScroll = function() {
    return {
        scrollLeft:document.body.scrollLeft,
        scrollTop:document.body.scrollTop
    }
}
const boundary = function(x,y,ele) {
    let client = windowClient();
    let clientRect = getBoundingClientRects(ele);
    let scroll = windowScroll();
    let xs = clientRect.left;
    let ys = clientRect.top;
    let noScrollX = x - scroll.scrollLeft;
    let noScrollY = y -scroll.scrollTop;
    y = y - (clientRect.height)-30;

    let rightBs = noScrollX + clientRect.width; // 当前可视区域的坐标X + 当前元素的宽度 
    let rightBpx = rightBs - client.clientWidth; // 当前元素右下角坐标到可视区域左上角的水平距离 - 当前可视区域的宽度   
    if( rightBpx > 0){ // rightBpx>0 说明超过右侧的边界
        x = x - clientRect.width;
    }
    return {
        x:x,
        y:y
    }
};

const chartColor =['#1C86EE','#B3EE3A','#CD00CD','#EE6A50','#EEC900','#A0522D'];

export {
    boundary,
    windowClient,
    getBoundingClientRects,
    chartColor,
    windowScroll
};
