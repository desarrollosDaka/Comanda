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