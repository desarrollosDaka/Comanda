import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from "socket.io-client";

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
        },
        async socketNotify(userId: string) {
            const socket = io(`${baseUrl}/${userId}`, {
                reconnection: false, // Deshabilitar la reconexión automática
            });

            // Listen for events from the server
            socket.on('get-master-notify', (rta: any) => {
                console.log('Datos actualizados:', rta);
            });
        }
    }
});