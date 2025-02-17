import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const H1 = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: theme.typography.h1.fontWeight,
    fontSize: theme.typography.h1.fontSize,
    lineHeight: theme.typography.h1.lineHeight || 1.2,
}));

export const H2 = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: theme.typography.h2.fontWeight,
    fontSize: theme.typography.h2.fontSize,
    lineHeight: theme.typography.h2.lineHeight || 1.2,
}));

export const H3 = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.h3.fontFamily,
    fontWeight: theme.typography.h3.fontWeight,
    fontSize: theme.typography.h3.fontSize,
    lineHeight: theme.typography.h3.lineHeight || 1.2,
}));

export const Body1 = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight || 1.5,
}));

export const Body2 = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.body2.fontFamily,
    fontWeight: theme.typography.body2.fontWeight,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight || 1.5,
}));

export const ButtonText = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.button.fontFamily,
    fontWeight: theme.typography.button.fontWeight,
    fontSize: theme.typography.button.fontSize,
    textTransform: theme.typography.button.textTransform,
}));
