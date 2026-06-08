import s from './App.module.css'
import { Card } from './components/card'
import { api } from './constants/api'
import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [page, setPage] = useState("")
  const [inputPage, setInputPage] = useState("")

  useEffect(() => {
    const carrega = async() => {
      try {
        const response = await api.get(`/character/?page=${page}`)
        setData(response.data.results)
      } catch (error) {
        console.error("Deu ruim!!! ", error)
      }
    }
    carrega()
  }, [page, name])

  return (
    <>
      <div className={s.top}>
      <img className={s.logo} src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-rick-flying-transparent-png-stickpng-15.png" alt="" />
        <label htmlFor="">Choose Page</label>
        <input type="number" placeholder='Input the page' value={inputPage} onChange={(e) => setInputPage(e.target.value)}/>

        <button onClick={() => setPage(Number(inputPage))}>Filter</button>
      </div>
      <main>
        <div className={s.pessoasGridResenhuda}> 
          {data.map((item, index) => {
            return(
              <div key={item.id}>
                <Card nome={item.name} origem={item.origin} especie={item.species} imagem={item.image}/>
              </div>
            )
          })}
        </div>

      </main>
    </>
  )
}

export default App