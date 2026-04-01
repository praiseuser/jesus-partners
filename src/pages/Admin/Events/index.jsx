import { useState } from 'react';
import { Box, Typography, Stack, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill, statusDot, modalBox, modalHeader, modalTitle, modalCloseBtn, modalSection, modalLabel, modalValue } from '../AdminStyles';

const EVENT_TYPES = ['Conference', 'Youth Summit', 'Prayer Night', 'Seminar', 'Concert', 'Outreach', 'Anniversary', 'Workshop'];
const STATUSES = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

const TYPE_COLORS = {
    'Conference': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
    'Youth Summit': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'Prayer Night': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
    'Seminar': { color: colors.secondary.main, bg: `${colors.secondary.main}15` },
    'Concert': { color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
    'Outreach': { color: colors.accent.teal, bg: `${colors.accent.teal}15` },
    'Anniversary': { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    'Workshop': { color: colors.accent.green, bg: `${colors.accent.green}15` },
};

const STATUS_COLORS = {
    'Upcoming': { color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
    'Ongoing': { color: colors.accent.green, bg: `${colors.accent.green}12` },
    'Completed': { color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.06)' },
    'Cancelled': { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
};

const EMPTY_FORM = {
    title: '', type: 'Conference', status: 'Upcoming',
    location: '', date: '', time: '', endDate: '',
    expectedAttendance: '', ticketed: false, ticketPrice: '',
    organizer: '', description: '',
};

const DUMMY = [
    {
        id: 1, title: 'Annual Missions Conference 2025', type: 'Conference', status: 'Upcoming',
        location: 'Lekki Phase 1, Lagos', date: 'May 3, 2025', time: '9:00 AM', endDate: 'May 5, 2025',
        expectedAttendance: '2,000+', ticketed: false, ticketPrice: '',
        organizer: 'Pastor JPO',
        description: 'A three-day conference bringing together missionaries, pastors, and believers to strategise for the Great Commission across Africa and beyond.',
    },
];

export default function AdminEventsPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(e => {
        const matchType = typeFilter === 'All' || e.type === typeFilter;
        const matchSrch = e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.location.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#E74C3C' },
        { label: 'Upcoming', value: DUMMY.filter(e => e.status === 'Upcoming').length, color: '#3B82F6' },
        { label: 'Ongoing', value: DUMMY.filter(e => e.status === 'Ongoing').length, color: colors.accent.green },
        { label: 'Completed', value: DUMMY.filter(e => e.status === 'Completed').length, color: 'rgba(255,255,255,0.4)' },
    ];

    const ri = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rt = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rs = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Event', flex: 2.5,
            render: (row) => {
                const t = TYPE_COLORS[row.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                        <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <EventIcon sx={{ fontSize: 18, color: t.color }} />
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
            key: 'type', label: 'Type', flex: 1.1,
            render: (row) => {
                const t = TYPE_COLORS[row.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                return <Box sx={{ ...categoryPill, color: t.color, background: t.bg }}>{row.type}</Box>;
            },
        },
        {
            key: 'date', label: 'Date', flex: 1.1,
            render: (row) => (
                <Box>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <CalendarTodayIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.7)' }}>{row.date}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={0.5} mt={0.2}>
                        <AccessTimeIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{row.time}</Typography>
                    </Stack>
                </Box>
            ),
        },
        {
            key: 'expectedAttendance', label: 'Expected', flex: 0.8,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.5}>
                    <GroupsIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.5)' }}>{row.expectedAttendance}</Typography>
                </Stack>
            ),
        },
        {
            key: 'ticketed', label: 'Entry', flex: 0.7,
            render: (row) => (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.2, py: 0.4, borderRadius: '6px', background: row.ticketed ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.06)', border: `1px solid ${row.ticketed ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.1)'}` }}>
                    <ConfirmationNumberIcon sx={{ fontSize: 10, color: row.ticketed ? '#F59E0B' : 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: typography.fontWeight.bold, color: row.ticketed ? '#F59E0B' : 'rgba(255,255,255,0.35)' }}>
                        {row.ticketed ? 'Ticketed' : 'Free'}
                    </Typography>
                </Box>
            ),
        },
        {
            key: 'status', label: 'Status', flex: 0.9,
            render: (row) => {
                const s = STATUS_COLORS[row.status] || STATUS_COLORS['Upcoming'];
                return (
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.2, py: 0.4, borderRadius: '6px', background: s.bg, border: `1px solid ${s.color}30` }}>
                        <Box sx={{ ...statusDot, background: s.color }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: typography.fontWeight.bold, color: s.color }}>{row.status}</Typography>
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
                    <Typography sx={pageTitleText}>Events</Typography>
                    <Typography sx={pageSubText}>Manage conferences, summits and ministry events</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Event</AdminButton>
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
                    <Box component="input" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Types</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No events found" emptyIcon={EventIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Event' : 'New Event'} accentColor='#E74C3C' onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Add Event'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Event Title *</Typography>
                    <Box component="input" placeholder="e.g. Annual Missions Conference" value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Type</Typography>
                        <Box component="select" value={formData.type} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, type: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </Box>
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Status</Typography>
                        <Box component="select" value={formData.status} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, status: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </Box>
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Location</Typography>
                    <Box component="input" placeholder="e.g. Lekki Phase 1, Lagos" value={formData.location} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, location: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Start Date</Typography>
                        <Box component="input" placeholder="e.g. May 3, 2025" value={formData.date} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, date: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>End Date</Typography>
                        <Box component="input" placeholder="e.g. May 5, 2025" value={formData.endDate} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, endDate: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Time</Typography>
                        <Box component="input" placeholder="e.g. 9:00 AM" value={formData.time} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, time: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Expected Attendance</Typography>
                        <Box component="input" placeholder="e.g. 2,000+" value={formData.expectedAttendance} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, expectedAttendance: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Organizer</Typography>
                        <Box component="input" placeholder="e.g. Pastor JPO" value={formData.organizer} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, organizer: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Ticket Price (if ticketed)</Typography>
                        <Box component="input" placeholder="e.g. ₦5,000" value={formData.ticketPrice} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, ticketPrice: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Description</Typography>
                    <Box component="textarea" placeholder="Describe the event..." value={formData.description} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, description: e.target.value }))} sx={isEdit ? rt : fieldTextarea} />
                </Box>
                <Box onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, ticketed: !p.ticketed }))}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData.ticketed ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData.ticketed ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                    <ConfirmationNumberIcon sx={{ fontSize: 14, color: formData.ticketed ? '#F59E0B' : 'rgba(255,255,255,0.25)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData.ticketed ? '#F59E0B' : 'rgba(255,255,255,0.3)' }}>
                        {formData.ticketed ? 'Ticketed Event' : 'Free Entry'}
                    </Typography>
                </Box>
            </AdminFormModal>

            {/* Preview Modal */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (() => {
                    const t = TYPE_COLORS[preview.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };
                    const s = STATUS_COLORS[preview.status] || STATUS_COLORS['Upcoming'];
                    return (
                        <DialogContent sx={{ p: 0 }}>
                            <Box sx={{ height: 3, background: `linear-gradient(90deg, ${t.color}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                            <Box sx={modalHeader}>
                                <Typography sx={modalTitle}>Event Preview</Typography>
                                <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Stack direction="row" gap={1} mb={2}>
                                    <Box sx={{ ...categoryPill, color: t.color, background: t.bg }}>{preview.type}</Box>
                                    <Box sx={{ ...categoryPill, color: s.color, background: s.bg }}>{preview.status}</Box>
                                    {preview.ticketed && <Box sx={{ ...categoryPill, color: '#F59E0B', background: 'rgba(245,158,11,0.1)' }}><ConfirmationNumberIcon sx={{ fontSize: 9 }} />Ticketed</Box>}
                                </Stack>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 2 }}>{preview.title}</Typography>
                                <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                                    {[
                                        { label: 'Location', value: preview.location },
                                        { label: 'Start', value: preview.date },
                                        { label: 'End', value: preview.endDate || '—' },
                                        { label: 'Time', value: preview.time },
                                        { label: 'Expected', value: preview.expectedAttendance },
                                        { label: 'Organizer', value: preview.organizer },
                                        ...(preview.ticketed && preview.ticketPrice ? [{ label: 'Ticket', value: preview.ticketPrice }] : []),
                                    ].map(m => (
                                        <Box key={m.label} sx={modalSection}>
                                            <Typography sx={modalLabel}>{m.label}</Typography>
                                            <Typography sx={modalValue}>{m.value}</Typography>
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