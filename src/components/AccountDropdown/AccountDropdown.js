import Dropdown from "bootstrap/Dropdown"
import NavLink from "../NavLink"

export default function AccountDropDown(props){
	const {username} = props;

	return (
		<Dropdown>
			<Dropdown.Toggle variant="light" id="dropdown-basic">
				{username}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<NavLink to="/account">Account</NavLink>
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/sign-out">Sign Out</NavLink>
			</Dropdown.Menu>
		</Dropdown>
	)
}