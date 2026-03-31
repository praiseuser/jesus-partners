import { Box, Typography, Dialog, DialogContent, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors, typography } from '../../../theme';
import AdminButton from '../AdminButton';

const modalBox = {
    background: colors.primary.dark,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
};

const modalHeader = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 3,
    pt: 2.5,
    pb: 2,
    borderBottom: '1px solid rgba(255,255,255,0.07)',
};

const closeBtn = {
    width: 28,
    height: 28,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.4)',
    background: 'rgba(255,255,255,0.05)',
    transition: 'all 0.2s ease',
    '&:hover': { background: 'rgba(255,255,255,0.1)', color: '#fff' },
};
export const fieldWrap = {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.7,
};

export const fieldLabel = {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
};

export const fieldInput = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    px: 1.8,
    py: 1.2,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    '&::placeholder': { color: 'rgba(255,255,255,0.2)' },
    '&:focus': { borderColor: `${colors.secondary.main}60` },
};

export const fieldSelect = {
    ...fieldInput,
    cursor: 'pointer',
    '& option': { background: colors.primary.dark, color: '#fff' },
};

export const fieldTextarea = {
    ...fieldInput,
    resize: 'vertical',
    minHeight: 100,
    lineHeight: 1.7,
};

export default function AdminFormModal({
    open,
    onClose,
    title = 'Form',
    accentColor = colors.secondary.main,
    maxWidth = 'sm',
    onSubmit,
    submitLabel = 'Save',
    submitVariant = 'primary',
    loading = false,
    children,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{ sx: modalBox }}
        >
            <DialogContent sx={{ p: 0 }}>
                <Box sx={{
                    height: 3,
                    background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                }} />

                <Box sx={modalHeader}>
                    <Typography sx={{
                        fontFamily: typography.fontFamily.heading,
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.bold,
                        color: '#fff',
                    }}>
                        {title}
                    </Typography>
                    <Box sx={closeBtn} onClick={onClose}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                    </Box>
                </Box>

                <Box sx={{ p: 3, pb: 2, overflowY: 'auto', maxHeight: '60vh' }}>
                    <Stack gap={2.5}>
                        {children}
                    </Stack>
                </Box>

                {onSubmit && (
                    <Box sx={{
                        px: 3, py: 2,
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        background: colors.primary.dark,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1.5,
                    }}>
                        <AdminButton variant="ghost" onClick={onClose} size="sm">
                            Cancel
                        </AdminButton>
                        <AdminButton variant={submitVariant} onClick={onSubmit} size="sm">
                            {loading ? 'Saving...' : submitLabel}
                        </AdminButton>
                    </Box>
                )}

            </DialogContent>
        </Dialog>
    );
}