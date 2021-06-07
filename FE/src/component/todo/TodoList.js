export default function TodoList({ initalState, onCheck, onDelete}) {
    this.state = initalState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'todo-list';
    })();

    this.setState = (nextState) => {
        if(JSON.stringify(this.state) === JSON.stringify(nextState)){
            return;
        }
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        // validDataList(this.state.todo); //데이터 검증
        const htmlString = this.state.todo.map((item) =>
            `
            <li id="${item._id}">  
                ${item.isCompleted ? `<span class='toggle'><i class="fas fa-check-circle"></i></span> <s>${item.content}</s>` 
                                : `<span class='toggle'><i class="far fa-circle"></i></span> ${item.content}`} 
                <span class='del'><i class="far fa-trash-alt"></i></span> 
            </li>`
        ).join('')
        this.$element.innerHTML = `<ul>${htmlString}</ul>`
    }

   

    const attachEvent = (() => {
        const eventMap = {
            svg : (e) => {
                const $ele = e.target.parentNode
                eventMap2[$ele.className]($ele);
            },
            path : (e) => {
                const $ele = e.target.parentNode.parentNode
                eventMap2[$ele.className]($ele);
            }
        }

        const eventMap2 = {
            toggle : ($ele) => {
                onCheck($ele.parentNode.id);
            },
            del : ($ele) => {
                onDelete($ele.parentNode.id);
            }
        }

        const otherWise = () => {
            console.log('otherwise');
        };

        this.$element.addEventListener("click", (e) => {
            (eventMap[e.target.tagName] || otherWise)(e);
        })
    })();
    
    this.attachNode = ($target) => {
        $target.appendChild(this.$element)
    }
    // this.render();
   
}

// const validDataList = (dataList) => {
//     if (dataList === null || dataList === undefined) {
//         throw new Error('파라미터가 null 이거나 undefined 입니다.');
//     }

//     if (!Array.isArray(dataList)) {
//         throw new Error('파라미터가 배열이 아닙니다.');
//     }

//     //배열이면 데이터 내용 검사
//     dataList.forEach(({
//         text,
//         isCompleted
//     }) => {
//         if ((typeof (text) !== 'string') && (typeof (isCompleted) !== 'boolean')) {
//             throw new Error('파라미터 타입이 올바르지 않습니다.');
//         }
//     })
// }