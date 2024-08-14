import { defineStore } from 'pinia';

export const useNotifyStore = defineStore('notify', {
    state: (): { notifications: any[] } => ({
        notifications: [],
    }),
    getters: {
        countNotifications(state) {
            return state.notifications.length.toString();
        }
    },
    actions: {
        update(data: []) {
            this.notifications = data;

        }
    }
});