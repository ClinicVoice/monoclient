import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import theme from '@/theme';

export const H1 = styled(Typography)`
    font-family: ${theme.typography.h1.fontFamily};
    font-weight: ${theme.typography.h1.fontWeight};
    font-size: ${theme.typography.h1.fontSize};
    line-height: ${theme.typography.h1.lineHeight || 1.2};
`;

export const H2 = styled(Typography)`
    font-family: ${theme.typography.h2.fontFamily};
    font-weight: ${theme.typography.h2.fontWeight};
    font-size: ${theme.typography.h2.fontSize};
    line-height: ${theme.typography.h2.lineHeight || 1.2};
`;

export const H3 = styled(Typography)`
    font-family: ${theme.typography.h3.fontFamily};
    font-weight: ${theme.typography.h3.fontWeight};
    font-size: ${theme.typography.h3.fontSize};
    line-height: ${theme.typography.h3.lineHeight || 1.2};
`;

export const Body1 = styled(Typography)`
    font-family: ${theme.typography.body1.fontFamily};
    font-weight: ${theme.typography.body1.fontWeight};
    font-size: ${theme.typography.body1.fontSize};
    line-height: ${theme.typography.body1.lineHeight || 1.5};
`;

export const Body2 = styled(Typography)`
    font-family: ${theme.typography.body2.fontFamily};
    font-weight: ${theme.typography.body2.fontWeight};
    font-size: ${theme.typography.body2.fontSize};
    line-height: ${theme.typography.body2.lineHeight || 1.5};
`;

export const ButtonText = styled(Typography)`
    font-family: ${theme.typography.button.fontFamily};
    font-weight: ${theme.typography.button.fontWeight};
    font-size: ${theme.typography.button.fontSize};
    text-transform: ${theme.typography.button.textTransform};
`;
