import { defineStore } from "pinia";

export const useLimitStore = defineStore('limit', {
    state: () => ({
        top: 5
    }),
    actions: {
        update(newTop: number) {
            this.top = newTop;
        }
    }
});