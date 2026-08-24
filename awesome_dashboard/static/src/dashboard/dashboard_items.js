/** @odoo-module **/

import { registry } from "@web/core/registry";
import { NumberCard } from "./number_card/number_card";
import { PieChartCard } from "./pie_chart_card/pie_chart_card";

const dashboardItemRegistry = registry.category("awesome_dashboard");

dashboardItemRegistry
    .add("nb_new_orders", {
        id: "nb_new_orders",
        description: "Orders",
        Component: NumberCard,
        props: (statistics) => ({ title: "Orders", value: statistics.nb_new_orders }),
    })
    .add("total_amount", {
        id: "total_amount",
        description: "Total amount",
        Component: NumberCard,
        props: (statistics) => ({ title: "Total", value: statistics.total_amount }),
    })
    .add("average_quantity", {
        id: "average_quantity",
        description: "Average t-shirts/order",
        Component: NumberCard,
        props: (statistics) => ({
            title: "Average t-shirts/order",
            value: statistics.average_quantity,
        }),
    })
    .add("nb_cancelled_orders", {
        id: "nb_cancelled_orders",
        description: "Cancelled orders",
        Component: NumberCard,
        props: (statistics) => ({ title: "Cancelled", value: statistics.nb_cancelled_orders }),
    })
    .add("average_time", {
        id: "average_time",
        description: "Avg. delivery time (days)",
        Component: NumberCard,
        props: (statistics) => ({
            title: "Avg. delivery time (days)",
            value: statistics.average_time,
        }),
    })
    .add("orders_by_size", {
        id: "orders_by_size",
        description: "Orders by size",
        size: 2,
        Component: PieChartCard,
        props: (statistics) => ({ title: "Orders by size", data: statistics.orders_by_size }),
    });
