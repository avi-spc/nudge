import { Link } from 'react-router-dom';

import NavActions from './NavActions';
import NavUserSearch from './NavUserSearch';

const Navbar = () => {
	return (
		<div className="navbar">
			<Link to="/feed">
				<div className="navbar__logo">nudge</div>
			</Link>
			<NavUserSearch />
			<NavActions />
		</div>
	);
};

export default Navbar;
