import useAuth from "../hooks/useAuth"

const Roles = ({allowedRoles, children}) => {

    const {auth} = useAuth();

    
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? {...children }
            : <></>
    );
  
}

export default Roles