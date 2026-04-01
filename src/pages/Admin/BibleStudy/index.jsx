import { useState } from 'react';
import { Box, Typography, Stack, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LayersIcon from '@mui/icons-material/Layers';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill, statusDot, featuredBadge, modalBox, modalHeader, modalTitle, modalCloseBtn, modalSection, modalLabel, modalValue } from '../AdminStyles';

const TOPICS = ['Salvation', 'Faith', 'Prayer', 'Discipleship', 'Holy Spirit', 'End Times', 'Marriage & Family', 'Leadership'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const TOPIC_COLORS = {
    'Salvation': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
    'Faith': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Prayer': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
    'Discipleship': { color: colors.accent.teal, bg: `${colors.accent.teal}15` },
    'Holy Spirit': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'End Times': { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    'Marriage & Family': { color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
    'Leadership': { color: colors.accent.green, bg: `${colors.accent.green}15` },
};

const LEVEL_COLORS = {
    'Beginner': { color: colors.accent.green, bg: `${colors.accent.green}15` },
    'Intermediate': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Advanced': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
};

const EMPTY_FORM = {
    title: '', topic: 'Faith', level: 'Beginner', author: '',
    duration: '', sessions: '', scriptureRef: '', description: '', published: true,
};

const DUMMY = [
    { id: 1, title: 'Foundation of Faith: A Beginner\'s Guide', topic: 'Faith', level: 'Beginner', author: 'Pastor JPO', duration: '4 weeks', sessions: '8', scriptureRef: 'Hebrews 11:1', description: 'A foundational study on the nature of faith, how it works, and how to build an unshakeable trust in God.', published: true },
];

export default function AdminBibleStudiesPage() {
    const [search, setSearch] = useState('');
    const [topicFilter, setTopicFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(b => {
        const matchTopic = topicFilter === 'All' || b.topic === topicFilter;
        const matchSrch = b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase());
        return matchTopic && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#3B82F6' },
        { label: 'Published', value: DUMMY.filter(b => b.published).length, color: colors.accent.green },
        { label: 'Beginner', value: DUMMY.filter(b => b.level === 'Beginner').length, color: colors.accent.green },
        { label: 'Advanced', value: DUMMY.filter(b => b.level === 'Advanced').length, color: '#E74C3C' },
    ];

    const readonlyInput = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlyTextarea = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlySelect = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Study Title', flex: 2.5,
            render: (row) => {
                const t = TOPIC_COLORS[row.topic] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MenuBookIcon sx={{ fontSize: 18, color: t.color }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
                                {row.title}
                            </Typography>
                            {row.scriptureRef && (
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: colors.secondary.main, fontWeight: typography.fontWeight.semiBold, mt: 0.3 }}>
                                    {row.scriptureRef}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'topic', label: 'Topic', flex: 1.1,
            render: (row) => {
                const t = TOPIC_COLORS[row.topic] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return <Box sx={{ ...categoryPill, color: t.color, background: t.bg }}><LocalOfferIcon sx={{ fontSize: 9 }} />{row.topic}</Box>;
            },
        },
        {
            key: 'level', label: 'Level', flex: 0.9,
            render: (row) => {
                const l = LEVEL_COLORS[row.level] || LEVEL_COLORS['Beginner'];
                return <Box sx={{ ...categoryPill, color: l.color, background: l.bg }}><LayersIcon sx={{ fontSize: 9 }} />{row.level}</Box>;
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
            key: 'duration', label: 'Duration', flex: 0.9,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.6}>
                    <AccessTimeIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.5)' }}>{row.duration}</Typography>
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
                    <Typography sx={pageTitleText}>Bible Studies</Typography>
                    <Typography sx={pageSubText}>Manage Bible study materials and series</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Bible Study</AdminButton>
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
                    <Box component="input" placeholder="Search bible studies..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={topicFilter} onChange={e => setTopicFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Topics</option>
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No bible studies found" emptyIcon={MenuBookIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Bible Study' : 'New Bible Study'} accentColor='#8B5CF6' onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Add Study'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Title *</Typography>
                    <Box component="input" placeholder="Study title..." value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Topic</Typography>
                        <Box component="select" value={formData.topic} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, topic: e.target.value }))} sx={isEdit ? readonlySelect : fieldSelect}>
                            {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Level</Typography>
                        <Box component="select" value={formData.level} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, level: e.target.value }))} sx={isEdit ? readonlySelect : fieldSelect}>
                            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </Box>
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Author</Typography>
                        <Box component="input" placeholder="e.g. Pastor JPO" value={formData.author} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, author: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Scripture Reference</Typography>
                        <Box component="input" placeholder="e.g. Hebrews 11:1" value={formData.scriptureRef} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, scriptureRef: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Duration</Typography>
                        <Box component="input" placeholder="e.g. 4 weeks" value={formData.duration} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, duration: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>No. of Sessions</Typography>
                        <Box component="input" placeholder="e.g. 8" value={formData.sessions} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, sessions: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Description</Typography>
                    <Box component="textarea" placeholder="What will this study cover..." value={formData.description} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, description: e.target.value }))} sx={isEdit ? readonlyTextarea : fieldTextarea} />
                </Box>
                <Box onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, published: !p.published }))}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData.published ? 'rgba(212,160,23,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData.published ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: formData.published ? colors.secondary.main : 'rgba(255,255,255,0.2)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData.published ? colors.secondary.main : 'rgba(255,255,255,0.3)' }}>Published</Typography>
                </Box>
            </AdminFormModal>

            {/* Preview Modal */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (() => {
                    const t = TOPIC_COLORS[preview.topic] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                    const l = LEVEL_COLORS[preview.level] || LEVEL_COLORS['Beginner'];
                    return (
                        <DialogContent sx={{ p: 0 }}>
                            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${t.color}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <Box sx={modalHeader}>
                                <Typography sx={modalTitle}>Bible Study Preview</Typography>
                                <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Stack direction="row" gap={1} mb={2}>
                                    <Box sx={{ ...categoryPill, color: t.color, background: t.bg }}><LocalOfferIcon sx={{ fontSize: 9 }} />{preview.topic}</Box>
                                    <Box sx={{ ...categoryPill, color: l.color, background: l.bg }}><LayersIcon sx={{ fontSize: 9 }} />{preview.level}</Box>
                                </Stack>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 0.8 }}>{preview.title}</Typography>
                                {preview.scriptureRef && <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: colors.secondary.main, mb: 2 }}>— {preview.scriptureRef}</Typography>}
                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                                    {[
                                        { label: 'Author', value: preview.author },
                                        { label: 'Duration', value: preview.duration },
                                        { label: 'Sessions', value: `${preview.sessions} sessions` },
                                        { label: 'Status', value: preview.published ? 'Published' : 'Draft', color: preview.published ? colors.accent.green : 'rgba(255,255,255,0.35)' },
                                    ].map(m => (
                                        <Box key={m.label} sx={modalSection}>
                                            <Typography sx={modalLabel}>{m.label}</Typography>
                                            <Typography sx={{ ...modalValue, ...(m.color ? { color: m.color } : {}) }}>{m.value}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                {preview.description && (
                                    <>
                                        <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{preview.description}</Typography>
                                    </>
                                )}
                            </Box>
                        </DialogContent>
                    );
                })()}
            </Dialog>
        </Box>
    );
}