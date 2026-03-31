import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import MessageIcon from '@mui/icons-material/Message';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpIcon from '@mui/icons-material/Help';
import ClassIcon from '@mui/icons-material/Class';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FolderIcon from '@mui/icons-material/Folder';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from '../../theme';

const NAV_SECTIONS = [
    {
        title: 'Main',
        items: [
            { label: 'Dashboard', path: '/admin', icon: DashboardIcon, color: colors.secondary.main, badge: null },
        ],
    },
    {
        title: 'Content',
        items: [
            { label: 'Blogs', path: '/admin/blogs', icon: ArticleIcon, color: '#3B82F6', badge: 0 },
            { label: 'Activities', path: '/admin/activities', icon: LocalActivityIcon, color: '#10B981', badge: 1 },
            { label: 'Announcements', path: '/admin/announcements', icon: CampaignIcon, color: '#F59E0B', badge: null },
            { label: 'Bible Studies', path: '/admin/bible-studies', icon: MenuBookIcon, color: '#8B5CF6', badge: null },
            { label: 'Categories', path: '/admin/categories', icon: CategoryIcon, color: '#F97316', badge: 0 },
            { label: 'Daily Devotion', path: '/admin/daily-devotion', icon: AutoStoriesIcon, color: '#27AE60', badge: 0 },
            { label: 'Discipleship', path: '/admin/discipleship', icon: SchoolIcon, color: '#1ABC9C', badge: 0 },
            { label: 'Events', path: '/admin/events', icon: EventIcon, color: '#E74C3C', badge: null },
            { label: 'Media', path: '/admin/media', icon: PermMediaIcon, color: '#9333EA', badge: null },
            { label: 'Resources', path: '/admin/resources', icon: LibraryBooksIcon, color: '#0EA5E9', badge: 0 },
        ],
    },
    {
        title: 'Community',
        items: [
            { label: 'Messages', path: '/admin/messages', icon: MessageIcon, color: '#3B82F6', badge: null },
            { label: 'Partners', path: '/admin/partners', icon: GroupsIcon, color: colors.secondary.main, badge: 0 },
            { label: 'Payment methods', path: '/admin/payment-methods', icon: PaymentIcon, color: '#10B981', badge: 0 },
            { label: 'Requests', path: '/admin/requests', icon: HelpIcon, color: '#F59E0B', badge: null },
        ],
    },
    {
        title: 'Discipleship',
        items: [
            { label: 'Discipleship classes', path: '/admin/discipleship-classes', icon: ClassIcon, color: '#8B5CF6', badge: null },
            { label: 'Discipleship Materials', path: '/admin/discipleship-materials', icon: CollectionsBookmarkIcon, color: '#F97316', badge: null },
            { label: 'Tracks', path: '/admin/tracks', icon: TrackChangesIcon, color: '#1ABC9C', badge: null },
            { label: 'Bible Study Series', path: '/admin/bible-study-series', icon: PlaylistAddCheckIcon, color: '#27AE60', badge: null },
            { label: 'Resource Series', path: '/admin/resource-series', icon: FolderIcon, color: '#0EA5E9', badge: null },
            { label: 'Sub Categories', path: '/admin/sub-categories', icon: CategoryIcon, color: '#9333EA', badge: null },
        ],
    },
    {
        title: 'Settings',
        items: [
            { label: 'Bank Details', path: '/admin/bank-details', icon: AccountBalanceIcon, color: '#10B981', badge: null },
            { label: 'Officials', path: '/admin/officials', icon: BadgeIcon, color: '#F59E0B', badge: null },
            { label: 'Settings', path: '/admin/settings', icon: SettingsIcon, color: 'rgba(255,255,255,0.5)', badge: 1 },
        ],
    },
];

export default NAV_SECTIONS;