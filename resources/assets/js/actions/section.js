import * as contentful from 'contentful';
import * as contentful_config from '../constants/contentful'

export const getSections = () => {
    const client = contentful.createClient({
        space: contentful_config.SPACE,
        accessToken: contentful_config.ACCESS_TOKEN
    });

    return client.getEntries({
        content_type: contentful_config.CONTENT_TYPE_SECTION,
        order: 'fields.order'
    });
};

export const getSection = (id) => {
    const client = contentful.createClient({
        space: contentful_config.SPACE,
        accessToken: contentful_config.ACCESS_TOKEN
    });

    return client.getEntry(id);
};