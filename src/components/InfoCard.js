const infoCardTemplateId = "info-card-template";

const __template = `
<div class="card">
    Name
</div>
`;

class InfoCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let template = document.getElementById(infoCardTemplateId);
        if(!template) {
            template = document.createElement("template");
            template.id = infoCardTemplateId;
            template.innerHTML = __template;
            document.body.appendChild(template);
        }
        console.log(template)
        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('info-card', InfoCard);