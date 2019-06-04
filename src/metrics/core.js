var metrics = {};
var listeners = [];

function watchMetrics(observer) {
    for( let metric in metrics ) {
        observer(metric, metrics[metric]);
    }
    listeners.push(observer);
}

function addMetrics(name, obj) {
    metrics[name] = obj;
    listeners.forEach(obs => obs(name, obj));
}


loadScript('metrics/Github.js');

const fillMetricsTemplateId = "fill-metrics-template";
const __fill_metrics_template = `
<div class="form-group form-check">
    <input type="checkbox" class="form-check-input"/>
    <label class="form-check-label"></label>
</div>`;

customElements.define('fill-metrics', class extends HTMLElement {
    constructor() {
        super();

        this.pre = (this.getAttribute('pre') || 'metrics') + '-';
    }

    connectedCallback() {
        watchMetrics(this.updateMetrics.bind(this));
    }

    updateMetrics(name, obj) {
        console.log('got metrics from: ' + name);
        for( let metric in obj ){
            console.log("> " + metric);
            this.addMetric(name, metric)
        }   
    }

    addMetric(name, metric) {
        let template = document.getElementById(fillMetricsTemplateId);
        if(!template) {
            template = document.createElement("template");
            template.id = fillMetricsTemplateId;
            template.innerHTML = __fill_metrics_template;
            document.body.appendChild(template);
        }
        let checkbox = document.importNode(template.content, true).lastChild;
        let input = checkbox.children[0];
        let label = checkbox.children[1];
        // console.log(input);
        // console.log(label);
        input.id = "" + name + "-" + metric;
        label.setAttribute("for", "" + name + "-" + metric);
        label.innerText = metric;

        this.appendChild(checkbox);
    }
});