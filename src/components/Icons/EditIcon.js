import image from "../../images/icons8-edit.svg";
import styles from "./Icon.module.css";

export default function EditIcon(props) {
	const { size = "sm" } = props;

	return <img src={image} className={styles[size]} alt="edit" />;
}
