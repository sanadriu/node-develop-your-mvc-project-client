import image from "../../images/icons8-plus.svg";
import styles from "./Icon.module.css";

export default function AddIcon(props) {
	const { size = "sm" } = props;

	return <img src={image} className={styles[size]} alt="add" />;
}
