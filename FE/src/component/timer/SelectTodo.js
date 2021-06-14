import { findNode } from "../../util.js";

export default function SelectTodo({ initialState, onSelect }){
    this.state = initialState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'timer-sel';
        this.$element.innerHTML = 
        `
        <div id="selected"></div>
        <div id="sel-list"></div>
        `
    })();

    this.setState = (nextState) => {
        if(JSON.stringify(this.state) === JSON.stringify(nextState)){
            return;
        }
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        let isFirst = true;
        let firstStr = '';
        const firstTarget = {
            id : '',
            name : ''
        }
        const htmlString = this.state.todo.map((item) =>{
            if(item.isCompleted){
                  return ''
            } 

            if(isFirst) {
                firstTarget.id = item._id;
                firstTarget.name = item.content;
                firstStr = `<span id="${item._id}">${item.content}</span>`
                isFirst = false;
            }

            return `<li id="${item._id}">${item.content}</li>`
        }).join('');
        
        this.$element.querySelector('#selected').innerHTML = firstStr;
        this.$element.querySelector('#sel-list').innerHTML = `<ul>${htmlString}</ul>`;
        onSelect({
            id : firstTarget.id,
            name : firstTarget.name,
        });
    };

    const attachEvent = (() => {
        const $selected = this.$element.querySelector('#selected');
        document.querySelector('#app').addEventListener('click', (e) => {
            //외부 클릭 시 콤보박스 사라짐
            let breakNum = findNode($selected.childNodes, e.target);
            if(e.target === $selected) breakNum++;
            if(breakNum === 0) $selected.classList.remove('click');
        });
        $selected.addEventListener('click', (e) => {
            $selected.classList.toggle('click');
        });

        const $list = this.$element.querySelector('#sel-list')
        $list.addEventListener('click', (e) => {
            onSelect({
                id : e.target.id,
                name : e.target.textContent
            });
            $selected.innerHTML = `<span id=${e.target.id}>${e.target.textContent}</span>`;
            $selected.classList.toggle('click');
        });
    })();
    
    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    };
}