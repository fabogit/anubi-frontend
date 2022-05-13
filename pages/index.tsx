import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

import axios from "axios"

import { Transactions } from "./api/interfaceRepository";
import styles from "../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const { data } = await axios.get("http://localhost:3081/v1/transactions");
 return { props: { data } }; // will be passed to the page component as props
};

const header = ["Transaction Date", "User Id", "Amount", "Nature", "Asset", "Transaction Id"];

const Home: NextPage<{ data: Transactions }> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anubi Digital Coding Interview</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <main className={styles.main}>
        <p>
          {
            "Your coding interview has just started. Show us what you are truly capable of!"
          }
        </p>
        <Image src={"/logo.png"} width={120} height={32} />
        {/* Add your component here */}

        <section>
          <table className={styles.table}>
            <thead>
              <tr>
                {header.map((text, index) => 
                <th key={index}>{text}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map((text, index) => (
                <tr key={index}>
                  <td>{text.createdOn.slice(0, 19).replace('T', ' ')}</td>
                  <td>{text.user.id}</td>
                  <td>{text.amount}</td>
                  <td className={styles.nature}>{text.nature.code}</td>
                  <td>{text.asset}</td>
                  <td>{text.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.anubidigital.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {" fabo "}
          <span className={styles.logo}>
            <Image src="/logo.png" alt="Vercel Logo" width={120} height={32} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
