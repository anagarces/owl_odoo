/** @odoo-module **/

import { reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

const RELOAD_INTERVAL = 10 * 1000; // 10s para probar, luego 10 * 60 * 1000 para 10 min

const statisticsService = {
    async start(env) {
        const statistics = reactive({});

        async function loadStatistics() {
            const result = await rpc("/awesome_dashboard/statistics");
            Object.assign(statistics, result);
        }

        await loadStatistics();
        setInterval(loadStatistics, RELOAD_INTERVAL);

        return statistics;
    },
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);