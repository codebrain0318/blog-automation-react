import PropTypes from 'prop-types';
import {
    Box,
    Stack,
    styled,
} from '@mui/material';

import { LanguageNameCode } from 'src/models/language';

const ImageWrapper = styled(Box)(
    ({ theme }) => `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        overflow: hidden;
    `
)

const getFlagUrl = (languageName: string): string => {
    let langInfo = LanguageNameCode.find(item => (item.lang === languageName));
    if ( !langInfo ) return "";
    return `https://flagsapi.com/${langInfo.code}/flat/32.png`;
};

const FlagItem = (props) => {
    const { language } = props;

    return (
        <Stack direction={"row"} spacing={1} sx={{display: "flex", alignItems:"center"}}>
            <ImageWrapper>
                <img src={getFlagUrl(language)} />
            </ImageWrapper>
            <Box>{language}</Box>
        </Stack>
    )
}

FlagItem.propTypes = {
    language: PropTypes.string.isRequired
}

export default FlagItem;