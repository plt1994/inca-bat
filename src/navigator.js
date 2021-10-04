import { page } from "./stores"

export function moveToPage(to) {
    page.update(() => {
        return to;
    });
};