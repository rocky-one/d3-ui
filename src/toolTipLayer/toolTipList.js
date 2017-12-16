import './toolTipLayerStyle.scss';

 const toolTipList =function(data,series) {
        let list = '';
        for (let [key, value] of Object.entries(data)) {
            list += `<li class='tooltip-li'>${key} : ${value}</li>`
        }
        let cont = `<div class='tooltip-cont'>
            <ul>${list}</ul>
        </div>`;
        return cont;
    }


export default toolTipList;
