import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from "socket.io-client";

const baseUrl = `${import.meta.env.VITE_URL}/api/finall`;
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;

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






        // async getNotificationsData(userId: string) {
        //     const { data }: any = await axios.get(`${baseUrl}/${userId}`);
        //     let { error } = data;
        //     if (error) {
        //         throw error;
        //     }
        //     // update state
        //     // console.log(data.data);
        //     this.notifications = data.data;
        // },
        // async socketNotify() {
        //     const socket = io(`${baseUrlBack}`, {
        //         reconnection: false, // Deshabilitar la reconexión automática
        //     });

        //     // Listen for events from the server
        //     socket.on('get-master-notify', (rta: any) => {
        //         this.notifications = rta[0];
        //         console.log('this.notifications', this.notifications);
        //     });
        // },