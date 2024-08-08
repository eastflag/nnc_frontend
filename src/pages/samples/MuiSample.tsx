import {Box, Container} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function MuiSample() {
  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 2,
            p: 2,
            minWidth: 300,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
          <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
            98.3 K
          </Box>
          <Box
            component={TrendingUpIcon}
            sx={{ color: 'success.dark', fontSize: '1rem', verticalAlign: 'sub' }}
          />
          <Box
            sx={{
              color: 'success.dark',
              display: 'inline',
              fontWeight: 'bold',
              mx: 0.5,
              fontSize: 14,
            }}
          >
            18.77%
          </Box>
          <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
            vs. last week
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'clip',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
          <Box
            sx={{
              p: 3,
              minWidth: { md: 350 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 0.5,
            }}
          >
            <Box component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              123 Main St, Phoenix AZ
            </Box>
            <Box
              component="span"
              sx={{ color: 'primary.main', fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              $280,000 — $310,000
            </Box>
            <Box
              sx={{
                py: 0.5,
                px: 1,
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                border: '1px solid',
                borderColor: 'rgba(46, 125, 50, 0.1)',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                textTransform: 'uppercase',
                color: 'success.main',
              }}
            >
              Confidence score: 85%
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
