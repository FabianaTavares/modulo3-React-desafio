import React, { useState } from 'react'
import Tweet from './Tweet';
import * as api from './../api/apiService';
import { v4 as uuidv4 } from 'uuid';

const BAD_COLOR = '#c0392b';
const GOOD_COLOR = '#27ae60';
const ORANGE_COLOR = '#ff8000'
export default function Twitter({twitters, onSave }) {

  let id = 1;
  const [inputStyle, setInputStyle] = useState();
  const [caractersDescription, setCaractersDescription] = useState('');
  const [caracteresRestantes, setCaractersRestantes] = useState();
  const [tweetContent, setTweetContent] = React.useState('');
  const [tweets, setTweet] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const tweets = await api.getAllTwitters();
      setTweet(tweets);
    }
    getData();
  }, []);

  React.useEffect(() => {
    document.querySelector('textArea').focus();
  } , [tweetContent]) ;

  const handleKeyUp = ({ ctrlKey, key }) => {
    if (!ctrlKey) {
      return;
    }
    if (key !== 'Enter') {
      return;
    }
    if (tweetContent.trim() === '') {
      return;
    }
    tweeters();
  };

  const tweeters = async () => {
     const limite = 280;
    if(caracteresRestantes < 0 || caracteresRestantes === limite ||
      caractersDescription.trim() === ''){
      return;
    }

      setTweet([...tweets, tweeters]);
      setCaractersDescription('');
      setCaractersRestantes('');
      setTweetContent('');
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      id: uuidv4(),
      value: tweetContent,
    };
    onSave(formData);
    setTweet([...tweets, formData]);
    setCaractersDescription('');
    setCaractersRestantes('');
    setTweetContent('');

  };

  const handleTweetChange = (event) => {
    const tweet = event.target.value;
    const { goodGradeStyle, badGradeStyle, orangeGradeStyle } = styles;
    const counterText = '';
    const limite = 280;
    const caracteresDigitados = parseInt(tweet.length);
    const caracteresRestantes = limite - caracteresDigitados;

    const caractersDescription = `${caracteresRestantes} caracter(es) restante(s)`;

    if(caracteresRestantes >= 10){
      const inputStyle = goodGradeStyle;
      setInputStyle(inputStyle);
    }else if(caracteresRestantes >= 0 && caracteresRestantes <= 9){
      const inputStyle = orangeGradeStyle;
      setInputStyle(inputStyle);
    }else if(caracteresRestantes < 0){
      const caractersDescription = `- ${counterText} caracter(es) restante(s)`;
      const inputStyle = badGradeStyle;
      setInputStyle(inputStyle);
      setCaractersDescription(caractersDescription);
      setCaractersRestantes(caracteresRestantes);
      setTweetContent(tweet);

    }

    setCaractersDescription(caractersDescription);
    setCaractersRestantes(caracteresRestantes);
    setTweetContent(tweet);

  };

  const handleActionClick = async (id) => {
    await api.deleteTweet(id);
    setTweet(tweets.filter((t) => t.id !== id));
    setCaractersDescription('');
    setCaractersRestantes('');
    setTweetContent('');
  };

  return (
    <div className="container center">
      <form onSubmit={handleFormSubmit}>
        <div className="input-field col s6">
          <label className="active" htmlFor="textArea">Escreva Aqui:</label>
          <textarea
          id="textArea"
          key={id}
          //id={id}
          step="1"
          autoFocus
          value={tweetContent}
          onChange={handleTweetChange}
          onKeyUp={handleKeyUp}
          rows="6"
          ></textarea>
        </div>
        <div style={styles.flexRow}>
            <span style={inputStyle}>{caractersDescription} </span>
            <button
              className="waves-effect waves-light btn"
              disabled={caracteresRestantes < 0 ||
                            caractersDescription.trim() === ''
                        }
            >
              Twittar
            </button>
          </div>
        <div>
        </div>
      </form>
      <div style={styles.dataStyle}>

        <div className='tweets' style={{ width: '100%' }}>
          {tweets.map((tweet) => {
            const { id } = tweet;

            return (
              <Tweet key={id} onActionClick={handleActionClick}>
                  {tweet}
              </Tweet>
            );
          })}
        </div>
      </div>
    </div>
  )
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  dataStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  goodGradeStyle: {
    color: GOOD_COLOR,
    fontWeight: 'bold',
  },

  badGradeStyle: {
    color: BAD_COLOR,
    fontWeight: 'bold',
  },

  orangeGradeStyle: {
    color: ORANGE_COLOR,
    fontWeight: 'bold',
  },

};