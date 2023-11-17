import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function AvatarLink({ user, size = "xl" }) {
    return (
        <Avatar 
        as= {Link}
        to= {'/profile?matricula='+user?.matricula+''}
        name={user?.matricula}
        size={size}
        src={'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp'} />
    );
    }