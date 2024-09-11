import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface Document {
    file: File;
    type: string;
    mode: string;
}

export function useUploadFiles(files: Document[]) {

    let isvalidate :boolean = true;

    if (files.length <= 0) {
        toast.error("Error: Debes seleccionar al menos un archivo", {
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
    } else {
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
