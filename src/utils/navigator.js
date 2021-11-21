import { page } from "stores/stores.js"

export function moveToPage(to) {
    page.update(() => {
        return to;
    });
};