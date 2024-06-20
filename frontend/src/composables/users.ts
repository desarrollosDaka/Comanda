export function useUserRol(rol:number){

const ARRAYUSER_ROL = [
    {"userRol": 0 , "param":{"ID_status":1},"msgButton":'Prefactura Creada', "changeID_status":0}, //ADMINISTRADOR
    {"userRol": 1 , "param":{"ID_status":2,},"msgButton":'Crear Prefactura', "changeID_status":3}, //ASESOR ONLINE
    {"userRol": 2 , "param":{"ID_status":1},"msgButton":'soy un coordinador', "changeID_status":0}, //COORDINADOR ONLINE
    {"userRol": 3 , "param":{"ID_status":1},"msgButton":'soy especialista', "changeID_status":0}, //ESPECIALISTA ONLINE
    {"userRol": 4 , "param":{"ID_status":1},"msgButton":'soy gerente', "changeID_status":0}, // GERENTE DE TIENDA
    {"userRol": 5 , "param":{"ID_status":2},"msgButton":'Crear Prefactura', "changeID_status":3}, //ASESOR
    {"userRol": 6 , "param":{"ID_status":4},"msgButton":'Facturar Pedido',   "changeID_status":5}, //ADM CAJA
    {"userRol": 7 , "param":{"ID_status":3},"msgButton":'Revisado por Almacen', "changeID_status":4}, // ALMACENISTA
    {"userRol": 8 , "param":{"ID_status":4},"msgButton":'Facturar Pedido', "changeID_status":5}, //ADM CAJA ONLINE
    {"userRol": 9 , "param":{"ID_status":1},"msgButton":'Revisado por Almacen', "changeID_status":0}, //ALMACENIST ONLINE
    {"userRol": 10 ,"param":{"ID_status":1},"msgButton":'soy atc', "changeID_status":0}, //ATC TIENDA
    ]

     //BUSCAMOS los datos del usuario
     const dataUser:any= ARRAYUSER_ROL.find(item => item.userRol === rol)

return { dataUser }

}