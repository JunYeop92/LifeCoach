//익명 생성자 함수
const loading = new function(){
    this.state = false;
    this.$element = document.createElement('div');

    const initialize = (() => {
        this.$element.id = 'loading';
        this.$element.innerHTML='<span><i class="fas fa-fan fa-spin fa-6x"></i></span>'
    })();

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$element.style.display = this.state ? 'flex' : 'none';
    }

    const attachNode = (() => {
        const $root = document.querySelector('#app');
        $root.appendChild(this.$element)
    })();
};

export default loading;