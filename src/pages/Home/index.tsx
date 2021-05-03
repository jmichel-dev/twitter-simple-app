import { ChangeEvent, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

import Layout from "../../components/Layout";
import Tweet from "../../components/Tweet";
import api from "../../services/api";
import styles from './home.module.scss';

interface ITweet {
  _id: string;
  tweet: string;
  createdAt: string;
  updatedAt: string;
}

const Home: React.FC = () => {
  const [tweet, setTweet] = useState<string>('');
  const [tweetLength, setTweetLength] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(true);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<ITweet[]>([]);
  const [socket, setSocket] = useState(null || Socket);

  useEffect(() => {
    const timeline = async () => {
      const response = await api.get('/tweet');
      const tweets: [ITweet] = response.data;

      setTimeline(tweets);
    }

    timeline();
    setSocket(io('http://localhost:3333'));

  }, []);

  useEffect(() => {
    if (!socket) return;
 
    socket.on('tweet', (data: ITweet) => {
      setTimeline(oldTweets => [data, ...oldTweets]);
    });
 
  }, [socket]);

  function handleTweet(event: ChangeEvent<HTMLTextAreaElement>): void {
    const text = event.target.value;
    setTweet(text);
    setTweetLength(text.length);

    if (text.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  const handleSubmit = async () => {
    setRequesting(true);
    const response = await api.post('/tweet', {
      message: tweet,
    });

    const status = response.status;
    const data: ITweet = response.data;

    if (status === 200) {
      console.log(data);
    } else {
      console.log('Something going wrong');
    }

    setTweet('');
    setRequesting(false);
    setDisable(true);
    setTweetLength(0);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <textarea 
          placeholder="O que você está pensando hoje?"
          value={tweet}
          onChange={handleTweet}
        >
        </textarea>

        <div className={styles.controls}>
          <p>{tweetLength}/140</p>
          <button 
            disabled={disable || requesting}
            onClick={handleSubmit}
          >Enviar</button>
        </div>

        <div className={styles.tweetsContainer}>
          {
            timeline.map(data => {
              return (
                <Tweet key={data._id} tweet={data} />
              );
            })
          }
        </div>
      </div>
    </Layout>
  );
}

export default Home;