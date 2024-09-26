// hooks/useLogout.ts

import { useNavigate } from "react-router-dom";
//import { useAppDispatch } from "@/hooks/storeHooks/storeHooks";
import { clearDB } from "@/services/keycloackconfig.util"; 
import { useAuth } from "@/containers/auth/authClient";

export const useLogout = () => {
    const navigate = useNavigate();
    //const dispatch = useAppDispatch();
    const auth = useAuth();

    const handleLogout = () => {
        auth.signOut(() => {
            clearDB();
            navigate(`/`, { replace: false });
        });
    };

    return handleLogout;
};
