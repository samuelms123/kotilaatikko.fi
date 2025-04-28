// ProtectedRoute.jsx
import { Navigate } from 'react-router';
import { useUserContext } from '../Hooks/contextHooks';

const ProtectedRoute = ({ children }) => {
    const { user } = useUserContext();

    console.log("ProtectedRoute user:", user); // Debugging line

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export { ProtectedRoute };
