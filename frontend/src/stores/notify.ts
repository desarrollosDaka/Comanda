import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_URL}/api/finall`;

export const useNotifyStore = defineStore('notify', {
    state: () => ({
        notifications: [],
    }),
    getters: {
        countNotifications(state) {
            return state.notifications.length.toString();
        }
    },
    actions: {
        async getNotificationsData(userId: string) {
            const { data }: any = await axios.get(`${baseUrl}/${userId}`);
            let { error } = data;
            if (error) {
                throw error;
            }

            // update state
            //console.log(data.data);
            
            this.notifications = data.data;
        }
    }
});