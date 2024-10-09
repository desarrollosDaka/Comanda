// icons
import {
    DashboardOutlined,
    ClusterOutlined,
    ContainerOutlined,
    UserOutlined,
    CarOutlined,
  } from '@ant-design/icons-vue';
  
  export interface menu {
    header?: string;
    title?: string;
    icon?: object;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
  }
  
  const sidebarItem: menu[] = [
    { header: 'Comanda' },
    {
      title: 'Panel de control',
      icon: DashboardOutlined,
      to: '/dashboard'
    },
    // {
    //     title: 'Pedidos Online',
    //     icon: BarcodeOutlined, 
    //     to: '/maestroPedidos'
    //   },
    {
      title: 'Comandas',
      icon: ClusterOutlined, 
      to: '/maestroComandaAsignada'
    },
    {
      title: 'Reporte',
      icon: ContainerOutlined, 
      to: '/ReporteComanda'
    },
    {
      title: 'Pick-Up',
      icon: CarOutlined, 
      to: '/pickups'
    },
    { header: 'Configuración' },
    {
      title: 'Usuarios',
      icon: UserOutlined,
      children:  [ 
        {
          title: ' Maestro de Usuarios',
          to: '/masterUser'
        },
        {
          title: ' Crear Usuario',
          to: '/formCreatedUser'
        },
      ]
    }
  ];
  
  export default sidebarItem;
  