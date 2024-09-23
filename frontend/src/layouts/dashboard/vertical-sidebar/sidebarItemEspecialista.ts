// icons
import {
    DashboardOutlined,
    ContainerOutlined,
    BarcodeOutlined
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
    //   title: 'Reporte',
    //   icon: ContainerOutlined, 
    //   to: '/ReporteComanda'
    // },
    {
      title: 'Retencion',
      icon: BarcodeOutlined, 
      to: '/retenciones'
    },
  ];
  
  export default sidebarItem;
   