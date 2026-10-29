import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import {students} from "../data/students.js";

function App() {
  const [nameSurname, setNameSurname] = useState("")
  const [grade, setGrade] = useState(1)
  const [filter, setFilter] = useState(false)
  function onSubmit(e) {
    e.preventDefault()
    if (!nameSurname || !grade || nameSurname.trim().length === 0) {
      alert("Nie można dać pustych")
      return;
    }
    students.push({id: students.length+1,name: nameSurname,grade: grade})
    setNameSurname("")
    setGrade(1)
  }


  return (
    <>
      <h1>Lista uczniów</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="nameSurname">Imie i nazwisko</label>
        <input id="nameSurname" value={nameSurname} type="text" onChange={e=>setNameSurname(e.target.value)}/>
        <select  onChange={e=>setGrade(parseInt(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
        <button type={"submit"} className={'btn btn-primary'}>Dodaj ucznia</button>

      </form>

      <input
          type="checkbox" id="filtr" checked={filter} onChange={e => setFilter(e.target.checked)}/><label htmlFor="filte">Filtr od 3 w góre</label>
      <table className="table table-striped">
        <thead>
        <tr>
          <th>Imię i nazwisko</th>
          <th>Ocena</th>
        </tr>
        </thead>
        {filter ? <tbody>
        {students
            .filter(student => student.grade > 3)
            .map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                </tr>
            ))}
        </tbody>
            :
            <tbody>


            {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                </tr>
            ))}
            </tbody>}

      </table>

    </>

  )
}

export default App
