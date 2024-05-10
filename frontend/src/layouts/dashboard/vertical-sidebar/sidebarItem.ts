// icons
import {
  // QuestionOutlined,
  DashboardOutlined,
  // ChromeOutlined,
  LoginOutlined,
  ProfileOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  CrownOutlined,
  ClusterOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
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
  { header: 'Comanda Online' },
  {
    title: 'Panel de control',
    icon: DashboardOutlined,
    to: '/dashboard'
  },
  {
    title: 'Comandas',
    icon: ClusterOutlined, 
    to: '/maestroComanda'
  },

  {
    title: 'Reportes',
    icon: SnippetsOutlined, 
    to: '/comanda'
  },
  {
    title: 'Pedidos Online',
    icon: BgColorsOutlined, 
    to: '/documentacionDaka'
  },
  {
    title: 'Factura Online',
    icon: SnippetsOutlined, 
    to: '/documentacionDaka'
  },
  {
    title: 'Despacho',
    icon: TeamOutlined, 
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
