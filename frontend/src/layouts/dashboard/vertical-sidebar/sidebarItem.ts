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
    title: 'Comandas',
    icon: ClusterOutlined, 
    to: '/maestroComanda'
  },
  {
    title: 'Reportes',
    icon: ContainerOutlined, 
    to: '/comanda'
  },
  {
    title: 'Factura Online',
    icon: SnippetsOutlined, 
    to: '/documentacionDaka'
  },
  {
    title: 'Despacho',
    icon: ToolOutlined, 
    to: '/documentacionDaka'
  },
  { header: 'Configuración' },
  {
    title: 'Auth',
    icon: LoginOutlined,
    children:  [ 
      {
        title: ' Login',
        to: '/auth/login'
      },
      {
        title: 'Register',
        to: '/auth/register'
      },
    ]
  },
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
  },
  {
    title: 'Utils',
    icon: FontSizeOutlined,
    children:  [ 
      {
        title: 'Typography',
        to: '/typography'
      },
      {
        title: 'Color',
        to: '/colors'
      },
      {
        title: 'Shadow',
        to: '/shadow'
      },
      {
        title: 'Ant Icons',
        to: '/icon/ant'
      }
    ]
  },
  
];

export default sidebarItem;
