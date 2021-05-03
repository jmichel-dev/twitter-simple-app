import styles from './tweet.module.scss';

interface ITweet {
  _id: string;
  tweet: string;
  createdAt: string;
  updatedAt: string;
}

const Tweet: React.FC<{ tweet: ITweet }> = ({ tweet }) => {
  return (
    <div className={styles.tweetContainer}>
      <img src="https://i.pravatar.cc/300" alt="user avatar" />

      <div className={styles.tweetDetails}>
        <div className={styles.tweetHeader}>
          <h4>Jean Michel</h4>
          <span>@jeaanmichel</span>
          <span>{tweet.createdAt}</span>
        </div>
        <p className={styles.tweet}>
          {tweet.tweet}
        </p>
      </div>
    </div>
  );
}

export default Tweet;