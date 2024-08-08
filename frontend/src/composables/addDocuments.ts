import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

interface Document {
    file: File;
    type: string;
    mode: string;
}

let rta = 0xffff;

const INSERT_METHOD = 'insert'
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;

export async function useAddDocument(files: Document[], id:string, idOrder:number) {
    const formDataDocuments = new FormData();
    let response = false
    // filtramos solos los item tipo insert
    files = files.filter(item => item.mode === INSERT_METHOD)

    for (let i = 0; i < files.length; i++) {
        const file = files[i].file;
        const type = files[i].type;
        const mode = files[i].mode

        formDataDocuments.append('doc_file', file)
        formDataDocuments.append(`typeDoc_${i}`, type);
        formDataDocuments.append(`user_${i}`, 'Admin');
    }
    try {
        await axios.post(`${baseUrl}/createOrderDocument/${id}/${idOrder}`, formDataDocuments)
        response = true
    } catch (error) {
        response = false
        toast.error("Ocurrio un error al momento de registrar los datos de los archivos", {
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

    return { response }
}