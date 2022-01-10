import image from "../../images/eye.svg";
import styles from "./Icon.module.css";

export default function DetailsIcon(props) {
	const { size = "sm" } = props;

	return <img src={image} className={styles[size]} alt="details" />;
}
