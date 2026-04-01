import { useState } from 'react';
import { Box, Typography, Stack, Dialog, DialogContent, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';
import LayersIcon from '@mui/icons-material/Layers';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill, statusDot, modalBox, modalHeader, modalTitle, modalCloseBtn, modalSection, modalLabel, modalValue } from '../AdminStyles';

const TRACKS = ['New Believer', 'Growing Believer', 'Mature Believer', 'Leadership Track'];
const FORMATS = ['In-Person', 'Online', 'Hybrid'];

const TRACK_COLORS = {
    'New Believer': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'Growing Believer': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Mature Believer': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
    'Leadership Track': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
};

const EMPTY_FORM = {
    title: '', track: 'New Believer', format: 'In-Person',
    facilitator: '', duration: '', maxEnrollment: '',
    description: '', modules: '', published: true, active: true,
};

const DUMMY = [
    {
        id: 1, title: 'Foundation Course — New Believer Onboarding',
        track: 'New Believer', format: 'In-Person', facilitator: 'Pastor JPO',
        duration: '6 weeks', maxEnrollment: '30', enrolled: 0,
        description: 'A comprehensive onboarding journey for new converts. Covers salvation, baptism, prayer, Bible reading, fellowship, and the Holy Spirit.',
        modules: '6', published: true, active: true,
    },
];

export default function AdminDiscipleshipPage() {
    const [search, setSearch] = useState('');
    const [trackFilter, setTrackFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(d => {
        const matchTrack = trackFilter === 'All' || d.track === trackFilter;
        const matchSrch = d.title.toLowerCase().includes(search.toLowerCase()) ||
            d.facilitator.toLowerCase().includes(search.toLowerCase());
        return matchTrack && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#1ABC9C' },
        { label: 'Active', value: DUMMY.filter(d => d.active).length, color: colors.accent.green },
        { label: 'Enrolled', value: DUMMY.reduce((a, d) => a + (d.enrolled || 0), 0), color: colors.secondary.main },
        { label: 'Tracks', value: TRACKS.length, color: '#8B5CF6' },
    ];

    const ri = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rt = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rs = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Programme', flex: 2.5,
            render: (row) => {
                const t = TRACK_COLORS[row.track] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SchoolIcon sx={{ fontSize: 18, color: t.color }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
                                {row.title}
                            </Typography>
                            <Stack direction="row" alignItems="center" gap={0.5} mt={0.3}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 11, color: row.active ? colors.accent.green : 'rgba(255,255,255,0.25)' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: row.active ? colors.accent.green : 'rgba(255,255,255,0.3)' }}>
                                    {row.active ? 'Active' : 'Inactive'} · {row.format}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'track', label: 'Track', flex: 1.2,
            render: (row) => {
                const t = TRACK_COLORS[row.track] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return <Box sx={{ ...categoryPill, color: t.color, background: t.bg }}><LayersIcon sx={{ fontSize: 9 }} />{row.track}</Box>;
            },
        },
        {
            key: 'facilitator', label: 'Facilitator', flex: 1,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.6}>
                    <PersonIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.6)' }}>{row.facilitator}</Typography>
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
            key: 'enrolled', label: 'Enrolled', flex: 0.9,
            render: (row) => {
                const max = parseInt(row.maxEnrollment) || 1;
                const pct = Math.min(100, Math.round(((row.enrolled || 0) / max) * 100));
                return (
                    <Box sx={{ minWidth: 80 }}>
                        <Stack direction="row" justifyContent="space-between" mb={0.4}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{row.enrolled || 0}/{row.maxEnrollment}</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{pct}%</Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={pct} sx={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.08)', '& .MuiLinearProgress-bar': { background: '#1ABC9C', borderRadius: 4 } }} />
                    </Box>
                );
            },
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
                    <Typography sx={pageTitleText}>Discipleship</Typography>
                    <Typography sx={pageSubText}>Manage discipleship programmes and tracks</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Programme</AdminButton>
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
                    <Box component="input" placeholder="Search programmes..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={trackFilter} onChange={e => setTrackFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Tracks</option>
                    {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No programmes found" emptyIcon={SchoolIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Programme' : 'New Programme'} accentColor='#1ABC9C' onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Add Programme'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Programme Title *</Typography>
                    <Box component="input" placeholder="e.g. Foundation Course" value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Track</Typography>
                        <Box component="select" value={formData.track} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, track: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Format</Typography>
                        <Box component="select" value={formData.format} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, format: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                        </Box>
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Facilitator</Typography>
                        <Box component="input" placeholder="e.g. Pastor JPO" value={formData.facilitator} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, facilitator: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Duration</Typography>
                        <Box component="input" placeholder="e.g. 6 weeks" value={formData.duration} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, duration: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Max Enrollment</Typography>
                        <Box component="input" placeholder="e.g. 30" value={formData.maxEnrollment} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, maxEnrollment: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>No. of Modules</Typography>
                        <Box component="input" placeholder="e.g. 6" value={formData.modules} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, modules: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Description</Typography>
                    <Box component="textarea" placeholder="What will participants learn..." value={formData.description} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, description: e.target.value }))} sx={isEdit ? rt : fieldTextarea} />
                </Box>
                <Stack direction="row" gap={2}>
                    {[{ key: 'published', label: 'Published' }, { key: 'active', label: 'Active' }].map(t => (
                        <Box key={t.key} onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, [t.key]: !p[t.key] }))}
                            sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData[t.key] ? 'rgba(26,188,156,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData[t.key] ? 'rgba(26,188,156,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: formData[t.key] ? '#1ABC9C' : 'rgba(255,255,255,0.2)' }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData[t.key] ? '#1ABC9C' : 'rgba(255,255,255,0.3)' }}>{t.label}</Typography>
                        </Box>
                    ))}
                </Stack>
            </AdminFormModal>

            {/* Preview Modal */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (() => {
                    const t = TRACK_COLORS[preview.track] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                    const max = parseInt(preview.maxEnrollment) || 1;
                    const pct = Math.min(100, Math.round(((preview.enrolled || 0) / max) * 100));
                    return (
                        <DialogContent sx={{ p: 0 }}>
                            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${t.color}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <Box sx={modalHeader}>
                                <Typography sx={modalTitle}>Programme Preview</Typography>
                                <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Stack direction="row" gap={1} mb={2}>
                                    <Box sx={{ ...categoryPill, color: t.color, background: t.bg }}><LayersIcon sx={{ fontSize: 9 }} />{preview.track}</Box>
                                    <Box sx={{ ...categoryPill, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.06)' }}>{preview.format}</Box>
                                </Stack>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 2 }}>{preview.title}</Typography>
                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2.5 }}>
                                    {[
                                        { label: 'Facilitator', value: preview.facilitator },
                                        { label: 'Duration', value: preview.duration },
                                        { label: 'Modules', value: `${preview.modules} modules` },
                                        { label: 'Status', value: preview.active ? 'Active' : 'Inactive', color: preview.active ? colors.accent.green : '#E74C3C' },
                                    ].map(m => (
                                        <Box key={m.label} sx={modalSection}>
                                            <Typography sx={modalLabel}>{m.label}</Typography>
                                            <Typography sx={{ ...modalValue, ...(m.color ? { color: m.color } : {}) }}>{m.value}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{ mb: 2.5 }}>
                                    <Stack direction="row" justifyContent="space-between" mb={0.8}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Enrollment</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: 'rgba(255,255,255,0.4)' }}>{preview.enrolled || 0} / {preview.maxEnrollment}</Typography>
                                    </Stack>
                                    <LinearProgress variant="determinate" value={pct} sx={{ height: 6, borderRadius: 4, background: 'rgba(255,255,255,0.08)', '& .MuiLinearProgress-bar': { background: '#1ABC9C', borderRadius: 4 } }} />
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