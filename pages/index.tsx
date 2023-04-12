import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/assets/images/main_image.jpg'
import { FormEvent, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap'
// import { Form } from 'react-bootstrap';
// import Button from 'react-bootstrap/esm/Button';
// import Spinner from 'react-bootstrap/esm/Spinner';

export default function Home() {

  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false)
        setQuoteLoading(true)

        const response = await fetch("/api/motivation?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        setQuote(body.quote);

      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }


  return (
    <>
      <Head>
        <title>Motivate AI - motivate me pls</title>
        <meta name="description" content="by blaney.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <h1>Motvational Robot</h1>
      <h3>powered by GPT-3</h3>
      <div>Enter a topic and the AI will motiavte you</div>
      <div className={styles.mainImageContainer}>
        <Image 
          src={mainImage}
          fill
          alt='a picture of a confused pug wearing a denim jacket'
          priority
          className={styles.mainImage}
        />
      </div>
      <Form onSubmit={handleSubmit} className={styles.inputForm}>
        <Form.Group className='mb-3' controlId='prompt-input'>
          <Form.Label>Create a motivational quote about...</Form.Label>
          <Form.Control 
            name='prompt'
            placeholder='e.g. cant stop peeing my pants'
            maxLength={20}
          />
        </Form.Group>
        <Button type='submit' className='mb-3' disabled={quoteLoading}>
          Motivate me
        </Button>
      </Form>

      { quoteLoading && <Spinner animation='border'/> }
      { quoteLoadingError && "something went wrong, please try again" }
      { quote && <h5>{quote}</h5>}
      </main>
    </>
  )
}
