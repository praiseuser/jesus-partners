import { useState } from 'react';
import { Box, Typography, Stack, Avatar, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, {
    fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea,
} from '../../../components/admin/AdminFormModal';
import {
    pageWrapper, pageHeader, pageTitleText, pageSubText,
    searchBar, filterSelect, categoryPill, featuredBadge,
    statusDot, modalBox, modalHeader, modalTitle, modalCloseBtn,
    modalSection, modalLabel, modalValue, modalCategoryPill,
} from './styles';

const CATEGORIES = ['Word of God', 'Evangelism', 'Discipleship', 'Faith', 'Prayer'];

const CAT_COLORS = {
    'Word of God': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Evangelism': { color: colors.primary.light, bg: `${colors.primary.light}20` },
    'Discipleship': { color: colors.accent.teal, bg: `${colors.accent.teal}15` },
    'Faith': { color: colors.accent.red, bg: `${colors.accent.red}15` },
    'Prayer': { color: colors.accent.green, bg: `${colors.accent.green}15` },
};

const EMPTY_FORM = {
    title: '', category: 'Word of God', author: '',
    ref: '', readTime: '', excerpt: '', featured: false, published: true,
};

const DUMMY_BLOGS = [
    { id: 1, featured: true, category: 'Word of God', title: 'The man departed, and told the Jews that it was Jesus, which had made him whole.', author: 'Pastor JPO', date: 'Jan 15, 2025', readTime: '5 min', ref: 'John 5:15', published: true },
];

function initials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function AdminBlogsPage() {
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY_BLOGS.filter(b => {
        const matchCat = catFilter === 'All' || b.category === catFilter;
        const matchSrch = b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSrch;
    });
    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };

    const openEdit = (blog) => { setFormData({ ...blog }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY_BLOGS.length, color: '#3B82F6' },
        { label: 'Published', value: DUMMY_BLOGS.filter(b => b.published).length, color: colors.accent.green },
        { label: 'Draft', value: DUMMY_BLOGS.filter(b => !b.published).length, color: colors.secondary.main },
        { label: 'Featured', value: DUMMY_BLOGS.filter(b => b.featured).length, color: colors.accent.teal },
    ];

    const readonlyInput = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlyTextarea = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlySelect = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Title', flex: 3,
            render: (row) => {
                const cat = CAT_COLORS[row.category] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '9px', flexShrink: 0, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ArticleIcon sx={{ fontSize: 17, color: cat.color }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 280 }}>
                                {row.title}
                            </Typography>
                            <Stack direction="row" gap={0.8} alignItems="center" mt={0.3}>
                                {row.featured && <Box sx={featuredBadge}><NewReleasesIcon sx={{ fontSize: 9 }} /> Featured</Box>}
                                {row.ref && <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: colors.secondary.main, fontWeight: typography.fontWeight.semiBold }}>{row.ref}</Typography>}
                            </Stack>
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'category', label: 'Category', flex: 1.2,
            render: (row) => {
                const cat = CAT_COLORS[row.category] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ ...categoryPill, color: cat.color, background: cat.bg }}>
                        <LocalOfferIcon sx={{ fontSize: 9 }} /> {row.category}
                    </Box>
                );
            },
        },
        {
            key: 'author', label: 'Author', flex: 1,
            render: (row) => {
                const cat = CAT_COLORS[row.category] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.6rem', background: `${cat.color}25`, color: cat.color, fontFamily: typography.fontFamily.heading, fontWeight: typography.fontWeight.bold }}>
                            {initials(row.author)}
                        </Avatar>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.6)', fontWeight: typography.fontWeight.medium }}>
                            {row.author}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            key: 'date', label: 'Date', flex: 0.9,
            render: (row) => (
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.35)' }}>
                    {row.date}
                </Typography>
            ),
        },
        {
            key: 'published', label: 'Status', flex: 0.7,
            render: (row) => (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.2, py: 0.4, borderRadius: '6px', background: row.published ? 'rgba(39,174,96,0.12)' : 'rgba(255,255,255,0.06)', border: `1px solid ${row.published ? 'rgba(39,174,96,0.25)' : 'rgba(255,255,255,0.1)'}` }}>
                    <Box sx={{ ...statusDot, background: row.published ? colors.accent.green : 'rgba(255,255,255,0.25)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: typography.fontWeight.bold, color: row.published ? colors.accent.green : 'rgba(255,255,255,0.35)' }}>
                        {row.published ? 'Published' : 'Draft'}
                    </Typography>
                </Box>
            ),
        },
    ];

    const actions = [
        { icon: <VisibilityOutlinedIcon sx={{ fontSize: 15 }} />, tooltip: 'Preview', onClick: (row) => setPreview(row) },
        { icon: <EditOutlinedIcon sx={{ fontSize: 15 }} />, tooltip: 'Edit', onClick: (row) => openEdit(row), hoverColor: '#3B82F6' },
        { icon: <DeleteOutlineIcon sx={{ fontSize: 15 }} />, tooltip: 'Delete', onClick: () => { }, hoverColor: '#E74C3C' },
    ];

    return (
        <Box sx={pageWrapper}>
            <Box sx={pageHeader}>
                <Box>
                    <Typography sx={pageTitleText}>Blogs</Typography>
                    <Typography sx={pageSubText}>Manage all published and draft blog posts</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Blog</AdminButton>
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
                    <Box component="input" placeholder="Search blogs..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={catFilter} onChange={e => setCatFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </Box>
            </Stack>
            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No blogs found" emptyIcon={ArticleIcon} />
            <AdminFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                title={isEdit ? 'Edit Blog' : 'New Blog'}
                accentColor={colors.secondary.main}
                onSubmit={() => setFormOpen(false)}
                submitLabel={isEdit ? 'Update Blog' : 'Add Blog'}
            >
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Title *</Typography>
                    <Box component="input" placeholder="Blog title..." value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))}
                        sx={isEdit ? readonlyInput : fieldInput} />
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Category</Typography>
                        <Box component="select" value={formData.category} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, category: e.target.value }))}
                            sx={isEdit ? readonlySelect : fieldSelect}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Author</Typography>
                        <Box component="input" placeholder="Author name..." value={formData.author} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, author: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Scripture Ref</Typography>
                        <Box component="input" placeholder="e.g. John 5:15" value={formData.ref || ''} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, ref: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Read Time</Typography>
                        <Box component="input" placeholder="e.g. 5 min" value={formData.readTime || ''} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, readTime: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>

                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Excerpt</Typography>
                    <Box component="textarea" placeholder="Short description..." value={formData.excerpt || ''} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                        sx={isEdit ? readonlyTextarea : fieldTextarea} />
                </Box>

                <Stack direction="row" gap={2}>
                    {[{ key: 'published', label: 'Published' }, { key: 'featured', label: 'Featured' }].map(t => (
                        <Box key={t.key}
                            onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, [t.key]: !p[t.key] }))}
                            sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData[t.key] ? 'rgba(212,160,23,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData[t.key] ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: formData[t.key] ? colors.secondary.main : 'rgba(255,255,255,0.2)' }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData[t.key] ? colors.secondary.main : 'rgba(255,255,255,0.3)' }}>
                                {t.label}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </AdminFormModal>
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (
                    <DialogContent sx={{ p: 0 }}>
                        <Box sx={{ height: 3, background: `linear-gradient(90deg, ${CAT_COLORS[preview.category]?.color || '#fff'}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                        <Box sx={modalHeader}>
                            <Typography sx={modalTitle}>Blog Preview</Typography>
                            <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <Stack direction="row" gap={1} alignItems="center" mb={2}>
                                <Box sx={{ ...modalCategoryPill, color: CAT_COLORS[preview.category]?.color, background: CAT_COLORS[preview.category]?.bg }}>
                                    <LocalOfferIcon sx={{ fontSize: 10 }} /> {preview.category}
                                </Box>
                                {preview.featured && <Box sx={featuredBadge}><NewReleasesIcon sx={{ fontSize: 9 }} /> Featured</Box>}
                            </Stack>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.15rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.4, mb: 1 }}>{preview.title}</Typography>
                            {preview.ref && <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: colors.secondary.main, mb: 2 }}>— {preview.ref}</Typography>}
                            <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', my: 2 }} />
                            <Stack direction="row" gap={2.5} flexWrap="wrap">
                                {[
                                    { label: 'Author', icon: <PersonIcon sx={{ fontSize: 11 }} />, value: preview.author },
                                    { label: 'Read time', icon: <AccessTimeIcon sx={{ fontSize: 11 }} />, value: preview.readTime },
                                    { label: 'Date', icon: null, value: preview.date },
                                    { label: 'Status', icon: null, value: preview.published ? 'Published' : 'Draft', color: preview.published ? colors.accent.green : 'rgba(255,255,255,0.35)' },
                                ].map(m => (
                                    <Box key={m.label} sx={modalSection}>
                                        <Typography sx={modalLabel}>{m.icon} {m.label}</Typography>
                                        <Typography sx={{ ...modalValue, ...(m.color ? { color: m.color } : {}) }}>{m.value}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </DialogContent>
                )}
            </Dialog>

        </Box>
    );
}