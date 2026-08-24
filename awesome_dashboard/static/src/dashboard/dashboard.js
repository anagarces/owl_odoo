/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { browser } from "@web/core/browser/browser";
import { DashboardItem } from "./dashboard_item/dashboard_item";
import { PieChart } from "./pie_chart/pie_chart";
import { DashboardSettingsDialog } from "./settings_dialog/settings_dialog";

const LOCAL_STORAGE_KEY = "awesome_dashboard.removed_item_ids";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, DashboardItem, PieChart };

    setup() {
        this.display = { controlPanel: {} };
        this.action = useService("action");
        this.dialog = useService("dialog");
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        this.allItems = registry.category("awesome_dashboard").getAll();
        this.state = useState({ removedItemIds: this.loadRemovedItemIds() });
    }

    get items() {
        return this.allItems.filter((item) => !this.state.removedItemIds.includes(item.id));
    }

    loadRemovedItemIds() {
        const stored = browser.localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    openCustomers() {
        this.action.doAction("base.action_partner_form");
    }

    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: _t("Leads"),
            res_model: "crm.lead",
            views: [[false, "list"], [false, "form"]],
        });
    }

    openSettings() {
        this.dialog.add(DashboardSettingsDialog, {
            items: this.allItems,
            removedItemIds: this.state.removedItemIds,
            onApply: (removedItemIds) => {
                this.state.removedItemIds = removedItemIds;
                browser.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(removedItemIds));
            },
        });
    }
}

registry.category("lazy_components").add("Dashboard", AwesomeDashboard);
