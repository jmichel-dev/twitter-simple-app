import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2>Twitter</h2>
        <p>Jean Michel</p>
      </div>
    </header>
  );
}

export default Header;