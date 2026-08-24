/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { _t } from "@web/core/l10n/translation";

export class DashboardSettingsDialog extends Component {
    static template = "awesome_dashboard.SettingsDialog";
    static components = { Dialog };
    static props = {
        close: Function,
        items: Array,
        removedItemIds: Array,
        onApply: Function,
    };

    setup() {
        this.title = _t("Dashboard settings");
        this.state = useState({
            checked: Object.fromEntries(
                this.props.items.map((item) => [
                    item.id,
                    !this.props.removedItemIds.includes(item.id),
                ])
            ),
        });
    }

    toggle(itemId) {
        this.state.checked[itemId] = !this.state.checked[itemId];
    }

    onApply() {
        const removedItemIds = this.props.items
            .map((item) => item.id)
            .filter((id) => !this.state.checked[id]);
        this.props.onApply(removedItemIds);
        this.props.close();
    }
}
