class TogglerButton extends HTMLElement {
    get target() {
        return this.getAttribute('target');
    }
    get value() {
        return this.getAttribute('value');
    }
    constructor() {
        super();
        this.state = false;
    }

    connectedCallback(){
        this.addEventListener('click', this.onclick);
    }

    onclick(e){
        if( this.target && this.value ) {
            let target = document.getElementById(this.target);
            if( this.state ) {
                target.classList.remove(this.value);
                this.state = false;
            } else {
                target.classList.add(this.value);
                this.state = true;
            }
        }
    }
}

customElements.define('toggler-btn', TogglerButton);