import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function AvatarLink({ user, size = "xl" }) {
    return (
        <Avatar 
        as= {Link}
        to= {'/profile?matricula='+user?.matricula+''}
        name={user?.matricula}
        size={size}
        src={`https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatar&psig=AOvVaw3EfgPsuN1Ho0IzJ1AHKnGy&ust=1700168340948000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKD-ouLyxoIDFQAAAAAdAAAAABAE`} />
    );
    }