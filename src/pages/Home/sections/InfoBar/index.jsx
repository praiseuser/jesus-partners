import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import CampaignIcon    from '@mui/icons-material/Campaign';
import EventIcon       from '@mui/icons-material/Event';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CircleIcon      from '@mui/icons-material/Circle';
import { colors } from '../../../../theme';
import { keyframes, wrapSx, topAccentSx, gridSx, panelSx, panelLabelSx, dotSx, emptyTextSx, tickerItemSx, liveTagSx } from './styles';

/* These will be populated from the admin dashboard later */
const ACTIVITIES    = [];   /* e.g. [{ title: 'Sunday Service', date: '...' }] */
const ANNOUNCEMENTS = [];   /* e.g. [{ text: 'New sermon uploaded' }] */
const EVENTS        = [];   /* e.g. [{ title: 'Conference 2025', date: '...' }] */

const EmptyState = ({ label }) => (
  <Typography sx={emptyTextSx}>No {label.toLowerCase()} at this time</Typography>
);

export default function InfoBar() {
  return (
    <>
      <GlobalStyles styles={keyframes} />
      <Box sx={wrapSx}>
        <Box sx={topAccentSx} />
        <Container maxWidth="lg" disableGutters>
          <Box sx={gridSx}>

            {/* ── Activities ── */}
            <Box sx={panelSx(0)}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography sx={panelLabelSx}>
                  <Box sx={dotSx(colors.secondary.main)} />
                  <LocalActivityIcon sx={{ fontSize: 13, color: colors.secondary.main }} />
                  Activities
                </Typography>
                <Box sx={liveTagSx}>
                  <CircleIcon sx={{ fontSize: 6 }} />
                  Live
                </Box>
              </Stack>
              {ACTIVITIES.length === 0
                ? <EmptyState label="Activities" />
                : ACTIVITIES.map((a, i) => (
                    <Box key={i} sx={{ ...tickerItemSx, mb: 0.5 }}>{a.title}</Box>
                  ))
              }
            </Box>

            {/* ── Announcements ── */}
            <Box sx={panelSx(1)}>
              <Typography sx={panelLabelSx}>
                <Box sx={dotSx(colors.accent.teal)} />
                <CampaignIcon sx={{ fontSize: 13, color: colors.accent.teal }} />
                Announcements
              </Typography>
              {ANNOUNCEMENTS.length === 0
                ? <EmptyState label="Announcements" />
                : ANNOUNCEMENTS.map((a, i) => (
                    <Typography key={i} sx={{ ...tickerItemSx, mb: 0.5 }}>{a.text}</Typography>
                  ))
              }
            </Box>

            {/* ── Upcoming Events ── */}
            <Box sx={panelSx(2)}>
              <Typography sx={panelLabelSx}>
                <Box sx={dotSx(colors.accent.red)} />
                <EventIcon sx={{ fontSize: 13, color: colors.accent.red }} />
                Upcoming Events
              </Typography>
              {EVENTS.length === 0
                ? <EmptyState label="Events" />
                : EVENTS.map((e, i) => (
                    <Box key={i} sx={{ ...tickerItemSx, mb: 0.5 }}>{e.title}</Box>
                  ))
              }
            </Box>

          </Box>
        </Container>
      </Box>
    </>
  );
}