import { useState } from 'react';
import { Box, Typography, Stack, Avatar, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import CampaignIcon from '@mui/icons-material/Campaign';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent } from '@mui/material';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, {
    fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea,
} from '../../../components/admin/AdminFormModal';
import {
    pageWrapper, pageHeader, pageTitleText, pageSubText,
    searchBar, filterSelect, categoryPill, statusDot,
    modalBox, modalHeader, modalTitle, modalCloseBtn,
    modalSection, modalLabel, modalValue,
} from './styles';

// ── Activity types specific to outreach ministry
const ACTIVITY_TYPES = ['Crusade', 'Outreach', 'Prayer Meeting', 'Bible Study', 'Community Service', 'Revival', 'Youth Programme'];

const TYPE_META = {
    'Crusade': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)', icon: MicIcon },
    'Outreach': { color: colors.secondary.main, bg: `${colors.secondary.main}15`, icon: CampaignIcon },
    'Prayer Meeting': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', icon: VolunteerActivismIcon },
    'Bible Study': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', icon: MenuBookIcon },
    'Community Service': { color: colors.accent.teal, bg: `${colors.accent.teal}15`, icon: FavoriteIcon },
    'Revival': { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', icon: LocalActivityIcon },
    'Youth Programme': { color: colors.accent.green, bg: `${colors.accent.green}15`, icon: GroupsIcon },
};

const STATUSES = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

const STATUS_COLORS = {
    'Upcoming': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'Ongoing': { color: colors.accent.green, bg: `${colors.accent.green}12` },
    'Completed': { color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.06)' },
    'Cancelled': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
};

const EMPTY_FORM = {
    title: '', type: 'Crusade', location: '', date: '',
    time: '', expectedAttendance: '', description: '',
    coordinator: '', status: 'Upcoming',
};

const DUMMY_ACTIVITIES = [
    {
        id: 1, title: 'Lagos Island Crusade', type: 'Crusade',
        location: 'Tafawa Balewa Square, Lagos', date: 'Apr 12, 2025',
        time: '4:00 PM', expectedAttendance: '5,000+',
        description: 'A powerful open-air crusade targeting the heart of Lagos Island. Souls will be won, bodies healed, and lives transformed by the power of the Gospel.',
        coordinator: 'Pastor JPO', status: 'Upcoming',
    },
];

function initials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function AdminActivitiesPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY_ACTIVITIES.filter(a => {
        const matchType = typeFilter === 'All' || a.type === typeFilter;
        const matchSrch = a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.location.toLowerCase().includes(search.toLowerCase()) ||
            a.coordinator.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (activity) => { setFormData({ ...activity }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY_ACTIVITIES.length, color: '#3B82F6' },
        { label: 'Upcoming', value: DUMMY_ACTIVITIES.filter(a => a.status === 'Upcoming').length, color: '#3B82F6' },
        { label: 'Ongoing', value: DUMMY_ACTIVITIES.filter(a => a.status === 'Ongoing').length, color: colors.accent.green },
        { label: 'Completed', value: DUMMY_ACTIVITIES.filter(a => a.status === 'Completed').length, color: 'rgba(255,255,255,0.4)' },
    ];

    const readonlyInput = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlyTextarea = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const readonlySelect = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Activity', flex: 2.5,
            render: (row) => {
                const meta = TYPE_META[row.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)', icon: LocalActivityIcon };
                const Icon = meta.icon;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon sx={{ fontSize: 18, color: meta.color }} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>
                                {row.title}
                            </Typography>
                            <Stack direction="row" alignItems="center" gap={0.5} mt={0.3}>
                                <LocationOnIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                                    {row.location}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                );
            },
        },
        {
            key: 'type', label: 'Type', flex: 1.2,
            render: (row) => {
                const meta = TYPE_META[row.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ ...categoryPill, color: meta.color, background: meta.bg, display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.2, py: 0.4, borderRadius: '6px', fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: typography.fontWeight.bold, letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                        {row.type}
                    </Box>
                );
            },
        },
        {
            key: 'date', label: 'Date & Time', flex: 1.2,
            render: (row) => (
                <Box>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <CalendarTodayIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.7)', fontWeight: typography.fontWeight.medium }}>
                            {row.date}
                        </Typography>
                    </Stack>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', mt: 0.2, pl: 2 }}>
                        {row.time}
                    </Typography>
                </Box>
            ),
        },
        {
            key: 'expectedAttendance', label: 'Expected', flex: 0.8,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.5}>
                    <GroupsIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.55)' }}>
                        {row.expectedAttendance}
                    </Typography>
                </Stack>
            ),
        },
        {
            key: 'coordinator', label: 'Coordinator', flex: 1,
            render: (row) => {
                const meta = TYPE_META[row.type] || { color: '#fff' };
                return (
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.6rem', background: `${meta.color}25`, color: meta.color, fontFamily: typography.fontFamily.heading, fontWeight: typography.fontWeight.bold }}>
                            {initials(row.coordinator)}
                        </Avatar>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.6)' }}>
                            {row.coordinator}
                        </Typography>
                    </Stack>
                );
            },
        },
        {
            key: 'status', label: 'Status', flex: 0.9,
            render: (row) => {
                const s = STATUS_COLORS[row.status] || STATUS_COLORS['Upcoming'];
                return (
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.2, py: 0.4, borderRadius: '6px', background: s.bg, border: `1px solid ${s.color}30` }}>
                        <Box sx={{ ...statusDot, background: s.color }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: typography.fontWeight.bold, color: s.color }}>
                            {row.status}
                        </Typography>
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

            {/* Header */}
            <Box sx={pageHeader}>
                <Box>
                    <Typography sx={pageTitleText}>Activities</Typography>
                    <Typography sx={pageSubText}>Manage outreach activities, crusades and programmes</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Activity</AdminButton>
            </Box>

            {/* Stats */}
            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ mb: 3.5 }}>
                {stats.map(s => (
                    <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.2, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', px: 2, py: 1.2 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff' }}>{s.value}</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{s.label}</Typography>
                    </Box>
                ))}
            </Stack>

            {/* Search + Filter */}
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mb: 3 }}>
                <Box sx={{ ...searchBar, flex: 1 }}>
                    <Box component="input" placeholder="Search activities..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Types</option>
                    {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </Box>
            </Stack>

            {/* Table */}
            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No activities found" emptyIcon={LocalActivityIcon} />

            {/* ── Add / Edit Modal ── */}
            <AdminFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                title={isEdit ? 'Edit Activity' : 'New Activity'}
                accentColor={colors.secondary.main}
                onSubmit={() => setFormOpen(false)}
                submitLabel={isEdit ? 'Update Activity' : 'Add Activity'}
            >
                {/* Title */}
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Activity Title *</Typography>
                    <Box component="input" placeholder="e.g. Lagos Island Crusade" value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))}
                        sx={isEdit ? readonlyInput : fieldInput} />
                </Box>

                {/* Type + Status */}
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Type</Typography>
                        <Box component="select" value={formData.type} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, type: e.target.value }))}
                            sx={isEdit ? readonlySelect : fieldSelect}>
                            {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Status</Typography>
                        <Box component="select" value={formData.status} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, status: e.target.value }))}
                            sx={isEdit ? readonlySelect : fieldSelect}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </Box>
                    </Box>
                </Stack>

                {/* Location */}
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Location</Typography>
                    <Box component="input" placeholder="e.g. Tafawa Balewa Square, Lagos" value={formData.location} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, location: e.target.value }))}
                        sx={isEdit ? readonlyInput : fieldInput} />
                </Box>

                {/* Date + Time */}
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Date</Typography>
                        <Box component="input" placeholder="e.g. Apr 12, 2025" value={formData.date} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, date: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Time</Typography>
                        <Box component="input" placeholder="e.g. 4:00 PM" value={formData.time} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, time: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>

                {/* Expected Attendance + Coordinator */}
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Expected Attendance</Typography>
                        <Box component="input" placeholder="e.g. 5,000+" value={formData.expectedAttendance} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, expectedAttendance: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Coordinator</Typography>
                        <Box component="input" placeholder="e.g. Pastor JPO" value={formData.coordinator} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, coordinator: e.target.value }))}
                            sx={isEdit ? readonlyInput : fieldInput} />
                    </Box>
                </Stack>

                {/* Description */}
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Description</Typography>
                    <Box component="textarea" placeholder="What is this activity about..." value={formData.description} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, description: e.target.value }))}
                        sx={isEdit ? readonlyTextarea : fieldTextarea} />
                </Box>
            </AdminFormModal>

            {/* ── Preview Modal ── */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (() => {
                    const meta = TYPE_META[preview.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)', icon: LocalActivityIcon };
                    const Icon = meta.icon;
                    const s = STATUS_COLORS[preview.status] || STATUS_COLORS['Upcoming'];
                    return (
                        <DialogContent sx={{ p: 0 }}>
                            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${meta.color}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <Box sx={modalHeader}>
                                <Typography sx={modalTitle}>Activity Preview</Typography>
                                <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                {/* Icon + Type */}
                                <Stack direction="row" alignItems="center" gap={1.5} mb={2}>
                                    <Box sx={{ width: 42, height: 42, borderRadius: '11px', background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon sx={{ fontSize: 20, color: meta.color }} />
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.2, py: 0.3, borderRadius: '6px', background: meta.bg, mb: 0.3 }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: typography.fontWeight.bold, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{preview.type}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.2, py: 0.3, borderRadius: '6px', background: s.bg, ml: 1 }}>
                                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: typography.fontWeight.bold, color: s.color }}>{preview.status}</Typography>
                                        </Box>
                                    </Box>
                                </Stack>

                                {/* Title */}
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.15rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 2 }}>
                                    {preview.title}
                                </Typography>

                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />

                                {/* Meta grid */}
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                                    {[
                                        { label: 'Location', icon: <LocationOnIcon sx={{ fontSize: 11 }} />, value: preview.location },
                                        { label: 'Date', icon: <CalendarTodayIcon sx={{ fontSize: 11 }} />, value: preview.date },
                                        { label: 'Time', icon: null, value: preview.time },
                                        { label: 'Expected', icon: <GroupsIcon sx={{ fontSize: 11 }} />, value: preview.expectedAttendance },
                                        { label: 'Coordinator', icon: null, value: preview.coordinator },
                                    ].map(m => (
                                        <Box key={m.label} sx={modalSection}>
                                            <Typography sx={modalLabel}>{m.icon} {m.label}</Typography>
                                            <Typography sx={modalValue}>{m.value || '—'}</Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Description */}
                                {preview.description && (
                                    <>
                                        <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
                                            {preview.description}
                                        </Typography>
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