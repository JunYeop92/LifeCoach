import { toHourMinFormat } from "../../util.js";
import { findNode } from "../../util.js";

export default function FocusRecord({ initialState }) {
    this.state = initialState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'record';
        this.$element.innerHTML = 
        `<div class="dropdown">
            <div class="dropbtn">
                <span><i class="fas fa-history" id="record-menu"></i></span>
            </div>
            <div class="dropdown-list">
                <div id='title'>카테고리</div>
                <ul id="list"></ul>
            </div>
        </div>`;
    })();

    this.setState = (nextState) => {
        if(JSON.stringify(this.state) === JSON.stringify(nextState)){
            return;
        }
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        let oldYmd = 0;
        const htmlString = this.state.recordList
            .map(({ todoId, ymd, endDate, startDate, totalTime }) => {
                let str = '';
                if (ymd !== oldYmd) {
                    str = `<li class='ymd'>${ymd}</li>`;
                    oldYmd = ymd;
                }
                str += `<li class='date'>
                            <span>${todoId.content}</span>
                            <span>${toHourMinFormat(startDate)} ~ ${toHourMinFormat(endDate)}</span>
                            <span>${totalTime}</span>
                        </li>`;
                return str;
            })
            .join('');
   
        this.$element.querySelector('.dropdown-list #list').innerHTML = (htmlString || `<li>이력없음<li>`);
    };

    const attachEvent = (() => {
        const $dropBtn = this.$element.querySelector('.dropbtn');
        const $dropList = this.$element.querySelector('.dropdown-list');
        document.querySelector('#app').addEventListener('click', (e) => {
            //외부 클릭 시 드롭박스 사라짐
            let breakNum = findNode($dropBtn.childNodes, e.target);
            breakNum += findNode($dropList.childNodes, e.target);
            if(e.target === $dropBtn) breakNum++;
            if(breakNum === 0) $dropBtn.classList.remove('click');
        });

        
        $dropBtn.addEventListener('click', (e) => {
            $dropBtn.classList.toggle('click');
        });
    })();

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    }
}