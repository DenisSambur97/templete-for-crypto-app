import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAssets } from '../api';
import percentDifference from '../utils';

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
});

export default function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    function mapAssets(assets, result) {
        return assets.map((asset) => {
            const coin = result.find((c) => c.id === asset.id);
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            };
        });
    }

    useEffect(() => {
        async function preload() {
            setLoading(true);

            try {
                // Заменяем fakeFetchCrypto на реальный запрос
                const response = await fetch('https://openapiv1.coinstats.app/coins', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'X-API-KEY': import.meta.env.VITE_REACT_APP_API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const { result } = await response.json();
                const assets = await fetchAssets();

                setAssets(mapAssets(assets, result));
                setCrypto(result);
            } catch (error) {
                console.error(error);
                // Обработка ошибок, например, установка состояния ошибки
            } finally {
                setLoading(false);
            }
        }

        preload();
    }, []);

    function addAsset(newAsset) {
        setAssets((prevState) => mapAssets([...prevState, newAsset], crypto));
    }

    function removeAsset(assetId) {
        setAssets((prevState) => prevState.filter((asset) => asset.id !== assetId));
    }

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, removeAsset }}>
            {children}
        </CryptoContext.Provider>
    );
}

export function useCrypto() {
    return useContext(CryptoContext);
}
