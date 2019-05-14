import * as contentful from 'contentful';
import * as contentful_config from '../constants/contentful'

export const getConfigs = () => {
    const client = contentful.createClient({
        space: contentful_config.SPACE,
        accessToken: contentful_config.ACCESS_TOKEN
    });

    return client.getEntries({
        content_type: contentful_config.CONTENT_TYPE_CONFIG
    });
};

export const addConfig = (params) => ({
    type: 'ADD_CONFIG',
    ...params
});