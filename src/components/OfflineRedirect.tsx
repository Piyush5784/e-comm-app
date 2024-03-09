import { ReactNode, useEffect } from 'react';
import PageNotFound from '../Pages/PageNotFound';
import { useRecoilState } from 'recoil';
import { onlineAtom } from '../atoms/ItemsAtom';

const OfflineRedirect = ({ children }: { children: ReactNode }) => {
    const [isOnline, setIsOnline] = useRecoilState<boolean>(onlineAtom);

    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    if (!isOnline) {
        return <PageNotFound />;
    }

    return <>{children}</>;
};

export default OfflineRedirect;
