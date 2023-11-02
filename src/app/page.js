import Main from './components/Main'
import Form from './components/Form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-36">
      <Main />
      <Form />
    </main>
  )
}
