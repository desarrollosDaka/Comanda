import axios from "axios";

export const getIdCommad = async (url: string, props: any) => {
    const res = await axios.get(`${url}/api/id-comanda/${props.notifyData.ID_detalle}`);
    return res.data[0].ID;
};
