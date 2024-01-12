import { PipedApi } from '$lib/api';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, url }) => {
    const query = url.searchParams.get('q');
    if (!query) {
        error(404, { message: 'Please provide a search query' });
    }
    const filter = url.searchParams.get('filter') ?? 'videos';

    if (!filter || ['videos', 'channels', 'playlists'].includes(filter ?? '') === false) {
        error(404, { message: 'Please provide a search filter' });
    }

    const api = PipedApi(fetch);
    const results = await api.getSearch({ query, filter });

    return {
        results
    };
};
