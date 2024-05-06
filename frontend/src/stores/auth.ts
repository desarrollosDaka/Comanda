import { defineStore } from 'pinia';
import axios from 'axios'
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `http://localhost:3002/api/auth`;

export const useAuthStore = defineStore({ id: 'auth',
  state: () => ({
    // inicializar el estado desde el almacenamiento local para permitir que el usuario permanezca conectado
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(sessionStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(Email: string, Password: string) {
      const user = await axios.post(`${baseUrl}/login`, { Email, Password });

      // actualizar estado pinia
      this.user = user;
      // almacene los detalles del usuario y jwt en el almacenamiento local para mantener al usuario conectado entre actualizaciones de la página
      sessionStorage.setItem('user', JSON.stringify(user));
      // redirigir a la URL anterior o por defecto a la página de inicio
      router.push(this.returnUrl || '/dashboard');
    },
    logout() {
      this.user = null;
      sessionStorage.removeItem('user');
      router.push('/auth/login');
    }
  }
});
