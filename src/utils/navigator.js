import { page, visitedViewsStack } from "stores/stores.js";

let visitedViews;
let currentPage;

page.subscribe((value) => {
    currentPage = value;
});

visitedViewsStack.subscribe((value) => {
    visitedViews = value;
});

function updateViewsStack(newStack) {
    visitedViewsStack.update(() => {
        console.log(newStack);
        return newStack;
    });
}

export function moveToPage(to) {
    if (to == "back") {
        goBackToLastView();
        return;
    }
    page.update(() => {
        return to;
    });
    if (to == 'menu') {
        visitedViews = [];
    } else {
        visitedViews.push(to);
    }
    updateViewsStack(visitedViews);
};

export function goBackToLastView() {
    visitedViews.pop();
    let to = visitedViews.at(-1) || "menu";
    console.log(to);
    console.log(visitedViews);
    page.update(() => {
        return to;
    });
    if (to == "menu") {
        visitedViews = [];
    }
    console.log(currentPage);
    updateViewsStack(visitedViews);
}