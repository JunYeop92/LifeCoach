export default function TodoList({ initalState, onCheck, onDelete}) {
    this.state = initalState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'todo-list';
    })();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        // validDataList(this.state.todo); //데이터 검증
        const htmlString = this.state.todo.map((item) =>
            `
            <li id="${item._id}">  
                ${item.isCompleted ? `<input type='checkbox' checked> <s>${item.content}</s>` 
                                : `<input type='checkbox'/> ${item.content}`} 
                <button id="${item._id}">삭제</button> 
            </li>`
        ).join('')
        this.$element.innerHTML = `<ul>${htmlString}</ul>`
    }

    const attachEvent = (() => {
        this.$element.addEventListener("click", (event) => {
            const eTaget = event.target;
            if (eTaget.tagName === "BUTTON") {
                onDelete(eTaget.id);
            } else if (eTaget.tagName === "LI") {
                onClick(eTaget.id);
            } else if (eTaget.tagName === "S") {
                onClick(eTaget.parentNode.id);
            }
        })
    })();
    
    this.attachNode = ($target) => {
        $target.appendChild(this.$element)
    }
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