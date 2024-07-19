export function useUserRol(rol:number){

const ARRAYUSER_ROL = [
    //ADMINISTRADOR
    {   "userRol": 0 , 
        "status":[1],
        "msgButton":'Prefactura Creada', 
        "changeID_status":0,
        "printer":true
    }, 
    //ASESOR O
    {   "userRol": 1 , 
        "status":[2],
        "msgButton":'Cargar prefactura y enviar a almacen', 
        "changeID_status":10,
        "printer":false
    }, 
    //COORDINADOR ONLINE
    {   "userRol": 2 , 
        "status":[1],
        "msgButton":'soy un coordinador', 
        "changeID_status":0,
        "printer":false
    },
    //ESPECIALISTA ONLINE   
    {   "userRol": 3 , 
        "status":[1],
        "msgButton":'soy especialista', 
        "changeID_status":0,
        "printer":false
    }, 
     // GERENTE DE TIENDA   
    {   "userRol": 4 , 
        "status":[1],
        "msgButton":'Asignar Asesor', 
        "changeID_status":2,
        "printer":false
    },
     //ASESOR    
    {   "userRol": 5 , 
        "status":[2],
        "msgButton":'Cargar prefactura y enviar a almacen', 
        "changeID_status":10,
        "printer":false 
    }, 
    //ADM CAJA    
    {   "userRol": 6 , 
        "status":[3],
        "msgButton":'Facturar Pedido', 
        "changeID_status":4,
        "printer":false
    }, 
    // ALMACENISTA    
    {   "userRol": 7 , 
        "status":[10,4],
        "msgButton":'Comanda Revisada por Almacen',
         "changeID_status":3,
         "printer":true
    }, 
    //ADM CAJA ONLINE    
    {   "userRol": 8 , 
        "status":[3],
        "msgButton":'Facturar Pedido', 
        "changeID_status":4,
        "printer":false
    },
    //ALMACENIST ONLINE
    {   "userRol": 9 , 
        "status":[10,4],
        "msgButton":'Comanda Revisada por Almacen', 
        "changeID_status":3,
        "printer":true
    }, 
      //ATC TIENDA   
    {   "userRol": 10,
        "status":[4, 6],
        "msgButton":'Despachada por ATC',
        "changeID_status":8,
        "printer":false
    },
    ];

    //BUSCAMOS los datos del usuario
    const dataUser:any = ARRAYUSER_ROL.find(item => item.userRol === rol)

    return { dataUser }
}