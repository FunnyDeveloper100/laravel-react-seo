import * as contentful from 'contentful';
import * as contentful_config from '../constants/contentful'

export const getProjects = () => {
    const client = contentful.createClient({
        space: contentful_config.SPACE,
        accessToken: contentful_config.ACCESS_TOKEN
    });

    return client.getEntries({
        content_type: contentful_config.CONTENT_TYPE_PROJECT,
        skip: 0,
        limit: 10,
        order: 'fields.order'
    });
};

export const getProject = (slug) => {
    const client = contentful.createClient({
        space: contentful_config.SPACE,
        accessToken: contentful_config.ACCESS_TOKEN
    });
    return client.getEntries({
        content_type: contentful_config.CONTENT_TYPE_PROJECT,
        'fields.slug': slug,
        skip: 0,
        limit: 1
    });
};