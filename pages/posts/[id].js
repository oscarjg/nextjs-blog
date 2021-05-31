import Head from 'next/head'
import Layout from '../../components/layouts/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>  
  )
}

export async function getStaticProps({ params }){
  return {
    props: {
      postData: await getPostData(params.id),
    }
  }
}

export async function getStaticPaths(){
  return {
    paths: getAllPostIds(),
    fallback: false,
  }
} 