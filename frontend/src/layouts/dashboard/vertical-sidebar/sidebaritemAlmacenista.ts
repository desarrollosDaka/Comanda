// icons
import {
    DashboardOutlined,
    LoginOutlined,
    FontSizeOutlined,
    ClusterOutlined,
    SnippetsOutlined,
    UserOutlined
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
    { header: 'SGI' },
    {
      title: 'Panel de control',
      icon: DashboardOutlined,
      to: '/dashboard'
    },
    {
      title: 'Comandas Asignadas',
      icon: ClusterOutlined, 
      to: '/maestroComandaAsignada'
    },
  ];
  
  export default sidebarItem;
  