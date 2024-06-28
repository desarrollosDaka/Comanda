import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_URL}/api/status`;

interface Status {
    ID_status: number;
    Status: string;
    Descripcion:string;
    Create_date: Date;
    Update_date: Date;
  }
export async function useGetStatus(){

    let status:any = []

    try {
        const url = `${baseUrl}/masterStatus`
        const { data } = await axios.get(url);
        status = data.map((status: Status) => ({
          ID_status: status.ID_status,
          Status: status.Status,
          Descripcion:status.Descripcion
        }));
      } catch (error) {
        toast.error(`Ocurrio un error al momento de consultar los status ${error}`, {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });
      }

      return { status }

}