import PropTypes from 'prop-types';

const TitleHeaderBar = (props) => {
	const { title, action: closeAction } = props;

	return (
		<div className="title-header-bar">
			<div className="text-medium-SB">{title}</div>
			<button className="btn btn--cir" onClick={closeAction}>
				<span className="material-symbols-outlined">close</span>
			</button>
		</div>
	);
};

TitleHeaderBar.propTypes = {
	title: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired
};

export default TitleHeaderBar;
