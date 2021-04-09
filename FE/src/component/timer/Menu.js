export default function Menu({$target, onClick}){
    this.state;
    this.$element = document.createElement('div');

    this.initialize = async () => {
        this.$element.id = 'menu';
        this.$element.innerHTML = 
        `<div id='focus' class='item active'>FOCUS</div>
        <div id='today' class='item'>TODAY</div>
        <div id='weekly' class='item'>WEEKLY</div>`;
        $target.appendChild(this.$element);
    };

    this.render = () => {};
    this.setState = () => {};

    this.attachEvent = () => {
        //바로 밑 코드는 NodeList를 반환(element 객체가 아님 -> '$'를 안붙임)
        const menuList = this.$element.querySelectorAll('.item');
        menuList.forEach(ele => {
            ele.addEventListener('click', event => {
                onClick(event.target.id);
                menuList.forEach(ele2 => {
                    ele2.classList.remove('active');
                })
                ele.classList.add('active');
            })
        })
    };

    this.initialize();
    this.attachEvent();
}