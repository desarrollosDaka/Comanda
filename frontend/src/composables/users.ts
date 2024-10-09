export function useUserRol(rol:number){

const ARRAYUSER_ROL = [
    //ADMINISTRADOR
    {   "userRol": 0 , 
        "status":[1],
        "msgButton":'Prefactura Creada', 
        "changeID_status":0,
        "printer":true
    },
    //ASESOR ONLINE
    {   "userRol": 1 , 
        "status":[4],
        "msgButton":'Cargar Retencion', 
        "changeID_status":5,
        "printer":false
    }, 
    //COORDINADOR ONLINE
    {   "userRol": 11,
        "status": 5,
        "msgButton":'Aceptar Retencion', 
        "changeID_status": 6,
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
        "status":[1, 2],
        "msgButton":'Asignar Asesor', 
        "changeID_status":2,
        "printer":false
    },
     //ASESOR    
    {   "userRol": 5 , 
        "status":[2, 10, 3, 4],
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
        "status":[10],
        "msgButton":'Comanda Revisada por Almacen',
         "changeID_status":3,
         "printer":true
    }, 
    //ADM CAJA ONLINE    
    {   "userRol": 8 , 
        "status":[3],
        "msgButton":'Aceptar Retencion', 
        "changeID_status":6,
        "printer":false
    },
    //ALMACENIST ONLINE
    {   "userRol": 9 , 
        "status":[4, 6], //validar para que muestre solo los que tiene pick up
        "msgButton":'Despachar', 
        "changeID_status":8, 
        "printer":true
    }, 
      //ATC TIENDA  
    {   "userRol": 10,
        "status":[4, 6], 
        "msgButton":'Despachada por ATC',
        "changeID_status":8, 
        "printer":false
    },
      //ATC ONLINE
    {   "userRol": 2,
        "status":[4, 6], 
        "msgButton":'Cargar guia zoom',
        "changeID_status":11,
        "printer":false
    },
    ];

    //BUSCAMOS los datos del usuario
    const dataUser:any = ARRAYUSER_ROL.find(item => item.userRol === rol)

    return { dataUser }
}