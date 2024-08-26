import { defineStore } from "pinia";

export const useLimitStore = defineStore('limit', {
    state: () => ({
        top: '5'
    }),
    actions: {
        update(newTop: string) {
            this.top = newTop;
        }
    }
});