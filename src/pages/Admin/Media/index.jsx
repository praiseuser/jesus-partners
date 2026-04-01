import { useState } from 'react';
import { Box, Typography, Stack, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CloseIcon from '@mui/icons-material/Close';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill, statusDot, modalBox, modalHeader, modalTitle, modalCloseBtn, modalSection, modalLabel, modalValue } from '../AdminStyles';

const MEDIA_TYPES = ['Video', 'Audio', 'Image', 'Document'];
const CATEGORIES = ['Sermon', 'Testimony', 'Worship', 'Teaching', 'Event Recap', 'Gallery', 'Publication'];

const TYPE_META = {
    'Video': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)', icon: OndemandVideoIcon },
    'Audio': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', icon: HeadphonesIcon },
    'Image': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', icon: ImageIcon },
    'Document': { color: colors.secondary.main, bg: `${colors.secondary.main}15`, icon: PictureAsPdfIcon },
};

const CAT_COLORS = {
    'Sermon': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
    'Testimony': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Worship': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
    'Teaching': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'Event Recap': { color: colors.accent.teal, bg: `${colors.accent.teal}15` },
    'Gallery': { color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
    'Publication': { color: colors.accent.green, bg: `${colors.accent.green}15` },
};

const EMPTY_FORM = {
    title: '', type: 'Video', category: 'Sermon',
    author: '', date: '', duration: '',
    url: '', description: '', featured: false, published: true,
};

const DUMMY = [
    {
        id: 1, title: 'You Are More Than a Conqueror — Sunday Service', type: 'Video',
        category: 'Sermon', author: 'Pastor JPO', date: 'Mar 9, 2025',
        duration: '52 min', url: 'https://youtube.com/watch?v=example',
        description: 'Full sermon from Sunday service. A powerful message on Romans 8:37 and walking in kingdom authority.',
        featured: true, published: true,
    },
];

export default function AdminMediaPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(m => {
        const matchType = typeFilter === 'All' || m.type === typeFilter;
        const matchSrch = m.title.toLowerCase().includes(search.toLowerCase()) ||
            m.author.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#9333EA' },
        { label: 'Videos', value: DUMMY.filter(m => m.type === 'Video').length, color: '#E74C3C' },
        { label: 'Audio', value: DUMMY.filter(m => m.type === 'Audio').length, color: '#8B5CF6' },
        { label: 'Featured', value: DUMMY.filter(m => m.featured).length, color: colors.secondary.main },
    ];

    const ri = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rt = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rs = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Media', flex: 2.5,
            render: (row) => {
                const meta = TYPE_META[row.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)', icon: PermMediaIcon };
                const Icon = meta.icon;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon sx={{ fontSize: 18, color: meta.color }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
                                {row.title}
                            </Typography>
                            {row.featured && (
                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, px: 1, py: 0.2, borderRadius: '4px', background: `${colors.secondary.main}15`, mt: 0.3 }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', fontWeight: typography.fontWeight.bold, color: colors.secondary.main }}>Featured</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'type', label: 'Type', flex: 0.8,
            render: (row) => {
                const meta = TYPE_META[row.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return <Box sx={{ ...categoryPill, color: meta.color, background: meta.bg }}>{row.type}</Box>;
            },
        },
        {
            key: 'category', label: 'Category', flex: 1.1,
            render: (row) => {
                const c = CAT_COLORS[row.category] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return <Box sx={{ ...categoryPill, color: c.color, background: c.bg }}>{row.category}</Box>;
            },
        },
        {
            key: 'author', label: 'Author', flex: 1,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.6}>
                    <PersonIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.6)' }}>{row.author}</Typography>
                </Stack>
            ),
        },
        {
            key: 'date', label: 'Date', flex: 0.9,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.6}>
                    <CalendarTodayIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.4)' }}>{row.date}</Typography>
                </Stack>
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
                    <Typography sx={pageTitleText}>Media</Typography>
                    <Typography sx={pageSubText}>Manage sermons, audio, images and documents</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>Upload Media</AdminButton>
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
                    <Box component="input" placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Types</option>
                    {MEDIA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No media found" emptyIcon={PermMediaIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Media' : 'Upload Media'} accentColor='#9333EA' onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Upload'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Title *</Typography>
                    <Box component="input" placeholder="Media title..." value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Type</Typography>
                        <Box component="select" value={formData.type} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, type: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {MEDIA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Category</Typography>
                        <Box component="select" value={formData.category} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, category: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </Box>
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Author / Speaker</Typography>
                        <Box component="input" placeholder="e.g. Pastor JPO" value={formData.author} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, author: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Date</Typography>
                        <Box component="input" placeholder="e.g. Mar 9, 2025" value={formData.date} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, date: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Duration</Typography>
                        <Box component="input" placeholder="e.g. 52 min" value={formData.duration} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, duration: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>URL / Link</Typography>
                        <Box component="input" placeholder="https://..." value={formData.url} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, url: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Description</Typography>
                    <Box component="textarea" placeholder="Brief description of this media..." value={formData.description} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, description: e.target.value }))} sx={isEdit ? rt : fieldTextarea} />
                </Box>
                <Stack direction="row" gap={2}>
                    {[{ key: 'published', label: 'Published' }, { key: 'featured', label: 'Featured' }].map(t => (
                        <Box key={t.key} onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, [t.key]: !p[t.key] }))}
                            sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData[t.key] ? 'rgba(147,51,234,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData[t.key] ? 'rgba(147,51,234,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: formData[t.key] ? '#9333EA' : 'rgba(255,255,255,0.2)' }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData[t.key] ? '#9333EA' : 'rgba(255,255,255,0.3)' }}>{t.label}</Typography>
                        </Box>
                    ))}
                </Stack>
            </AdminFormModal>

            {/* Preview Modal */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (() => {
                    const meta = TYPE_META[preview.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)', icon: PermMediaIcon };
                    const cat = CAT_COLORS[preview.category] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                    const Icon = meta.icon;
                    return (
                        <DialogContent sx={{ p: 0 }}>
                            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${meta.color}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <Box sx={modalHeader}>
                                <Typography sx={modalTitle}>Media Preview</Typography>
                                <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                {/* Media type icon block */}
                                <Box sx={{ background: meta.bg, borderRadius: '12px', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5, position: 'relative', overflow: 'hidden' }}>
                                    <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${meta.color}15, transparent 70%)` }} />
                                    <Icon sx={{ fontSize: 48, color: meta.color, opacity: 0.8, position: 'relative', zIndex: 1 }} />
                                    {preview.url && (
                                        <Box component="a" href={preview.url} target="_blank" rel="noopener noreferrer"
                                            sx={{ position: 'absolute', bottom: 10, right: 12, display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.6, borderRadius: '8px', background: 'rgba(0,0,0,0.4)', color: '#fff', textDecoration: 'none', fontFamily: typography.fontFamily.body, fontSize: '0.68rem', fontWeight: typography.fontWeight.semiBold, zIndex: 2 }}>
                                            <PlayCircleOutlineIcon sx={{ fontSize: 13 }} /> Open
                                        </Box>
                                    )}
                                </Box>
                                <Stack direction="row" gap={1} mb={2}>
                                    <Box sx={{ ...categoryPill, color: meta.color, background: meta.bg }}>{preview.type}</Box>
                                    <Box sx={{ ...categoryPill, color: cat.color, background: cat.bg }}>{preview.category}</Box>
                                    {preview.featured && <Box sx={{ ...categoryPill, color: colors.secondary.main, background: `${colors.secondary.main}15` }}>Featured</Box>}
                                </Stack>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 2 }}>{preview.title}</Typography>
                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                                    {[
                                        { label: 'Author', value: preview.author },
                                        { label: 'Date', value: preview.date },
                                        { label: 'Duration', value: preview.duration || '—' },
                                        { label: 'Status', value: preview.published ? 'Published' : 'Draft', color: preview.published ? colors.accent.green : 'rgba(255,255,255,0.35)' },
                                    ].map(m => (
                                        <Box key={m.label} sx={modalSection}>
                                            <Typography sx={modalLabel}>{m.label}</Typography>
                                            <Typography sx={{ ...modalValue, ...(m.color ? { color: m.color } : {}) }}>{m.value}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                {preview.url && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', mb: 2 }}>
                                        <LinkIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{preview.url}</Typography>
                                    </Box>
                                )}
                                {preview.description && (
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{preview.description}</Typography>
                                )}
                            </Box>
                        </DialogContent>
                    );
                })()}
            </Dialog>
        </Box>
    );
}