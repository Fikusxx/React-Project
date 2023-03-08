import React from 'react'


function useHttp()
{
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const sendRequest = React.useCallback(async (config, applyData) =>
    {
        const { url, method, headers, body } = config;
        setIsLoading(true);
        setError(null);

        try
        {
            const response = await fetch(url, {
                method: method ? method : "GET",
                headers: headers ? headers : {},
                body: body ? JSON.stringify(body) : null
            });

            if (!response.ok)
            {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);

        } catch (err)
        {
            setError(err.message || 'Something went wrong!');
        }

        setIsLoading(false);
    }, []);

    return { isLoading, error, sendRequest };
}

export { useHttp };