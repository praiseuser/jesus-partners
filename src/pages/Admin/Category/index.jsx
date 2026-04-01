import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FolderIcon from '@mui/icons-material/Folder';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill } from '../AdminStyles';

const APPLIES_TO = ['Blogs', 'Bible Studies', 'Resources', 'All'];

const APPLIES_COLORS = {
    'Blogs': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'Bible Studies': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
    'Resources': { color: colors.accent.teal, bg: `${colors.accent.teal}15` },
    'All': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
};

const APPLIES_ICONS = {
    'Blogs': ArticleIcon, 'Bible Studies': MenuBookIcon,
    'Resources': FolderIcon, 'All': CategoryIcon,
};

const EMPTY_FORM = { name: '', appliesTo: 'Blogs', description: '' };

const DUMMY = [
    { id: 1, name: 'Word of God', appliesTo: 'Blogs', description: 'Messages and teachings directly from Scripture.', itemCount: 0 },
    { id: 2, name: 'Evangelism', appliesTo: 'Blogs', description: 'Content centered on spreading the Gospel.', itemCount: 0 },
    { id: 3, name: 'Discipleship', appliesTo: 'All', description: 'Resources for growing believers in their walk.', itemCount: 0 },
    { id: 4, name: 'Faith', appliesTo: 'Bible Studies', description: 'Studies on building and exercising faith.', itemCount: 0 },
    { id: 5, name: 'Prayer', appliesTo: 'All', description: 'Everything about prayer and intercession.', itemCount: 0 },
];

export default function AdminCategoriesPage() {
    const [search, setSearch] = useState('');
    const [appFilter, setAppFilter] = useState('All');
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(c => {
        const matchApp = appFilter === 'All' || c.appliesTo === appFilter;
        const matchSrch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase());
        return matchApp && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#3B82F6' },
        { label: 'Blog', value: DUMMY.filter(c => c.appliesTo === 'Blogs').length, color: '#3B82F6' },
        { label: 'Bible Studies', value: DUMMY.filter(c => c.appliesTo === 'Bible Studies').length, color: '#8B5CF6' },
        { label: 'All Sections', value: DUMMY.filter(c => c.appliesTo === 'All').length, color: colors.secondary.main },
    ];

    const readonlyInput = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlyTextarea = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlySelect = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'name', label: 'Category', flex: 2,
            render: (row) => {
                const a = APPLIES_COLORS[row.appliesTo] || APPLIES_COLORS['All'];
                const Icon = APPLIES_ICONS[row.appliesTo] || CategoryIcon;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon sx={{ fontSize: 18, color: a.color }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)' }}>
                            {row.name}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            key: 'appliesTo', label: 'Applies To', flex: 1.2,
            render: (row) => {
                const a = APPLIES_COLORS[row.appliesTo] || APPLIES_COLORS['All'];
                return <Box sx={{ ...categoryPill, color: a.color, background: a.bg }}>{row.appliesTo}</Box>;
            },
        },
        {
            key: 'description', label: 'Description', flex: 2.5,
            render: (row) => (
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>
                    {row.description || '—'}
                </Typography>
            ),
        },
        {
            key: 'itemCount', label: 'Items', flex: 0.6,
            render: (row) => (
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.black, color: 'rgba(255,255,255,0.5)' }}>
                    {row.itemCount}
                </Typography>
            ),
        },
    ];

    const actions = [
        { icon: <EditOutlinedIcon sx={{ fontSize: 15 }} />, tooltip: 'Edit', onClick: (row) => openEdit(row), hoverColor: '#3B82F6' },
        { icon: <DeleteOutlineIcon sx={{ fontSize: 15 }} />, tooltip: 'Delete', onClick: () => { }, hoverColor: '#E74C3C' },
    ];

    return (
        <Box sx={pageWrapper}>
            <Box sx={pageHeader}>
                <Box>
                    <Typography sx={pageTitleText}>Categories</Typography>
                    <Typography sx={pageSubText}>Organise content across blogs, bible studies and resources</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Category</AdminButton>
            </Box>

            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ mb: 3.5 }}>
                {stats.map(s => (
                    <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.2, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', px: 2, py: 1.2 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff' }}>{s.value}</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{s.label}</Typography>
                    </Box>
                ))}
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mb: 3 }}>
                <Box sx={{ ...searchBar, flex: 1 }}>
                    <Box component="input" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={appFilter} onChange={e => setAppFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Sections</option>
                    {APPLIES_TO.map(a => <option key={a} value={a}>{a}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No categories found" emptyIcon={CategoryIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Category' : 'New Category'} accentColor={colors.secondary.main} onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Add Category'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Category Name *</Typography>
                    <Box component="input" placeholder="e.g. Word of God" value={formData.name} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, name: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                </Box>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Applies To</Typography>
                    <Box component="select" value={formData.appliesTo} disabled={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, appliesTo: e.target.value }))} sx={isEdit ? readonlySelect : fieldSelect}>
                        {APPLIES_TO.map(a => <option key={a} value={a}>{a}</option>)}
                    </Box>
                </Box>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Description</Typography>
                    <Box component="textarea" placeholder="What kind of content goes here..." value={formData.description} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, description: e.target.value }))} sx={isEdit ? readonlyTextarea : fieldTextarea} />
                </Box>
            </AdminFormModal>
        </Box>
    );
}