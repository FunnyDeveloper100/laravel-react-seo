import * as contentful from 'contentful';
import * as contentful_config from '../constants/contentful'

export const getOption = (option) => {
    const client = contentful.createClient({
        space: contentful_config.SPACE,
        accessToken: contentful_config.ACCESS_TOKEN
    });

    return client.getEntries({
        content_type: contentful_config.CONTENT_TYPE_GENERAL_OPTION,
        'fields.title': option,
        skip: 0,
        limit: 1
    });
};

export const updateThemeOptions = (params) => ({
    type: 'UPDATE_THEME_OPTION',
    options: params
});