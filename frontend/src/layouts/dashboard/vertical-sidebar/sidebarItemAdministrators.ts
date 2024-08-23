// icons
import {
  // QuestionOutlined,
  DashboardOutlined,
  // ChromeOutlined,
  LoginOutlined,
  ProfileOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  CrownOutlined,
  ClusterOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  BarcodeOutlined,
  ContainerOutlined,
  UserOutlined, 
  ToolOutlined
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
  { header: 'Comanda Online' },
  {
    title: 'Panel de control',
    icon: DashboardOutlined,
    to: '/dashboard'
  },
  {
    title: 'Pedidos Online',
    icon: BarcodeOutlined, 
    to: '/maestroPedidos'
  },
  {
    title: 'Reportes',
    icon: ContainerOutlined, 
    to: '/ReporteComanda'
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
