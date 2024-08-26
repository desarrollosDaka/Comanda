import { defineStore } from 'pinia';

export const useNotifyStore = defineStore('notify', {
    state: (): { notifications: any[], showNoti: any [], limit: number } => ({
        notifications: [],
        showNoti: [],
        limit: 5
    }),
    getters: {
        countNotifications(state) {
            return state.notifications.length.toString();
        }
    },
    actions: {
        update(data: []) {
            this.notifications = data;
            this.showNoti = this.notifications.slice(0, this.limit)
        },
        updateLimit(newLimit: number) {
            this.limit = newLimit;
        } 
    }
});