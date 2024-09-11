import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface Document {
    file: File;
    type: string;
    mode: string;
}

export function useUploadFilesValidacion(files: Document[], rol: string | number ) {

    let isvalidate :boolean = true;
    const types = files.map(item => item.type);

    if (!types.some(type => type === 'FACTURA') && rol == '6') {

        toast.error("Error: Debes Adjutar la Factura", {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });
        isvalidate = false;
    }else if (!types.some(type => type === 'RETENCIÓN') && rol == '1') {

        toast.error("Error: Debes Adjutar la Retencion", {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });
        isvalidate = false;

    }else if (!types.some(type => type === 'GUIA ZOOM') && rol == '2') {

        toast.error("Error: Debes Adjutar la Guia Zoom", {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });
        isvalidate = false;



    }else{

        files.forEach((file) => {
            if (file.type === null) {
                isvalidate = false;
            }
        });

        if (!isvalidate) {
            toast.warn(`Error: Seleccione el tipo de documento`, {
                delay: 1000,
                position: toast.POSITION.BOTTOM_CENTER,
                transition: toast.TRANSITIONS.ZOOM,
                theme: 'dark',
                autoClose: 3000,
            });
        }
    }

    return { isvalidate };
}
