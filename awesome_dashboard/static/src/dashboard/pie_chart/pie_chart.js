/** @odoo-module **/

import { Component, useRef, onWillStart, onMounted } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        data: Object,
    };

    setup() {
        this.canvasRef = useRef("canvas");

        onWillStart(async () => {
            await loadJS("/web/static/lib/Chart/Chart.js");
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: Object.keys(this.props.data),
                datasets: [
                    {
                        data: Object.values(this.props.data),
                    },
                ],
            },
        });
    }
}