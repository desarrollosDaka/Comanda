// icons
import {
    DashboardOutlined,
    ClusterOutlined,
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
    { header: 'Comanda ATC' },
    {
      title: 'Panel de control',
      icon: DashboardOutlined,
      to: '/dashboard'
    },
    {
      title: 'Comandas ATC Online',
      icon: ClusterOutlined, 
      to: '/comadasAtcOnline'
    }
  ];
  
  export default sidebarItem;