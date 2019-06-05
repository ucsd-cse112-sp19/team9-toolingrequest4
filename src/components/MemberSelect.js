class MemberSelect extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.selector = document.createElement('select');
        this.selector.name = "members";
        this.appendChild(this.selector);

        chrome.storage.sync.get(['members'], (data) => {
            if( data['members']) {
                this.populate(JSON.parse(data['members']));
            } else {
                chrome.storage.sync.set({'members': '[]'});
            }
        });
    }

    populate(members) {
        members.forEach((member) => {
            let option = document.createElement('option');
            option.innerText = member;
            option.value = member;
            this.selector.appendChild(option);
        });
    }
}

customElements.define('member-select', MemberSelect);