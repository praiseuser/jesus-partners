import { useState, useEffect } from 'react';
import { Box, Typography, Stack, Tooltip } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { typography } from '../../../theme';

const tableWrap = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    overflow: 'hidden',
};

const tableHeader = {
    display: 'flex',
    alignItems: 'center',
    px: 2.5,
    py: 1.5,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.03)',
};

const tableHeaderCell = {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    color: 'rgba(255,255,255,0.28)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
};

const tableRow = {
    display: 'flex',
    alignItems: 'center',
    px: 2.5,
    py: 1.8,
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.2s ease',
    animation: 'rowIn 0.35s ease both',
    '@keyframes rowIn': {
        from: { opacity: 0, transform: 'translateX(-8px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
    },
    '&:last-child': { borderBottom: 'none' },
    '&:hover': { background: 'rgba(255,255,255,0.03)' },
};

const emptyState = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 10,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
};

const actionBtn = {
    width: 30,
    height: 30,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.35)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    transition: 'all 0.2s ease',
    '&:hover': { background: 'rgba(255,255,255,0.1)', color: '#fff' },
};

const pageBtn = {
    width: 32,
    height: 32,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.45)',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#fff' },
};

const pageBtnActive = {
    ...pageBtn,
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.18)',
};

const pageBtnDisabled = {
    ...pageBtn,
    opacity: 0.25,
    cursor: 'not-allowed',
    pointerEvents: 'none',
};

export default function AdminTable({
    columns = [],
    rows = [],
    actions = [],
    emptyText = 'No data found',
    emptyIcon: EmptyIcon = ArticleIcon,
    rowsPerPage = 5,
}) {
    const [page, setPage] = useState(1);
    useEffect(() => { setPage(1); }, [rows.length]);

    const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
    const start = (page - 1) * rowsPerPage;
    const pageRows = rows.slice(start, start + rowsPerPage);

    const goTo = (p) => { if (p >= 1 && p <= totalPages) setPage(p); };

    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (page <= 3) return [1, 2, 3, 4, 5];
        if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [page - 2, page - 1, page, page + 1, page + 2];
    };

    if (rows.length === 0) {
        return (
            <Box sx={emptyState}>
                <EmptyIcon sx={{ fontSize: 52, color: 'rgba(255,255,255,0.1)', mb: 1.5 }} />
                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.35)' }}>
                    {emptyText}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={tableWrap}>
                <Box sx={tableHeader}>
                    {columns.map(col => (
                        <Typography key={col.key} sx={{ ...tableHeaderCell, flex: col.flex ?? 1 }}>
                            {col.label}
                        </Typography>
                    ))}
                    {actions.length > 0 && (
                        <Typography sx={{ ...tableHeaderCell, flex: 0.8, textAlign: 'right' }}>
                            Actions
                        </Typography>
                    )}
                </Box>
                {pageRows.map((row, i) => (
                    <Box key={row.id ?? i} sx={{ ...tableRow, animationDelay: `${i * 55}ms` }}>
                        {columns.map(col => (
                            <Box key={col.key} sx={{ flex: col.flex ?? 1, minWidth: 0 }}>
                                {col.render ? col.render(row) : (
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.6)', fontWeight: typography.fontWeight.medium }}>
                                        {row[col.key] ?? '—'}
                                    </Typography>
                                )}
                            </Box>
                        ))}

                        {actions.length > 0 && (
                            <Stack direction="row" gap={0.8} justifyContent="flex-end" sx={{ flex: 0.8 }}>
                                {actions.map((action, ai) => (
                                    <Tooltip key={ai} title={action.tooltip ?? ''}>
                                        <Box
                                            sx={{
                                                ...actionBtn,
                                                ...(action.hoverColor ? {
                                                    '&:hover': {
                                                        background: `${action.hoverColor}18`,
                                                        color: action.hoverColor,
                                                        borderColor: `${action.hoverColor}30`,
                                                    },
                                                } : {}),
                                            }}
                                            onClick={() => action.onClick?.(row)}
                                        >
                                            {action.icon}
                                        </Box>
                                    </Tooltip>
                                ))}
                            </Stack>
                        )}
                    </Box>
                ))}

            </Box>
            {totalPages > 1 && (
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2.5, px: 0.5 }}>

                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: 'rgba(255,255,255,0.28)' }}>
                        Showing {start + 1}–{Math.min(start + rowsPerPage, rows.length)} of {rows.length}
                    </Typography>

                    <Stack direction="row" gap={0.8} alignItems="center">
                        <Box sx={page === 1 ? pageBtnDisabled : pageBtn} onClick={() => goTo(page - 1)}>
                            <ChevronLeftIcon sx={{ fontSize: 16 }} />
                        </Box>

                        {getPageNumbers().map(num => (
                            <Box key={num} sx={num === page ? pageBtnActive : pageBtn} onClick={() => goTo(num)}>
                                {num}
                            </Box>
                        ))}

                        <Box sx={page === totalPages ? pageBtnDisabled : pageBtn} onClick={() => goTo(page + 1)}>
                            <ChevronRightIcon sx={{ fontSize: 16 }} />
                        </Box>
                    </Stack>

                </Stack>
            )}
        </Box>
    );
}