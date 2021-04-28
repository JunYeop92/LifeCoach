export default function Loading({$target, initialState}){
    this.state = initialState;
    this.$element = document.createElement('div');

    this.initialize = () => {
        this.$element.id = 'loading';
        this.$element.innerHTML='<span><i class="fas fa-fan fa-spin fa-6x"></i></span>'
        $target.appendChild(this.$element);
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        this.$element.style.display = this.state.isLoading ? 'flex' : 'none';
    }

    this.initialize();
}