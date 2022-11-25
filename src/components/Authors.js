import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const BirthForm = () => {
  const [name, setName] = useState('')
  const [setBornTo, set_setBornTo] = useState('')

  const [ changeBorn, result ] = useMutation(EDIT_BORN)
  
  const submit = (event) => {
    event.preventDefault()
    const n = Number(setBornTo)
    console.log(typeof setBornTo, typeof n, EDIT_BORN)
    changeBorn({ variables: { name, n }})
    console.log(result, result.data, result.data.editAuthor)
    setName('')
    set_setBornTo('')
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => set_setBornTo(target.value)}
          />
        </div>
        <button type='submit'>change born date</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors
  console.log(result,authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthForm />
    </div>
  )
}

export default Authors
