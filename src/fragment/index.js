import styles from './styles.css'

const Fragment = ({ attributes: { items }}) => (
    <>
        {items.map(item => <li className={styles.listItem}>{item}</li>)}
    </>
)

export default Fragment