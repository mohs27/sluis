import { extract } from "$lib/cookies";

export const actions = {
    subscribe: async ({ fetch, params, cookies }) => {
        const { createPipedApi, authToken } = extract(cookies);

        if (!authToken) {
            return {
                success: false,
            };
        }
        const api = createPipedApi(fetch);
        await api.postSubscribe({ authToken, channelId: params.id });

        return {
            success: true,
        };
    },

    unsubscribe: async ({ fetch, params, cookies }) => {
        const { createPipedApi, authToken } = extract(cookies);
        if (!authToken) {
            return {
                success: false,
            };
        }
        const api = createPipedApi(fetch);
        await api.postUnsubscribe({ authToken, channelId: params.id });

        return {
            success: true,
        };
    },
};

export const load = async ({ parent }) => {
    const { channel, isSubscribed } = await parent();
    return {
        channel,
        isSubscribed,
    };
};
