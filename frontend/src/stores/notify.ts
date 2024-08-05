import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_URL}/api/finall`;

export const useNotifyStore = defineStore('notify', {
    state: () => ({
        notifications: [],
    }),
    actions: {
        async getNotificationsData(userId: string) {
            const { data }: any = await axios.get(`${baseUrl}/${userId}`);
            let { error } = data;
            if (error) {
                throw error;
            }
            
            // update state
            this.notifications = data.data;
        }
    }
});