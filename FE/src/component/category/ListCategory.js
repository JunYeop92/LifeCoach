export default function ListCategory({ initialState, onDelete, onSelect }) {
    this.state = initialState;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'category';
        this.$element.innerHTML = 
        `<div class="dropdown">
            <div class="dropbtn">
                <span><i class="fas fa-bars" id="category-menu"></i></span>
            </div>
            <div class="dropdown-list">
                <ul id="list"></ul>
            </div>
        </div>`;
    })();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
        
        //초기 선택(첫번째만)
        this.$element.querySelector('.dropdown-list #list .item').classList.add('selected');
        onSelect({
            _id: this.state.list[0]._id,
            name: this.state.list[0].content,
        });
    };

    this.render = () => {
        const htmlString = this.state.list
            .map(
                (item) =>
                    `<li id='${item._id}'>
                        <span class='item'>${item.content}</span>
                        <button id='${item._id}'>삭제</button>
                    </li>`
            )
            .join('');
        this.$element.querySelector('.dropdown-list #list').innerHTML = 
            `<li id='title'>카테고리</li> ${htmlString}`;   
    };

    const attachEvent = (() => {
        const $dropbtn = this.$element.querySelector('.dropbtn')
        $dropbtn.addEventListener('click', (e) => {
            $dropbtn.classList.toggle('click');
        });


        
        const eventMap = {
            BUTTON: (e) => {
                onDelete(e.target.id);
            },
            SPAN: (e) => {
                //바로 밑 코드는 NodeList를 반환(element 객체가 아님 -> '$'를 안붙임)
                const resultList = this.$element.querySelectorAll('.item');
                resultList.forEach(ele => {
                    ele.classList.remove('selected');
                })
                e.target.classList.add('selected');
                
                onSelect({
                    _id: e.target.parentNode.id,
                    name: e.target.textContent,
                });
            },
        };
        const otherWise = () => {
            console.log('otherwise');
        };

        this.$element.addEventListener('click', (e) => {
            (eventMap[e.target.tagName] || otherWise)(e);
        });
    })();

    this.attachNode = ($target) => {
        $target.appendChild(this.$element);
    }
    
    // this.render();
}
