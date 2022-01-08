import image from "../../../images/icons8-delete.svg";
import styles from "../Icon.module.css";

export default function DeleteIcon(props) {
	const { size = "sm" } = props;

	return <img src={image} className={styles[size]} alt="delete" />;
}
