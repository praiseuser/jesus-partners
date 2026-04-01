import { useState } from 'react';
import { Box, Typography, Stack, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PushPinIcon from '@mui/icons-material/PushPin';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill, statusDot, featuredBadge, modalBox, modalHeader, modalTitle, modalCloseBtn, modalSection, modalLabel, modalValue } from '../AdminStyles';

const AUDIENCES = ['Everyone', 'Partners', 'Leaders', 'Youth', 'Prayer Team'];
const PRIORITIES = ['Normal', 'Important', 'Urgent'];

const PRIORITY_META = {
    'Normal': { color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.06)' },
    'Important': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Urgent': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
};

const EMPTY_FORM = {
    title: '', audience: 'Everyone', priority: 'Normal',
    author: '', date: '', content: '', pinned: false, published: true,
};

const DUMMY = [
    { id: 1, title: 'Sunday Service Rescheduled to 8AM', audience: 'Everyone', priority: 'Important', author: 'Admin', date: 'Mar 28, 2025', content: 'Please note that this Sunday\'s service has been rescheduled to 8:00 AM due to a special programme. All members are expected to be seated by 7:45 AM.', pinned: true, published: true },
];

export default function AdminAnnouncementsPage() {
    const [search, setSearch] = useState('');
    const [audFilter, setAudFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(a => {
        const matchAud = audFilter === 'All' || a.audience === audFilter;
        const matchSrch = a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.author.toLowerCase().includes(search.toLowerCase());
        return matchAud && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#3B82F6' },
        { label: 'Published', value: DUMMY.filter(a => a.published).length, color: colors.accent.green },
        { label: 'Pinned', value: DUMMY.filter(a => a.pinned).length, color: colors.secondary.main },
        { label: 'Urgent', value: DUMMY.filter(a => a.priority === 'Urgent').length, color: '#E74C3C' },
    ];

    const readonlyInput = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlyTextarea = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlySelect = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Announcement', flex: 2.8,
            render: (row) => {
                const p = PRIORITY_META[row.priority];
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CampaignIcon sx={{ fontSize: 18, color: p.color }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
                                {row.title}
                            </Typography>
                            <Stack direction="row" gap={0.8} alignItems="center" mt={0.3}>
                                {row.pinned && (
                                    <Box sx={featuredBadge}><PushPinIcon sx={{ fontSize: 9 }} /> Pinned</Box>
                                )}
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                                    For: {row.audience}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'priority', label: 'Priority', flex: 1,
            render: (row) => {
                const p = PRIORITY_META[row.priority];
                return (
                    <Box sx={{ ...categoryPill, color: p.color, background: p.bg }}>
                        {row.priority === 'Urgent' && <PriorityHighIcon sx={{ fontSize: 10 }} />}
                        {row.priority}
                    </Box>
                );
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
                    <Typography sx={pageTitleText}>Announcements</Typography>
                    <Typography sx={pageSubText}>Publish notices to members, partners and leaders</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Announcement</AdminButton>
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
                    <Box component="input" placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={audFilter} onChange={e => setAudFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Audiences</option>
                    {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No announcements found" emptyIcon={CampaignIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Announcement' : 'New Announcement'} accentColor={colors.secondary.main} onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Publish'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Title *</Typography>
                    <Box component="input" placeholder="Announcement title..." value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Audience</Typography>
                        <Box component="select" value={formData.audience} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, audience: e.target.value }))} sx={isEdit ? readonlySelect : fieldSelect}>
                            {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Priority</Typography>
                        <Box component="select" value={formData.priority} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, priority: e.target.value }))} sx={isEdit ? readonlySelect : fieldSelect}>
                            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                        </Box>
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Author</Typography>
                        <Box component="input" placeholder="Author name..." value={formData.author} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, author: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Date</Typography>
                        <Box component="input" placeholder="e.g. Mar 28, 2025" value={formData.date} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, date: e.target.value }))} sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Content *</Typography>
                    <Box component="textarea" placeholder="Write your announcement..." value={formData.content} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, content: e.target.value }))} sx={isEdit ? readonlyTextarea : fieldTextarea} />
                </Box>
                <Stack direction="row" gap={2}>
                    {[{ key: 'published', label: 'Published' }, { key: 'pinned', label: 'Pinned' }].map(t => (
                        <Box key={t.key} onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, [t.key]: !p[t.key] }))}
                            sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData[t.key] ? 'rgba(212,160,23,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData[t.key] ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: formData[t.key] ? colors.secondary.main : 'rgba(255,255,255,0.2)' }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData[t.key] ? colors.secondary.main : 'rgba(255,255,255,0.3)' }}>{t.label}</Typography>
                        </Box>
                    ))}
                </Stack>
            </AdminFormModal>

            {/* Preview Modal */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (() => {
                    const p = PRIORITY_META[preview.priority];
                    return (
                        <DialogContent sx={{ p: 0 }}>
                            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <Box sx={modalHeader}>
                                <Typography sx={modalTitle}>Announcement Preview</Typography>
                                <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Stack direction="row" gap={1} mb={2} alignItems="center">
                                    <Box sx={{ ...categoryPill, color: p.color, background: p.bg }}>{preview.priority}</Box>
                                    {preview.pinned && <Box sx={featuredBadge}><PushPinIcon sx={{ fontSize: 9 }} /> Pinned</Box>}
                                </Stack>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 2 }}>{preview.title}</Typography>
                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                <Stack direction="row" gap={2.5} flexWrap="wrap" mb={2.5}>
                                    {[
                                        { label: 'Audience', value: preview.audience },
                                        { label: 'Author', value: preview.author },
                                        { label: 'Date', value: preview.date },
                                        { label: 'Status', value: preview.published ? 'Published' : 'Draft', color: preview.published ? colors.accent.green : 'rgba(255,255,255,0.35)' },
                                    ].map(m => (
                                        <Box key={m.label} sx={modalSection}>
                                            <Typography sx={modalLabel}>{m.label}</Typography>
                                            <Typography sx={{ ...modalValue, ...(m.color ? { color: m.color } : {}) }}>{m.value}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>{preview.content}</Typography>
                            </Box>
                        </DialogContent>
                    );
                })()}
            </Dialog>
        </Box>
    );
}