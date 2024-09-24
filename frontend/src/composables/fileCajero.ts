import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface Document {
    file: File;
    type: string;
    mode: string;
}

export function useUploadFilesCaja(files: Document[], status: string ) {

    let isvalidate :boolean = true;
    const types = files.map(item => item.type);

    if (!types.some(type => type === 'ORDEN DE VENTA') && status === 'Creada') {

        toast.error("Error: Debes Adjuntar la Orden de Venta", {
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

    }else if (!types.some(type => type === 'FACTURA') && status === 'Asignada') {

        toast.error("Error: Debes Adjuntar la Factura", {
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
