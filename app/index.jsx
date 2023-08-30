import { Redirect, useRootNavigationState } from 'expo-router';
import Background from '../components/Background';

const Index = () => {
    const rootNavigationState = useRootNavigationState();

    if (!rootNavigationState?.key) return null;

    return (
        <Background>
            <Redirect replace href="/home" />
        </Background>
    );
};
export default Index;