import { useState } from 'react';
import { Box, Typography, Stack, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { colors, typography } from '../../../theme';
import AdminTable from '../../../components/admin/AdminTable';
import AdminButton from '../../../components/admin/AdminButton';
import AdminFormModal, { fieldWrap, fieldLabel, fieldInput, fieldSelect, fieldTextarea } from '../../../components/admin/AdminFormModal';
import { pageWrapper, pageHeader, pageTitleText, pageSubText, searchBar, filterSelect, categoryPill, statusDot, modalBox, modalHeader, modalTitle, modalCloseBtn, modalSection, modalLabel, modalValue } from '../AdminStyles';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EMPTY_FORM = {
    title: '', scriptureRef: '', scriptureText: '', author: '',
    date: '', month: 'January', content: '', confession: '', published: true,
};

const DUMMY = [
    {
        id: 1, title: 'You Are More Than a Conqueror', scriptureRef: 'Romans 8:37',
        scriptureText: 'Nay, in all these things we are more than conquerors through him that loved us.',
        author: 'Pastor JPO', date: 'Jan 1, 2025', month: 'January',
        content: 'God has not called you to barely survive — He has called you to thrive. Today, walk in the full awareness that no situation, no enemy, no circumstance has power over the one who is in Christ Jesus.',
        confession: 'I am more than a conqueror through Christ who loves me. I overcome every challenge by the power of God within me.',
        published: true,
    },
];

export default function AdminDailyDevotionPage() {
    const [search, setSearch] = useState('');
    const [monthFilter, setMonthFilter] = useState('All');
    const [preview, setPreview] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isEdit, setIsEdit] = useState(false);

    const filtered = DUMMY.filter(d => {
        const matchMonth = monthFilter === 'All' || d.month === monthFilter;
        const matchSrch = d.title.toLowerCase().includes(search.toLowerCase()) ||
            d.scriptureRef.toLowerCase().includes(search.toLowerCase()) ||
            d.author.toLowerCase().includes(search.toLowerCase());
        return matchMonth && matchSrch;
    });

    const openAdd = () => { setFormData(EMPTY_FORM); setIsEdit(false); setFormOpen(true); };
    const openEdit = (row) => { setFormData({ ...row }); setIsEdit(true); setFormOpen(true); };

    const stats = [
        { label: 'Total', value: DUMMY.length, color: '#27AE60' },
        { label: 'Published', value: DUMMY.filter(d => d.published).length, color: colors.accent.green },
        { label: 'Draft', value: DUMMY.filter(d => !d.published).length, color: colors.secondary.main },
        { label: 'This Month', value: DUMMY.filter(d => d.month === new Date().toLocaleString('default', { month: 'long' })).length, color: '#3B82F6' },
    ];

    const ri = { ...fieldInput, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rt = { ...fieldTextarea, opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' };
    const rs = { ...fieldSelect, opacity: 0.6, cursor: 'not-allowed' };

    const columns = [
        {
            key: 'title', label: 'Devotion', flex: 2.5,
            render: (row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                    <Box sx={{ width: 38, height: 38, borderRadius: '10px', flexShrink: 0, background: 'rgba(39,174,96,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AutoStoriesIcon sx={{ fontSize: 18, color: '#27AE60' }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
                            {row.title}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: colors.secondary.main, fontWeight: typography.fontWeight.semiBold, mt: 0.3 }}>
                            {row.scriptureRef}
                        </Typography>
                    </Box>
                </Box>
            ),
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
            key: 'date', label: 'Date', flex: 1,
            render: (row) => (
                <Stack direction="row" alignItems="center" gap={0.6}>
                    <CalendarTodayIcon sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.4)' }}>{row.date}</Typography>
                </Stack>
            ),
        },
        {
            key: 'month', label: 'Month', flex: 0.9,
            render: (row) => (
                <Box sx={{ ...categoryPill, color: '#27AE60', background: 'rgba(39,174,96,0.1)' }}>{row.month}</Box>
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
                    <Typography sx={pageTitleText}>Daily Devotion</Typography>
                    <Typography sx={pageSubText}>Schedule and manage daily devotional content</Typography>
                </Box>
                <AdminButton icon={AddIcon} onClick={openAdd}>New Devotion</AdminButton>
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
                    <Box component="input" placeholder="Search devotions..." value={search} onChange={e => setSearch(e.target.value)}
                        sx={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.25)' } }} />
                </Box>
                <Box component="select" value={monthFilter} onChange={e => setMonthFilter(e.target.value)} sx={filterSelect}>
                    <option value="All">All Months</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </Box>
            </Stack>

            <AdminTable columns={columns} rows={filtered} actions={actions} emptyText="No devotions found" emptyIcon={AutoStoriesIcon} />

            {/* Add / Edit Modal */}
            <AdminFormModal open={formOpen} onClose={() => setFormOpen(false)} title={isEdit ? 'Edit Devotion' : 'New Devotion'} accentColor='#27AE60' onSubmit={() => setFormOpen(false)} submitLabel={isEdit ? 'Update' : 'Add Devotion'}>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Title *</Typography>
                    <Box component="input" placeholder="Devotion title..." value={formData.title} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, title: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Scripture Reference</Typography>
                        <Box component="input" placeholder="e.g. Romans 8:37" value={formData.scriptureRef} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, scriptureRef: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Author</Typography>
                        <Box component="input" placeholder="e.g. Pastor JPO" value={formData.author} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, author: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Date</Typography>
                        <Box component="input" placeholder="e.g. Jan 1, 2025" value={formData.date} readOnly={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, date: e.target.value }))} sx={isEdit ? ri : fieldInput} />
                    </Box>
                    <Box sx={{ ...fieldWrap, flex: 1 }}>
                        <Typography sx={fieldLabel}>Month</Typography>
                        <Box component="select" value={formData.month} disabled={isEdit}
                            onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, month: e.target.value }))} sx={isEdit ? rs : fieldSelect}>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </Box>
                    </Box>
                </Stack>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Scripture Text</Typography>
                    <Box component="textarea" placeholder="Paste the scripture verse..." value={formData.scriptureText} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, scriptureText: e.target.value }))} sx={isEdit ? rt : { ...fieldTextarea, minHeight: 70 }} />
                </Box>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Devotion Content *</Typography>
                    <Box component="textarea" placeholder="Write the devotional message..." value={formData.content} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, content: e.target.value }))} sx={isEdit ? rt : fieldTextarea} />
                </Box>
                <Box sx={fieldWrap}>
                    <Typography sx={fieldLabel}>Daily Confession</Typography>
                    <Box component="textarea" placeholder="Write the confession for today..." value={formData.confession} readOnly={isEdit}
                        onChange={isEdit ? undefined : e => setFormData(p => ({ ...p, confession: e.target.value }))} sx={isEdit ? rt : { ...fieldTextarea, minHeight: 70 }} />
                </Box>
                <Box onClick={isEdit ? undefined : () => setFormData(p => ({ ...p, published: !p.published }))}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.2, borderRadius: '10px', cursor: isEdit ? 'not-allowed' : 'pointer', opacity: isEdit ? 0.6 : 1, background: formData.published ? 'rgba(39,174,96,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${formData.published ? 'rgba(39,174,96,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s ease' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: formData.published ? '#27AE60' : 'rgba(255,255,255,0.2)' }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: formData.published ? '#27AE60' : 'rgba(255,255,255,0.3)' }}>Published</Typography>
                </Box>
            </AdminFormModal>

            {/* Preview Modal */}
            <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth PaperProps={{ sx: modalBox }}>
                {preview && (
                    <DialogContent sx={{ p: 0 }}>
                        <Box sx={{ height: 3, background: 'linear-gradient(90deg, #27AE60, transparent)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                        <Box sx={modalHeader}>
                            <Typography sx={modalTitle}>Devotion Preview</Typography>
                            <Box sx={modalCloseBtn} onClick={() => setPreview(null)}><CloseIcon sx={{ fontSize: 16 }} /></Box>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <Stack direction="row" gap={1} mb={2}>
                                <Box sx={{ ...categoryPill, color: '#27AE60', background: 'rgba(39,174,96,0.1)' }}>{preview.month}</Box>
                                <Box sx={{ ...categoryPill, color: colors.secondary.main, background: `${colors.secondary.main}15` }}>{preview.scriptureRef}</Box>
                            </Stack>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: typography.fontWeight.black, color: '#fff', lineHeight: 1.35, mb: 2 }}>{preview.title}</Typography>
                            {preview.scriptureText && (
                                <Box sx={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', p: 2, mb: 2 }}>
                                    <FormatQuoteIcon sx={{ fontSize: 16, color: colors.secondary.main, mb: 0.5 }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontStyle: 'italic' }}>{preview.scriptureText}</Typography>
                                </Box>
                            )}
                            <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                            <Stack direction="row" gap={2.5} flexWrap="wrap" mb={2.5}>
                                {[
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
                            {preview.content && (
                                <>
                                    <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.07)', mb: 2 }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, mb: 2 }}>{preview.content}</Typography>
                                </>
                            )}
                            {preview.confession && (
                                <Box sx={{ background: `${colors.secondary.main}0d`, border: `1px solid ${colors.secondary.main}25`, borderRadius: '10px', p: 2 }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', fontWeight: typography.fontWeight.bold, color: colors.secondary.main, textTransform: 'uppercase', letterSpacing: '0.8px', mb: 0.8 }}>Daily Confession</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{preview.confession}</Typography>
                                </Box>
                            )}
                        </Box>
                    </DialogContent>
                )}
            </Dialog>
        </Box>
    );
}